# CLAUDE.md — Andre Sha Portfolio Site

> Build instructions for Claude Code. This file is the source of truth for the
> portfolio build. A Claude Design scaffold exists as the visual baseline —
> rebuild it properly here in Next.js 16 with the architecture and standards below.

---

## 1. Project Overview

A fast, single-page portfolio site for **job applications** (region-neutral).
Audience: recruiters and hiring managers across Hong Kong, Singapore, Vietnam,
and remote Australia. They scan for 10–30 seconds, often on mobile.

The site's job: get Andre to the interview. Instant load, strongest work visible
immediately, scannable experience/skills, frictionless contact, links out to three
live interactive projects.

**This is a taste showcase, not a stats sheet.** Hard numbers live on the CV.
The site demonstrates design sensibility, engineering rigour, and points to live work.

**Explicitly NOT building a 3D room.** It hurts hiring outcomes (slow load, poor
SEO, drains laptop battery in screen-shares, mismatched to a hiring audience).
Three.js competence is signalled via the listed skills and the Three.js Journey cert.

---

## 2. Non-Negotiable Requirements

These five are mandatory and override convenience:

1. **Next.js 16** — App Router. Server Components by default; Client Components only
   where interactivity demands it (theme toggle, scroll animations).
2. **SEO optimised** — Metadata API, Open Graph + Twitter cards, JSON-LD structured
   data (Person schema), `sitemap.ts`, `robots.ts`, semantic HTML, real heading order.
3. **Tailwind CSS variables** — All theme values as CSS custom properties mapped into
   Tailwind via `@theme`. No hardcoded hex in components. Light/dark switch by swapping
   variable values, never by duplicating class sets.
4. **Component architecture** — Small, focused, single-responsibility components.
   No monolithic page files. Each section is its own component; shared primitives
   (Button, SectionHeading, NodeMarker, etc.) are extracted.
5. **WCAG 2.1 AA** — Colour contrast ≥ 4.5:1 body / 3:1 large text, full keyboard nav,
   visible focus states, `prefers-reduced-motion` honoured, semantic landmarks,
   alt text, ARIA only where semantics fall short.

---

## 3. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | TypeScript strict, no `any` |
| Styling | Tailwind CSS v4 | `@theme` with CSS variables |
| Animation | anime.js v4 | `npm i animejs` — 24KB, Scroll Observer |
| Fonts | `next/font` | Geist (sans) + Geist Mono (annotations) |
| Deployment | Vercel | Free tier |
| Icons | lucide-react | Tree-shaken, accessible |

> Font note: do NOT use Inter/Roboto/Arial. Geist gives a clean technical character;
> the monospace (Geist Mono / JetBrains Mono) does the blueprint annotation work and
> gives the type a point of view. The mono is load-bearing for the aesthetic.

---

## 4. Aesthetic — Technical / Architectural

Blueprint sensibility: thin precise lines, monospace coordinate annotations, faint
construction grid, system-diagram node markers, a single architect's-blue accent.
Signals "I think in systems." Refined and precise, not cold-terminal.

### Design Tokens (define once, in globals.css)

```css
@layer base {
  :root {
    --bg:            #FBFAF7;
    --surface:       #FCFBF8;
    --text-primary:  #172A3A;
    --text-secondary:#4A5A66;
    --accent:        #1B6FB8;   /* architect blue */
    --grid:          27 58 92;  /* rgb for alpha use: rgb(var(--grid) / 0.07) */
    --border:        #D8D4C8;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --bg:            #0C1620;
      --surface:       #13110D;
      --text-primary:  #F2F6FA;
      --text-secondary:#9DB2C2;
      --accent:        #5FB3F0;
      --grid:          95 179 240;
      --border:        #1E3247;
    }
  }
  [data-theme="dark"] {
    --bg:#0C1620; --surface:#13110D; --text-primary:#F2F6FA;
    --text-secondary:#9DB2C2; --accent:#5FB3F0; --grid:95 179 240; --border:#1E3247;
  }
}
```

```css
/* Tailwind v4 — map vars into theme */
@theme {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-accent: var(--accent);
  --color-border: var(--border);
}
```

Theme resolution order: manual toggle (`data-theme` on `<html>`, persisted) →
falls back to `prefers-color-scheme`. Set the initial theme via an inline script in
`<head>` BEFORE paint to avoid a flash (no-FOUC pattern).

### Typography scale
- Display (hero h1): clamp(40px, 6vw, 60px), weight 500, letter-spacing -0.02em
- Section h2: clamp(24px, 3vw, 32px), weight 500
- Body: 16px, weight 400, line-height 1.6
- Mono labels: 12px, uppercase allowed, letter-spacing 0.08em, accent colour
- Sentence case everywhere EXCEPT mono annotation labels.

---

## 5. Signature Interaction — Blueprint Scroll-Draw (anime.js v4)

As the user scrolls, SVG paths draw themselves connecting sections — a blueprint
being plotted live. Conceptual hook: a system under construction.

Implementation:
- One or more SVG `<path>` "circuit" lines running down the page, behind content.
- Use anime.js `createDrawable` + `onScroll({ sync: true })` so draw progress is
  scrubbed by scroll position, not just triggered.
- Section content uses staggered reveals (`stagger`) on enter — eased, sequential.
- Node markers (small circles) at each section boundary pulse/scale in as the line
  reaches them.
- Coordinate annotations (`x: 040 — 640`, `node.0N`) fade in at section starts.

```ts
// example pattern — client component, runs in useEffect
import { animate, createDrawable, onScroll, stagger, createTimeline } from 'animejs';

createTimeline().add(createDrawable('.circuit-path'), {
  draw: ['0 0', '0 1'],
  ease: 'inOutQuad',
  autoplay: onScroll({ sync: 0.5 }),
});

animate('.reveal', {
  opacity: [0, 1],
  y: [16, 0],
  delay: stagger(80),
  ease: 'out(3)',
  autoplay: onScroll({ enter: 'bottom-=100 top' }),
});
```

### Reduced motion (mandatory)
Wrap all anime.js setup in a guard:
```ts
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) { /* set final state instantly, no scroll-scrub */ return; }
```
Content must be fully visible and usable with JS disabled and with reduced motion on.

---

## 6. Site Structure (single page, 6 sections)

| # | Section | Content | Animation |
|---|---|---|---|
| 1 | Hero | Name, role label (mono), "Systems that scale. Interfaces that feel.", View work + Download CV, scroll cue | Grid fade, headline stagger, circuit begins |
| 2 | Selected Work | 3 cards: CommonGround, DevReview, Plynth — live links, one-line impact, stack tags | Cards reveal; circuit connects them; node marker each |
| 3 | Experience | Asahi (Lead + Full Stack), Medmate — role + scope, condensed | Timeline path draws down left axis |
| 4 | Skills | Grouped: Frontend / Backend / Cloud & DevOps / AI & Emerging | Stagger per group |
| 5 | About | 2–3 sentences. Multilingual. Region-neutral availability line. | Fade, circuit continues |
| 6 | Contact | Email, LinkedIn, GitHub, location/availability | Circuit terminates at final node |

### Featured projects

| Project | One-liner | Stack tags |
|---|---|---|
| CommonGround | Full-stack chat & matching app | Next.js · Supabase · PostgreSQL |
| DevReview | AI code review tool — streaming, GitHub PR integration | Next.js · Claude API · SSE |
| Plynth | Headless music-gift storefront with AI configurator | Next.js · Redux · iTunes API · Claude API |

> Live URLs: pull from env or a `projects.ts` data file — do not hardcode in JSX.

---

## 7. Suggested File Structure

```
app/
  layout.tsx              # fonts, metadata, JSON-LD, no-FOUC theme script
  page.tsx                # composes sections only — thin
  globals.css             # tokens + @theme + base
  sitemap.ts
  robots.ts
  opengraph-image.tsx     # dynamic OG image (optional, nice-to-have)
components/
  sections/
    Hero.tsx
    SelectedWork.tsx
    Experience.tsx
    Skills.tsx
    About.tsx
    Contact.tsx
  ui/
    Button.tsx
    SectionHeading.tsx
    ProjectCard.tsx
    SkillGroup.tsx
    NodeMarker.tsx
    MonoLabel.tsx
    ThemeToggle.tsx
  animation/
    CircuitPath.tsx        # the SVG blueprint line(s)
    ScrollDraw.tsx         # client wrapper that wires anime.js
lib/
  data/
    projects.ts
    experience.ts
    skills.ts
  theme.ts                 # theme resolution helpers
```

`page.tsx` should read as a table of contents — import and compose section
components, nothing more. Section internals live in their own files.

---

## 8. SEO Checklist

- [ ] `metadata` export in `layout.tsx`: title, description, keywords, authors
- [ ] Open Graph: title, description, type=website, locale, image (1200×630)
- [ ] Twitter card: summary_large_image
- [ ] JSON-LD `Person` schema (name, jobTitle, url, sameAs[LinkedIn,GitHub], knowsAbout)
- [ ] `sitemap.ts` and `robots.ts`
- [ ] Semantic HTML: one `<h1>`, logical `<h2>` per section, `<main>`, `<nav>`, `<footer>`
- [ ] Descriptive `<title>` and meta description (region-neutral)
- [ ] All images via `next/image` with meaningful `alt`
- [ ] `lang="en"` on `<html>`
- [ ] Canonical URL

---

## 9. Accessibility Checklist (WCAG 2.1 AA)

- [ ] Contrast: verify every text/bg pair ≥ 4.5:1 (body), ≥ 3:1 (large) in BOTH themes
- [ ] Keyboard: every interactive element reachable and operable; logical tab order
- [ ] Focus: visible focus ring (accent, 2px offset) — never `outline:none` without replacement
- [ ] `prefers-reduced-motion`: all scroll-draw/stagger disabled, final state shown
- [ ] Landmarks: `<header> <main> <nav> <footer>` present and singular where required
- [ ] Skip-to-content link as first focusable element
- [ ] Theme toggle: real `<button>`, `aria-label`, `aria-pressed`
- [ ] SVG decorative blueprint: `aria-hidden="true"`
- [ ] Project links: descriptive text (not "click here"); external links note new-tab
- [ ] Works with JS disabled (content visible, links functional)
- [ ] Test with axe DevTools + keyboard-only pass before deploy

---

## 10. Performance Targets

- Lighthouse: 95+ Performance, 100 SEO, 100 Accessibility, 100 Best Practices
- No CLS from font swap (use `next/font`, `display: swap` + size-adjust)
- anime.js imported modularly (only the functions used), client-only, below the fold-safe
- Defer animation JS; never block first paint
- Self-host fonts via `next/font`; no render-blocking external CSS

---

## 11. Build Order

1. Scaffold Next.js 16 + Tailwind v4 + TypeScript strict
2. globals.css tokens + `@theme` + no-FOUC theme script + ThemeToggle
3. layout.tsx: fonts, metadata, JSON-LD, landmarks, skip link
4. Static sections content-first (no animation yet): Hero → Contact, each a component
5. Extract ui/ primitives as patterns repeat (Button, ProjectCard, etc.)
6. CircuitPath SVG + ScrollDraw wrapper; wire anime.js scroll-draw + staggers
7. Reduced-motion guard; keyboard + focus pass
8. SEO checklist; sitemap/robots; OG image
9. Accessibility audit (axe + manual); contrast check both themes
10. Lighthouse; deploy to Vercel

---

## 12. Working Notes for Claude Code

- The Claude Design output is a VISUAL baseline only. Re-derive clean, semantic,
  component-split code from it — do not paste large generated blobs into one file.
- Prefer Server Components. Mark Client (`'use client'`) only: ThemeToggle, ScrollDraw.
- No hardcoded colours in components — Tailwind classes bound to the CSS-var theme.
- Keep `page.tsx` thin. If a file exceeds ~150 lines, consider splitting.
- Region-neutral copy: no city-specific availability line in the site body; the
  tailored CVs handle regional targeting.
- Update the Notion "Portfolio Site — Spec" build-phases table at session end.
