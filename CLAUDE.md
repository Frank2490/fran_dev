# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build (runs type check + ESLint)
npm run lint     # ESLint only
```

There are no tests in this project.

## Architecture

Single-page Next.js 14 portfolio (App Router, `'use client'` components throughout). The entire site renders from `app/page.tsx` which stacks section components in order: `Navbar → Hero → Projects → About → Contact → Footer`.

### Color palette

All accent/background/text colors are hardcoded hex strings in component inline styles — **not** Tailwind utility classes. The source of truth for the current palette is `tailwind.config.ts` (under `theme.extend.colors`), but components use hardcoded hex. When changing the palette, use bulk `sed` replacements across all component files and update `tailwind.config.ts` and `app/globals.css` in the same pass.

Current palette (as of last update):
- bg: `#0D1117` / surface: `#161B22`
- border: `#30363D`
- accent: `#7C3AED` / dark: `#6D28D9` / light: `#A78BFA`
- text: `#FFFFFF` / muted: `#8B949E`

### Custom hooks (`/hooks`)

- `useInView(threshold?)` — wraps `IntersectionObserver`, fires once when element enters viewport, returns `{ ref, isInView }`. Used for section fade-in animations.
- `useScramble(text, start, speed?)` — randomizes characters then resolves to target text. Still used in `Hero.tsx` for "Projektuję i buduję —" (triggered by `phase >= 2`). Removed from section headings and project titles (replaced with CSS `translateX` fade-in).

### Animation system in `Hero.tsx`

Uses a `phase` integer (0–4) that advances via sequential `setTimeout`s after the typewriter finishes. `fadeStyle(phase, threshold, delay)` returns inline opacity/transform styles. Phase advances: typewriter → phase 1 → then `[300, 500, 700]ms` timeouts set phases 2, 3, 4. Stats use a separate `useCountUp` hook triggered by `IntersectionObserver`.

### Projects modal

`Projects.tsx` holds all project data in a `categories` array. Clicking any `ProjectRow` sets `selectedProject` state in the parent `Projects` component, which renders a fixed-position modal overlay. Each `ProjectRow` has its own `IntersectionObserver` for the title fade-in animation.

### JSX comment rule

`//` comments inside JSX text nodes cause ESLint errors (`react/jsx-no-comment-textnodes`). Wrap them in template literals: `` {`// comment`} ``.
