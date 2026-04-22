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
```

## Scripts

- `npm run dev` - Run local development server
- `npm run lint` - Run ESLint
- `npm run build` - Build production assets
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy `dist` to GitHub Pages
