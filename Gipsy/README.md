# Gipsy Portfolio

Portfolio website built with React + Vite.

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
- `npm run build` - Build production assets
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy `dist` to GitHub Pages
