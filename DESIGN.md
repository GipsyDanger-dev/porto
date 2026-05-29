# Midnight Editorial — Portfolio Design System
## Implementation Brief for Claude Code

---

## 🎯 TASK

Rebuild the portfolio website at **https://gipsy-dev.me/** using the design system defined in this file.

**Steps Claude Code must follow:**
1. Fetch and scrape all content from `https://gipsy-dev.me/` (including sub-pages: `/about`, `/projects`, `/certs`, `/contact` or any route discovered)
2. Extract ALL real content: name, bio, project names/descriptions/tags, certifications, timeline/work history, skills, contact info, social links, etc.
3. Rebuild the site as a single `index.html` file (or Next.js/React if the project already uses it) applying this design system **exactly**
4. Do NOT invent or placeholder any content — every piece of text, every project, every cert must come from the live site
5. If a page uses JavaScript rendering and content is not in initial HTML, use Puppeteer or Playwright to render and extract content

---

## Brand

**Name:** Gipsy.Dev  
**URL:** https://gipsy-dev.me  
**Role:** Fullstack Engineer · Web Developer · AI Engineer  
**Tone:** Authoritative, enigmatic, meticulously crafted — like a high-end engineering editorial

---

## Color Palette

```css
:root {
  /* Surfaces */
  --bg:                    #101417;
  --surface-dim:           #0b0f12;
  --surface:               #1c2024;
  --surface-high:          #272a2e;
  --surface-highest:       #323539;

  /* Text */
  --on-surface:            #e0e2e8;
  --on-surface-variant:    #c4c7c7;

  /* Borders */
  --outline:               #8e9192;
  --outline-variant:       #444748;

  /* Accent — Burnt Orange (use sparingly) */
  --secondary:             #f2640f;
  --secondary-light:       #ffb595;

  /* Background alias */
  --background:            #101417;
}
```

**Usage rules:**
- `--bg` is the page canvas. Never use pure `#000000`
- `--secondary` (burnt orange) is used ONLY for: active nav links, CTA buttons, skill bar fills, cert category labels, section labels, and accent lines
- Never use neon gradients or purple — this is a warm dark editorial palette

---

## Typography

Import from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,700&family=Hanken+Grotesk:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Role | Font | Size | Weight | Notes |
|------|------|------|--------|-------|
| Display / Hero | Playfair Display | 76–80px | 700 | `letter-spacing: -0.025em` |
| Section Titles | Playfair Display | 48–52px | 700 | `letter-spacing: -0.015em` |
| Sub-headings | Playfair Display | 22–36px | 700 | |
| Body text | Hanken Grotesk | 16–18px | 400 | `line-height: 26–28px` |
| Labels / Tags / Nav | JetBrains Mono | 10–12px | 500 | `letter-spacing: 0.08–0.12em; text-transform: uppercase` |

- Headlines may use italic `<em>` for secondary words — styled as `font-style: italic; color: var(--on-surface-variant)`
- Never use Inter, Roboto, or Arial

---

## Spacing

```css
--gutter:       64px;   /* page horizontal padding */
--section-gap:  160px;  /* vertical padding per section */
```

On mobile (`< 768px`): gutter becomes `24px`, section-gap becomes `80px`

---

## Layout

- **12-column asymmetric grid** — sections use `display: grid` with intentionally uneven splits (e.g. `5fr 7fr`, `7fr 5fr`, `3fr 9fr`)
- Grid-breaking: hero headline and section titles may overlap or extend past their grid column
- Whitespace is structural — sections need breathing room
- **No bento boxes** — avoid symmetrical 2x2 or 3x3 equal-column grids

---

## Shape Language

- **0px border radius everywhere** — buttons, cards, images, inputs, all sharp corners
- Tags use sharp corners with `border: 1px solid var(--outline-variant)`
- Hover states use `border-color` transitions, never box-shadow
- Focus states: `outline: 1px solid var(--secondary)`, no browser default glow

---

## Effects & Atmosphere

### Grain texture (required, full viewport)
```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 9998;
}
```

### Navigation blur
```css
nav {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(16, 20, 23, 0.75);
  border-bottom: 1px solid rgba(68, 71, 72, 0.5);
}
```

### Scroll reveal (required for all sections)
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08 });
```
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.75s cubic-bezier(0.4,0,0.2,1),
              transform 0.75s cubic-bezier(0.4,0,0.2,1);
}
.reveal.visible { opacity: 1; transform: translateY(0); }
```

---

## Components

### Navigation
- Fixed, full-width, backdrop blur
- Logo: Playfair Display 20px bold
- Links: JetBrains Mono 11px uppercase, underline on hover/active using `--secondary`
- CTA button: burnt orange filled, sharp corners, Mono font

### Buttons
```css
/* Primary */
.btn-primary {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--secondary);
  color: #fff;
  padding: 14px 28px;
  border: none;
  cursor: pointer;
  /* NO border-radius */
}

/* Secondary / Ghost */
.btn-secondary {
  background: transparent;
  border: 1px solid var(--outline-variant);
  color: var(--on-surface);
  /* same padding & font as primary */
}
.btn-secondary:hover { background: rgba(255,255,255,0.04); border-color: var(--outline); }
```

### Section Labels
```css
.section-label {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--secondary);
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.section-label::before {
  content: '';
  display: block;
  width: 32px;
  height: 1px;
  background: var(--secondary);
}
```

### Project Cards
- Alternating grid layout: odd = `7fr 5fr` (visual left, text right), even = `5fr 7fr` (text left, visual right)
- Visual area: `background: var(--surface); border: 1px solid var(--outline-variant);`
- Project title: Playfair Display 40px bold
- Tags: JetBrains Mono 9px uppercase, `background: var(--surface-high)`
- "View Project →" link: Mono 11px, hover increases gap between text and arrow
- Separated by `border-top: 1px solid var(--outline-variant)`

### Skill Bars
```css
.skill-track { height: 1px; background: var(--outline-variant); }
.skill-fill  { height: 1px; background: var(--secondary); width: 0; transition: width 1.4s cubic-bezier(0.4,0,0.2,1); }
```
Animate width from 0 to actual % when section enters viewport.

### Certification Cards
- Grid: `repeat(3, 1fr)` separated by `gap: 1px; background: var(--outline-variant)` (creates thin-line dividers)
- Each card: `background: var(--bg)`, hover to `var(--surface)`
- Category label: JetBrains Mono, `--secondary` color
- Title: Playfair Display 20px
- Footer: issued date (Mono) + "Verify →" link in `--secondary`

### Tech Marquee (below hero)
- Horizontal auto-scrolling strip of tech stack keywords
- `border-top` and `border-bottom: 1px solid var(--outline-variant)`
- `background: var(--surface-dim)`
- Font: JetBrains Mono 11px uppercase, color `--outline`
- Orange `·` separator between items
- CSS `animation: marquee 20s linear infinite` on duplicated list

### Contact Section
- Centered layout
- Email as giant Playfair Display serif link (`clamp(40px, 6vw, 80px)`)
- Underline animates on hover using `transform: scaleX()` from left
- Meta info: location + availability in JetBrains Mono
- Single CTA button below

### Footer
- Three-column: Logo (left) · Copyright (center) · Social links (right)
- All in JetBrains Mono 10px

---

## Page Sections (in order)

Build these sections in this exact order, pulling all copy from the scraped live site:

1. **Navigation** — logo, links (Projects, About, Certs, Contact), Connect CTA
2. **Hero** — headline, sub-headline, CTA buttons + hero visual card (with available status, name, roles, quick stats)
3. **Marquee** — scrolling tech stack strip
4. **About** — bio text (left column) + career timeline (right column) + skills/arsenal with bars
5. **Selected Works / Projects** — all real projects from the site, alternating layout
6. **Certifications** — all real certs in 3-column grid
7. **Contact** — email, location, CTA
8. **Footer** — logo, copyright, social links

---

## Implementation Notes for Claude Code

- Output a **single `index.html`** with all CSS in `<style>` and JS in `<script>` unless the project already uses a framework
- If the existing project is Next.js/React, maintain that — apply this system as Tailwind config + CSS variables + component rewrites
- Fonts loaded via Google Fonts CDN
- No external UI libraries (no Bootstrap, no shadcn) — build from scratch with CSS
- All images/screenshots from the live site should be preserved with their original `src` attributes
- Replace all placeholder content — zero `[Lorem ipsum]` or `[ Preview ]` text in final output
- Test responsiveness: on `< 768px`, grid collapses to single column, font sizes scale down, gutter reduces to `24px`