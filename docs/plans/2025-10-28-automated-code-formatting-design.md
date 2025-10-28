# Automated Code Formatting Design

**Date:** 2025-10-28
**Project:** Otto Support Site (Astro Starlight)
**Status:** Approved

## Overview

Implement automated code formatting using Prettier with plugins to maintain consistent code style across JavaScript, TypeScript, Astro, CSS/Tailwind, Markdown, and configuration files.

## Goals

- **Personal productivity:** Eliminate manual formatting decisions
- **On-save formatting:** Instant feedback in WebStorm editor
- **Pre-commit enforcement:** Automatic formatting before each commit
- **Comprehensive coverage:** Format all project file types

## Architecture Decision

**Selected Approach:** Prettier + plugins (ecosystem)

**Rationale:**

- Industry standard with proven Astro/Starlight support
- Comprehensive plugin ecosystem for all required file types
- Well-documented, actively maintained
- Official Astro team recommendation

**Alternatives Considered:**

- Biome (all-in-one): Faster but lacks Markdown and Tailwind support
- Hybrid Biome + Prettier: Added complexity without clear benefit for solo project

## Core Dependencies

### Prettier Stack

- `prettier` (v3.4+) - Main formatting engine
- `prettier-plugin-astro` - Astro component syntax support
- `prettier-plugin-tailwindcss` - Automatic Tailwind class sorting
- `eslint-config-prettier` - Prevent ESLint/Prettier conflicts (future-proofing)

### Automation Tools

- `husky` (v9+) - Git hooks manager
- `lint-staged` (v15+) - Format only staged files for fast commits

**Note:** Use latest stable versions at implementation time (late 2025).

## Configuration Files

### 1. `.prettierrc.json`

Main Prettier configuration:

```json
{
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"]
}
```

**Plugin ordering requirement:** Tailwind plugin must be last (official requirement).

**Configuration philosophy:** Start with Prettier defaults. Add customizations only if needed (e.g., line width, quote style).

### 2. `.prettierignore`

Exclude from formatting:

```
dist/
.astro/
node_modules/
pnpm-lock.yaml
# Add generated files as needed
```

### 3. `package.json` Scripts

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

- `format`: Manual format all files
- `format:check`: CI/verification mode (non-destructive)

### 4. `.lintstagedrc.json`

Configure staged file formatting:

```json
{
  "*": "prettier --write --ignore-unknown"
}
```

**Flag explanation:** `--ignore-unknown` prevents errors on unsupported file types.

### 5. `.husky/pre-commit`

Git hook script:

```bash
pnpm exec lint-staged
```

## Editor Integration: WebStorm

**Manual one-time setup required:**

1. **Enable Prettier:**
   - Preferences → Languages & Frameworks → JavaScript → Prettier
   - Prettier package: Auto-detect `node_modules/prettier`
   - Enable: "On save"
   - Run for files: `{**/*,*}.{js,ts,jsx,tsx,astro,css,md,mdx,json,yaml,yml}`

2. **Set as default formatter:**
   - Preferences → Editor → Code Style
   - Set Prettier as default for relevant file types

**Why manual:** WebStorm stores settings in `.idea/` (gitignored, user-specific). The `.prettierrc.json` serves as project-wide source of truth.

## Pre-Commit Workflow

1. Developer runs: `git commit -m "message"`
2. Husky intercepts and executes `.husky/pre-commit`
3. lint-staged formats only staged files
4. If files modified: Auto-restage and proceed with commit
5. If formatter errors: Block commit, show error

**Performance:** Only formats changed files (fast commits).

**Reliability:** Every commit gets consistent formatting automatically.

## Implementation Steps (High-Level)

1. Install dependencies (Prettier, plugins, husky, lint-staged)
2. Create configuration files
3. Initialize husky and configure pre-commit hook
4. Test formatting on sample files
5. Document WebStorm setup steps in README
6. Run full format on codebase (`pnpm format`)
7. Commit formatted codebase

## File Types Covered

- JavaScript/TypeScript: `.js`, `.ts`, `.jsx`, `.tsx`
- Astro components: `.astro`
- Styles: `.css`
- Tailwind classes: Sorted in all files (Astro, JSX, etc.)
- Documentation: `.md`, `.mdx`
- Configuration: `.json`, `.yaml`, `.yml`

## Success Criteria

- WebStorm formats files on save
- Pre-commit hook formats staged files automatically
- All configured file types format correctly
- Commits remain fast (lint-staged optimization)
- Zero manual formatting needed in daily workflow
