# Project: support.withotto.app

**Last Updated:** 2026-04-24

## Overview

Public support documentation site for With Otto. Covers two products:

- **Otto Capture**: AI receipt/bill/invoice extraction that publishes to accounting platforms (e.g. Xero)
- **Bank Rec**: bank reconciliation product

Deployed at https://support.withotto.app (Netlify, static output).

## Technology Stack

- **Framework:** Astro 5 + Starlight 0.37 (docs theme)
- **Styling:** Tailwind CSS 4 via `@tailwindcss/vite` plugin (configured in `astro.config.mjs` → `vite.plugins`)
- **Content:** MDX files under `src/content/docs/` using Starlight's `docsSchema`
- **Adapter:** `@astrojs/netlify` (static site, `output: "static"`)
- **Image zoom:** `starlight-image-zoom` plugin
- **Package manager:** pnpm 10 (enforced in `package.json` `engines`). **Never run `npm install`**.
- **Runtime:** Node 24 (enforced in `package.json` `engines`), managed via `mise` (see `.mise.toml`)
- **Formatter:** Prettier 3 with `prettier-plugin-astro` + `prettier-plugin-tailwindcss`
- **Pre-commit:** Husky + lint-staged, auto-formats staged files

## Directory Structure

```
.
├── astro.config.mjs         # Starlight config, sidebar, head tags
├── netlify.toml             # Netlify build config
├── public/
│   ├── _redirects           # Netlify 301 redirects (bank-rec URL migration)
│   ├── favicons/
│   └── robots.txt
├── src/
│   ├── assets/              # Images referenced from MDX via @assets/*
│   │   ├── capture/
│   │   ├── bank-rec/
│   │   └── logo-{light,dark}.svg
│   ├── components/          # Astro components referenced via @components/*
│   │   ├── Footer.astro        # Extends Starlight's default footer
│   │   ├── GuideJar.astro      # guidejar.com interactive-guide embed
│   │   ├── Trace.astro         # tracework.ai interactive-guide embed
│   │   └── ZoomableImage.astro # Wraps starlight-image-zoom + astro:assets Image
│   ├── content/
│   │   ├── config.ts        # Content collection using docsSchema()
│   │   └── docs/
│   │       ├── capture/     # Otto Capture docs
│   │       ├── bank-rec/    # Bank Rec docs
│   │       └── index.mdx    # Landing page
│   ├── styles/
│   │   ├── brand.css
│   │   └── global.css       # Both listed in starlight customCss
│   ├── style.css
│   └── env.d.ts
└── docs/plans/              # /spec plan files
```

## Path Aliases

Defined in `tsconfig.json`, used throughout MDX:

- `@components/*` → `src/components/*`
- `@assets/*` → `src/assets/*`

## Development Commands

| Task             | Command             | Notes                                       |
| ---------------- | ------------------- | ------------------------------------------- |
| Install          | `pnpm install`      | Never use `npm install`                     |
| Dev server       | `pnpm dev`          | Starts at `http://localhost:4321`           |
| Build            | `pnpm build`        | Runs `astro check && astro build` → `dist/` |
| Preview build    | `pnpm preview`      |                                             |
| Format all       | `pnpm format`       | Writes via Prettier                         |
| Check formatting | `pnpm format:check` |                                             |
| Astro CLI        | `pnpm astro <cmd>`  | e.g. `pnpm astro check`                     |

**Note:** `README.md` still shows `npm run ...` commands from the Starlight starter template. Prefer `pnpm` per the `engines` field.

## Deployment

- Netlify builds with `npm run build` (from `netlify.toml`) and publishes `dist/`.
- Redirects live in `public/_redirects` (Netlify format, 301s).
- Sitemap auto-generated at `/sitemap-index.xml` via `@astrojs/sitemap`.

## Git

- **Remote:** `git@github.com:withotto/support.withotto.app.git`
- **Default branch:** `main`
- Pre-commit hook (`.husky/pre-commit`) activates mise then runs `pnpm exec lint-staged`. All staged files are formatted by Prettier before commit.
