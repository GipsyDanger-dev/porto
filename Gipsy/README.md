# Gipsy Portfolio

Portfolio website built with React + Vite.

## Performance Checks

Run `npm run build`, `npm run test:seo`, and `npm run preview` before auditing
the production build. Use the same Lighthouse version and desktop/mobile mode
when comparing reports; local results are not interchangeable with PageSpeed
Insights results. The hero retains its geometry and materials, prepares shaders
asynchronously, and pauses off-screen or in background tabs. Credly embeds load
near the credentials section. Fonts are self-hosted with their OFL licenses.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create local env file from the example:

```bash
copy .env.example .env
```

3. Fill EmailJS variables in `.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_CONTACT_TO_EMAIL=your_email@example.com
VITE_CONTACT_TO_NAME=Your Name
```

4. In EmailJS template content, make sure these variables are used so message is routed to your inbox:

- `To`: `{{to_email}}`
- `Reply-To`: `{{reply_to}}`
- Message body can use: `{{from_name}}`, `{{from_email}}`, and `{{message}}`

If you skip `{{to_email}}`, EmailJS may still use default template recipient settings instead of the address from your app.

5. Restart the dev server after changing `.env` so Vite can reload environment values.

## Production Email Configuration

The GitHub Pages workflow cannot read your ignored local `.env` file. Add the
same five variables listed above as repository secrets under GitHub Settings >
Secrets and variables > Actions. Do not commit `.env` or use an EmailJS private
key in any `VITE_` variable.

The workflow checks the four required values before building. After changing
secrets, rerun the deployment workflow: Vite embeds these values at build time,
so changing a secret does not update an already deployed website.

In the EmailJS dashboard, keep the service connected and verify that the
template's recipient and Reply-To match the variables listed above. If an
origin allowlist is enabled, allow `https://gipsy-dev.me` and your local dev
origin when testing locally.

## Editor Formatting

This workspace now includes VS Code settings in `.vscode/settings.json` to keep files clean automatically:

- Format on save enabled
- ESLint autofix on save (explicit)
- ESLint as default formatter for JavaScript and React files

Recommended extension:

- `dbaeumer.vscode-eslint`

## Contact Form Hardening

- No hardcoded EmailJS credentials in source code
- Hidden honeypot field to reduce bot submissions
- 15-second cooldown between successful sends (persists after page refresh)
- Minimum message length validation (10 characters)

## Scripts

- `npm run dev` - Run local development server
- `npm run lint` - Run ESLint
- `npm run build` - Build client assets and statically render the portfolio into `dist/index.html`
- `npm run test:seo` - Check built content, metadata, structured data, and asset URLs
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy `dist` to GitHub Pages

## SEO Build

The production build renders the same React components on the server at build
time. No server is required on GitHub Pages, and no crawler-specific content is
served. The initial HTML includes the bio, projects, credentials, and contact
links. JavaScript mounts the existing animated application normally.

The `data-static` attribute enables a readable fallback without JavaScript:
project descriptions are expanded, all credentials link directly to their
verification page or document, and the direct email link remains available.
The client removes this attribute when it starts. Development mode still uses
Vite's normal client rendering; use `npm run build` followed by
`npm run preview` to inspect the static output.

After deploying SEO changes, inspect `https://gipsy-dev.me/` in Google Search
Console, test the live URL, and request indexing. Track clicks, impressions,
CTR, and position separately for each target query over comparable date ranges.
Technical changes do not guarantee a ranking increase.
