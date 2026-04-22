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

## Scripts

- `npm run dev` - Run local development server
- `npm run lint` - Run ESLint
- `npm run build` - Build production assets
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy `dist` to GitHub Pages
