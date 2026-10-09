import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { parse } from 'parse5';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const document = parse(await readFile(join(dist, 'index.html'), 'utf8'));
const nodes = (node) => [node, ...(node.childNodes ?? []).flatMap(nodes)];
const all = nodes(document);
const attr = (node, name) => node.attrs?.find(value => value.name === name)?.value;
const hasClass = (node, name) => attr(node, 'class')?.split(/\s+/).includes(name);
const text = (node) => node.nodeName === '#text' ? node.value
  : (node.childNodes ?? []).map(text).join('');
const canonical = 'https://gipsy-dev.me/';
const root = all.find(node => attr(node, 'id') === 'root');

test('initial HTML includes readable, complete portfolio content', () => {
  assert.ok(root);
  const content = nodes(root);
  assert.match(text(root), /Adam Fairuz Akmal Aryaguna/);
  assert.match(text(root), /AI Engineer/);
  assert.equal(content.filter(node => node.tagName === 'h1').length, 1);
  for (const id of ['home', 'about', 'projects', 'experience', 'certifications', 'contact']) {
    assert.ok(content.some(node => attr(node, 'id') === id), `${id} must be in the initial HTML`);
  }
  const projects = content.filter(node => hasClass(node, 'project-gallery-panel'));
  assert.equal(projects.length, 14);
  projects.forEach(node => {
    assert.notEqual(attr(node, 'aria-hidden'), 'true');
    assert.equal(attr(node, 'inert'), undefined);
    assert.ok(nodes(node).some(child => child.tagName === 'h3'));
  });
  const credentials = content.filter(node => hasClass(node, 'cert-row') || hasClass(node, 'cert-featured-card'));
  assert.equal(credentials.length, 26);
  credentials.forEach(node => { assert.equal(node.tagName, 'a'); assert.ok(attr(node, 'href')); });
  assert.equal(content.filter(node => node.tagName === 'script').length, 0, 'No streaming scripts may be required to reveal content');
  assert.equal(content.filter(node => attr(node, 'id')?.startsWith('S:')).length, 0);
  assert.ok(content.some(node => attr(node, 'href') === 'mailto:aryagunaadam@gmail.com'));
});

test('metadata and linked identity graph match the visible profile', () => {
  assert.equal(attr(all.find(node => node.tagName === 'html'), 'lang'), 'en');
  const title = text(all.find(node => node.tagName === 'title'));
  assert.match(title, /Gipsy\.Dev/);
  assert.match(title, /AI Engineer/);
  const meta = (name) => all.find(node => node.tagName === 'meta' && (attr(node, 'name') === name || attr(node, 'property') === name));
  assert.equal(attr(meta('og:title'), 'content'), title);
  assert.equal(attr(meta('twitter:title'), 'content'), title);
  assert.ok(attr(meta('description'), 'content').length > 100);
  assert.equal(attr(all.find(node => attr(node, 'rel') === 'canonical'), 'href'), canonical);
  assert.doesNotMatch(attr(meta('robots'), 'content'), /noindex/);
  const schema = all.filter(node => attr(node, 'type') === 'application/ld+json').map(node => JSON.parse(text(node)));
  assert.equal(schema.length, 1);
  const graph = schema[0]['@graph'];
  const person = graph.find(node => node['@type'] === 'Person');
  assert.equal(person.name, 'Adam Fairuz Akmal Aryaguna');
  assert.match(person.jobTitle, /AI Engineer/);
  assert.equal(graph.find(node => node['@type'] === 'ProfilePage').mainEntity['@id'], person['@id']);
  assert.equal(graph.find(node => node['@type'] === 'WebSite').publisher['@id'], person['@id']);
  assert.ok(all.some(node => node.tagName === 'img' && new URL(attr(node, 'src'), canonical).href === person.image));
  const portrait = all.find(node => node.tagName === 'img' && new URL(attr(node, 'src'), canonical).href === person.image);
  assert.ok(all.some(node => node.tagName === 'link' && attr(node, 'as') === 'image'
    && node.parentNode.tagName === 'head'
    && attr(node, 'imagesrcset') === attr(portrait, 'srcset')
    && attr(node, 'imagesizes') === attr(portrait, 'sizes')));
  assert.ok(all.some(node => node.tagName === 'a' && attr(node, 'href') === person.sameAs[0]));
});

test('generated image, stylesheet, script, and document URLs exist', async () => {
  const urls = new Set();
  for (const node of all) {
    const src = attr(node, 'src');
    const href = attr(node, 'href');
    if (src && !src.startsWith('data:')) urls.add(new URL(src, canonical).href);
    const sources = attr(node, 'srcset') || attr(node, 'imagesrcset');
    if (sources) sources.split(',').forEach(source => urls.add(new URL(source.trim().split(/\s+/)[0], canonical).href));
    if (href && (node.tagName === 'link' || /\.(pdf|webp)$/.test(href))) urls.add(new URL(href, canonical).href);
    if (node.tagName === 'meta' && ['og:image', 'twitter:image'].includes(attr(node, 'property') || attr(node, 'name'))) {
      urls.add(attr(node, 'content'));
    }
  }
  for (const value of urls) {
    const url = new URL(value);
    if (url.origin !== new URL(canonical).origin) continue;
    await access(join(dist, decodeURIComponent(url.pathname)));
  }
});

test('hero portraits and their preload use the same responsive sources', () => {
  const portraits = all.filter(node => node.tagName === 'img' && attr(node, 'alt')?.startsWith('Portrait of Adam'));
  assert.equal(portraits.length, 2);
  portraits.forEach(node => {
    assert.equal(attr(node, 'sizes'), '(max-width: 1023px) 256px, 1200px');
    assert.match(attr(node, 'srcset'), /512w, .*768w, .*1200w$/);
    assert.equal(attr(node, 'srcset'), attr(portraits[0], 'srcset'));
  });
  const preloads = all.filter(node => node.tagName === 'link' && attr(node, 'as') === 'image');
  assert.equal(preloads.length, 1);
  assert.equal(attr(preloads[0], 'imagesrcset'), attr(portraits[0], 'srcset'));
});

test('robots and sitemap are deployed with the canonical site', async () => {
  const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
  assert.ok(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
  assert.ok(robots.includes('Allow: /'));
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
  await access(join(dist, 'google1289e1e5d73483a9.html'));
});

test('the entry bundle does not depend on the 3D engine', async () => {
  const manifest = JSON.parse(await readFile(join(dist, '.vite', 'manifest.json'), 'utf8'));
  const pending = [...(manifest['index.html'].imports ?? [])];
  const visited = new Set();
  while (pending.length) {
    const key = pending.pop();
    if (visited.has(key)) continue;
    visited.add(key);
    assert.doesNotMatch(key, /vendor-three/);
    pending.push(...(manifest[key]?.imports ?? []));
  }
  assert.ok(Object.values(manifest).some(entry => entry.file.includes('vendor-three')));
});

test('the hero loads its 3D runtime in a worker, with a separate lazy fallback', async () => {
  const manifest = JSON.parse(await readFile(join(dist, '.vite', 'manifest.json'), 'utf8'));
  const hero = manifest['src/component/HeroScene.jsx'];
  assert.ok(hero);
  const pending = [...(hero.imports ?? [])];
  const visited = new Set();
  while (pending.length) {
    const key = pending.pop();
    if (visited.has(key)) continue;
    visited.add(key);
    const entry = manifest[key];
    assert.ok(entry);
    assert.doesNotMatch(entry.file, /vendor-three/);
    pending.push(...(entry.imports ?? []));
  }
  assert.ok(hero.dynamicImports.some(key => manifest[key]?.name === 'HeroSceneFallback'));
  const source = await readFile(join(dist, hero.file), 'utf8');
  const worker = source.match(/hero-scene\.worker-[\w-]+\.js/);
  assert.ok(worker);
  await access(join(dist, 'assets', worker[0]));
});

test('gallery images reserve their natural proportions without eager off-screen requests', () => {
  const previews = all.filter(node => node.tagName === 'img' && hasClass(node.parentNode, 'project-gallery-preview'));
  assert.equal(previews.length, 14);
  previews.forEach(node => {
    assert.ok(Number(attr(node, 'width')) > 0);
    assert.ok(Number(attr(node, 'height')) > 0);
    assert.equal(attr(node, 'loading'), 'lazy');
  });
});

test('all critical fonts are local, preloaded, and distributed with their licenses', async () => {
  assert.ok(!all.some(node => attr(node, 'href')?.includes('fonts.googleapis.com')));
  const fonts = all.filter(node => attr(node, 'as') === 'font');
  assert.equal(fonts.length, 4);
  for (const font of fonts) {
    assert.equal(attr(font, 'rel'), 'preload');
    assert.equal(attr(font, 'type'), 'font/woff2');
    await access(join(dist, attr(font, 'href')));
  }
  for (const name of ['hankengrotesk', 'jetbrainsmono', 'playfairdisplay']) {
    const license = await readFile(join(dist, 'fonts', `${name}-OFL.txt`), 'utf8');
    assert.match(license, /SIL OPEN FONT LICENSE/);
  }
});

test('production CSS is inlined with working font URLs', () => {
  assert.equal(all.filter(node => node.tagName === 'link' && attr(node, 'rel') === 'stylesheet').length, 0);
  const styles = all.filter(node => node.tagName === 'style' && attr(node, 'data-stylesheet'));
  assert.equal(styles.length, 2);
  styles.forEach(node => assert.equal(node.parentNode.tagName, 'head'));
  const css = styles.map(text).join('');
  assert.match(css, /url\(\.\/fonts\/hanken-grotesk-latin\.woff2\)/);
  assert.match(css, /\.project-gallery/);
  assert.match(css, /\.text-type-cursor/);
  assert.match(css, /size-adjust:87\.19%/);
  assert.ok(hasClass(all.find(node => node.tagName === 'h1'), 'hero-heading'));
});
