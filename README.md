# Andre Sha — Portfolio

Single-page developer portfolio for a Lead Full Stack Developer.

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
