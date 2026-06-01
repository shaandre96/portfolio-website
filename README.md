# Andre Sha — Portfolio

Single-page blueprint portfolio for a Lead Full Stack Developer. Built to the
spec in [`CLAUDE.md`](./CLAUDE.md) from the Claude Design handoff.

**Stack:** Next.js 16 (App Router, RSC) · TypeScript (strict) · Tailwind CSS v4
(`@theme` + CSS variables) · anime.js v4 · `next/font` (Geist + Geist Mono).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender static)
npm run lint     # eslint (next/core-web-vitals + typescript)
npm run typecheck
```

## Architecture

- `app/layout.tsx` — fonts, SEO metadata, Person JSON-LD, no-FOUC theme script,
  skip link, header.
- `app/page.tsx` — thin; composes the six section components + footer inside the
  rail-bearing `<main>`.
- `app/globals.css` — design tokens (light/dark), Tailwind `@theme` mapping,
  construction grid, and all section styles (variable-driven; no hardcoded hex
  in components).
- `app/{sitemap,robots,opengraph-image}.*` — SEO routes + dynamic OG card.
- `components/sections/*` — Hero, About, SelectedWork, Experience, Skills, Contact.
- `components/ui/*` — Header, ThemeToggle, Button, SectionHeading, ProjectCard,
  SkillGroup, NodeMarker, Footer.
- `components/animation/*` — `CircuitPath` (hero dashed SVG) and `ScrollDraw`
  (the continuous left-rail circuit that fills on scroll and lights each node;
  anime.js powers staggered section reveals).
- `lib/data/*` — projects, experience, skills, nav. `lib/site.ts` — site constants.

## Accessibility & motion

Content is always visible in base CSS — JS only enhances. The scroll-draw,
node activation, and staggered reveals are fully disabled under
`prefers-reduced-motion`, which shows the final drawn state. One `<h1>`, logical
`<h2>`s, singular landmarks, visible focus rings, and descriptive links.

## Before deploy — fill these placeholders

- `lib/site.ts`: `url` (currently `https://andresha.dev`), `linkedin`, `github`.
  The canonical URL can also be set via `NEXT_PUBLIC_SITE_URL`.
- `lib/data/projects.ts`: replace each project `href: "#"` with its live URL
  (external links automatically open in a new tab once real).
- Drop a CV PDF at `public/andre-sha-cv.pdf` to wire up the "Download CV" button
  (path set in `lib/site.ts` → `cvPath`).

## Deploy

Push to Vercel (free tier). No server runtime needed — every route is static.
