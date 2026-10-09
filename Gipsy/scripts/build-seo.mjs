import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import { parse, parseFragment, serialize } from 'parse5';
import viteConfig from '../vite.config.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const find = (node, predicate) => predicate(node) ? node
  : node.childNodes?.map(child => find(child, predicate)).find(Boolean);
const attribute = (node, name) => node.attrs?.find(attr => attr.name === name)?.value;

await build({ ...viteConfig, root, configFile: false, build: { ...viteConfig.build, manifest: true } });

const cache = join(root, 'node_modules', '.cache');
await mkdir(cache, { recursive: true });
const serverBuild = await mkdtemp(join(cache, 'portfolio-seo-'));

try {
  await build({
    ...viteConfig,
    root,
    configFile: false,
    build: {
      ssr: 'src/prerender.jsx',
      ssrEmitAssets: true,
      outDir: serverBuild,
      emptyOutDir: true,
      rollupOptions: { output: { entryFileNames: 'prerender.mjs' } },
    },
  });
  const { render } = await import(pathToFileURL(join(serverBuild, 'prerender.mjs')).href);
  const markup = await render();
  const document = parse(await readFile(join(dist, 'index.html'), 'utf8'));
  const appRoot = find(document, node => attribute(node, 'id') === 'root');
  const html = find(document, node => node.tagName === 'html');
  const head = find(document, node => node.tagName === 'head');
  if (!appRoot || !html || !head) throw new Error('The page template is missing required elements.');

  // Parse HTML structurally; never splice rendered markup with string replacements.
  appRoot.childNodes = parseFragment(markup).childNodes;
  appRoot.childNodes.forEach(node => { node.parentNode = appRoot; });
  html.attrs.push({ name: 'data-static', value: '' });

  // React emits image preloads next to the SSR root; discover them in the head.
  const imagePreloads = appRoot.childNodes.filter(node => node.tagName === 'link'
    && attribute(node, 'rel') === 'preload' && attribute(node, 'as') === 'image');
  appRoot.childNodes = appRoot.childNodes.filter(node => !imagePreloads.includes(node));
  imagePreloads.forEach(node => { node.parentNode = head; });
  head.childNodes.unshift(...imagePreloads);

  const structuredData = find(head, node => attribute(node, 'type') === 'application/ld+json');
  const graph = JSON.parse(structuredData.childNodes[0].value);
  const person = graph['@graph'].find(entity => entity['@type'] === 'Person');
  const portrait = find(appRoot, node => node.tagName === 'img' && attribute(node, 'alt')?.includes(person.name));
  person.image = new URL(attribute(portrait, 'src'), person.url).href;
  structuredData.childNodes[0].value = JSON.stringify(graph, null, 2);

  const manifest = JSON.parse(await readFile(join(dist, '.vite', 'manifest.json'), 'utf8'));
  const styles = new Set(Object.values(manifest).flatMap(entry => entry.css ?? []));
  const existing = new Set(head.childNodes.filter(node => node.tagName === 'link')
    .map(node => attribute(node, 'href')));
  for (const stylesheet of styles) {
    const href = `./${stylesheet}`;
    if (existing.has(href)) continue;
    const link = parseFragment(`<link rel="stylesheet" href="${href}">`).childNodes[0];
    link.parentNode = head;
    head.childNodes.push(link);
  }
  for (const id of ['home', 'about', 'projects', 'experience', 'certifications', 'contact']) {
    if (!find(appRoot, node => attribute(node, 'id') === id)) {
      throw new Error(`Static content is missing the ${id} section.`);
    }
  }
  if (!find(appRoot, node => node.tagName === 'h1')) throw new Error('Static content is missing its main heading.');
  await writeFile(join(dist, 'index.html'), serialize(document));
  console.log('SEO: rendered all portfolio sections into the initial HTML.');
} finally {
  if (dirname(serverBuild) !== cache) throw new Error('Refusing to remove a directory outside the build cache.');
  await rm(serverBuild, { recursive: true, force: true });
}
