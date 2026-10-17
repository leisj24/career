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

- Copy lives in `src/data/profile.ts` as `{ zh, en }` pairs; components should not hardcode copy. Two known exceptions: `src/pages/index.astro` hardcodes `/career/` for the root redirect (intentional), and the CV pages still hardcode section labels (known debt).
- Internal links must use `import.meta.env.BASE_URL` (site is served under `/career/`).
- Never publish the phone number; email is split into `data-u`/`data-d` and assembled by JS.
- Colors come from CSS variables in `src/styles/global.css`: `--paper`, `--ink`, `--accent`, `--accent-dark`, `--muted`, `--rule`.
- Tabs for indentation; no dark mode, no client-side framework.
