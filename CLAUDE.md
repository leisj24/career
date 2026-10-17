# CLAUDE.md

## Overview

Bilingual (zh/en) single-page academic homepage for job applications, deployed at https://leisj24.github.io/career/ via GitHub Pages. Astro 6, no UI framework, no client router.

## Commands

| Command | Action |
| :-- | :-- |
| `npm run dev` | Dev server |
| `npm run build` | Production build to `dist/` |
| `npm run check` | Type-check |
| `npm run preview` | Preview build |

## Conventions

- All copy lives in `src/data/profile.ts` as `{ zh, en }` pairs; never hardcode copy in components.
- Internal links must use `import.meta.env.BASE_URL` (site is served under `/career/`).
- Never publish the phone number; email is split into `data-u`/`data-d` and assembled by JS.
- Colors come from CSS variables in `src/styles/global.css` (paper/ink/teal).
- Tabs for indentation; no dark mode, no client-side framework.
