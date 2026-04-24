# Content & MDX Conventions

Authoring conventions for Starlight docs in this repo. Loads every session. Starlight defaults are assumed, only project-specific patterns captured here.

## Adding a New Doc Page

1. Create `src/content/docs/<area>/<slug>.mdx` (e.g. `src/content/docs/capture/guides/new-guide.mdx`).
2. Add frontmatter:
   ```yaml
   ---
   title: Page title
   description: One-line SEO/meta description
   ---
   ```
3. **Register the page in the sidebar:** `astro.config.mjs` → `starlight({ sidebar: [...] })`. Starlight does NOT auto-discover pages into the sidebar in this project; every page must be added by hand with its `slug` (path relative to `src/content/docs/`, no extension).
4. If the new page replaces an existing public URL, add a 301 in `public/_redirects`.

## Content Areas

Two top-level sections under `src/content/docs/`:

- `capture/`: Otto Capture (AI document extraction)
- `bank-rec/`: Bank reconciliation

Root landing page lives at `src/content/docs/index.mdx`.

## Importing Assets in MDX

Use TypeScript path aliases (defined in `tsconfig.json`):

```mdx
import { Aside, Steps, Card, CardGrid } from "@astrojs/starlight/components";
import Image from "@components/ZoomableImage.astro";
import mySettings from "@assets/capture/getting-started/configuring-clients/client-settings-general.png";
```

**Rules:**

- **Image paths mirror the content path exactly.** A doc at `src/content/docs/<area>/<section>/<page>.mdx` stores its images under `src/assets/<area>/<section>/<page>/*.png`. This is a firm convention; follow it when adding new screenshots.
- Always import via `@assets/*` (not relative paths), so `astro:assets` can optimise them.
- **Use `ZoomableImage` (aliased as `Image`) for screenshots**, not the bare `astro:assets` `Image`. It wraps `starlight-image-zoom` so users can click to zoom.
- Image import identifiers are camelCase; Bank Rec pages conventionally suffix them with `Image` (e.g. `dashboardImage`, `usersListImage`). Capture pages use bare camelCase (e.g. `oauthConsent`, `generalSettings`). Match the neighbouring pages' style.

### Alt text

- Portal / screenshot-heavy pages use **"Screenshot of the X page"** (e.g. `alt="Screenshot of the dashboard page"`).
- Conceptual/explanatory images use a descriptive sentence (e.g. `alt="Example of a reconciliation match"`).

## Internal Links

**Always use absolute, site-root-relative paths** — the slug exactly as it appears under `src/content/docs/`, prefixed with `/`. No `.mdx` extension, no trailing slash, no hard-coded `https://support.withotto.app`.

```md
[Connecting Xero](/capture/getting-started/connecting-xero)
[Feedback](/bank-rec/guides/feedback)
[SmartMatch confidence](/bank-rec/guides/smartmatch#confidence)
[Fixed or uncapped billing](/bank-rec/portal/settings#billing-type)
```

Do NOT use relative paths (`../guides/smartmatch`, `./feedback`). Absolute paths are robust against page moves, greppable across the corpus, and consistent with the slug identity. Broken internal links are caught by `astro check` during build.

## Custom Components

All in `src/components/`:

| Component             | Purpose                                          | Usage                                   |
| --------------------- | ------------------------------------------------ | --------------------------------------- |
| `ZoomableImage.astro` | Zoomable screenshot (wraps `astro:assets` Image) | `<Image src={img} alt="..." />`         |
| `GuideJar.astro`      | Embed interactive guide from guidejar.com        | `<GuideJar id="<guide-id>" />`          |
| `Trace.astro`         | Embed interactive guide from app.tracework.ai    | `<Trace id="<guide-id>" />`             |
| `Footer.astro`        | Starlight footer override (extends the default)  | Wired via Starlight component overrides |

**Iframe URLs embedded by these components:**

- GuideJar → `https://www.guidejar.com/embed/{id}?type=1&controls=on`
- Trace → `https://app.tracework.ai/embed/{id}?viewMode=interactive`

## Starlight Components Commonly Used

Imported from `@astrojs/starlight/components`:

- `Aside`: callouts (`type="note" | "tip" | "caution" | "danger"`)
- `Steps`: numbered step list
- `Card`, `CardGrid`: homepage/overview landing tiles
- `Tabs`, `TabItem`: tabbed content

### Aside conventions

- Tips and notes: `<Aside type="tip">` or plain `<Aside>`.
- Warnings / gotchas: `<Aside type="caution">`. Used heavily on settings pages.
- **Titled asides** for common patterns:
  - Cross-references at the bottom of a page: `<Aside type="tip" title="Related pages">`
  - Emphasised caveats: `<Aside type="caution" title="Please note">`
  - Explanatory tip: `<Aside type="tip" title="Why use a custom schedule?">` (custom titles ok)

## Voice and spelling

Voice and tone guidance lives in three separate files. Load the ones relevant to the session:

- `.claude/rules/support-withotto-voice-common.md`: shared principles, punctuation, spelling, numbers, banned phrases. Always load when writing or editing content.
- `.claude/rules/support-withotto-voice-capture.md`: Capture-specific voice. Load when working under `src/content/docs/capture/`.
- `.claude/rules/support-withotto-voice-bankrec.md`: Bank Rec-specific voice. Load when working under `src/content/docs/bank-rec/`.

Product-specific files cover Otto's role, terminology, page patterns, and before/after examples.

## Redirects

- Edit `public/_redirects` using Netlify's format: `from  to  status` (three columns, whitespace-separated, e.g. `301`).
- Most existing entries migrated legacy Bank Rec URLs (`/guides/*`, `/portal/*`, `/getting-started/*`) into the `/bank-rec/` prefix. Follow that shape when adding new ones.
- Redirects are NOT managed by Astro. Only `public/_redirects` is deployed to Netlify.

## Styling

- Custom CSS is loaded via Starlight's `customCss: ["./src/styles/global.css", "./src/styles/brand.css"]` in `astro.config.mjs`. Add new global styles to one of those two files.
- Tailwind 4 is available inside `.astro` components via the `@tailwindcss/vite` plugin. Use utility classes directly; no `@apply` import needed.
- `prettier-plugin-tailwindcss` will auto-sort class lists on format/commit.

## Formatting

- Prettier handles `.astro`, `.md`, `.mdx`, `.ts`, `.css`, etc. Plugins: `prettier-plugin-astro`, `prettier-plugin-tailwindcss`.
- Pre-commit hook (`.husky/pre-commit`) runs `lint-staged` which invokes `prettier --write --ignore-unknown` on every staged file. No need to format manually before committing.
- To format the whole repo on demand: `pnpm format`.
- Ignored: `dist/`, `.astro/`, `node_modules/`, `pnpm-lock.yaml`, `.git/` (see `.prettierignore`).

## Build Gotchas

- `pnpm build` runs `astro check` first. Type errors in MDX frontmatter or component props will fail the build.
- Broken internal links are caught by `astro check`; fix them at source rather than adding redirects.
- After editing `astro.config.mjs` (sidebar etc.), restart the dev server. HMR doesn't always pick up config changes.
