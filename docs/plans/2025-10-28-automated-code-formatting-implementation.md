# Automated Code Formatting Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement Prettier-based automated code formatting with editor integration and pre-commit hooks for an Astro Starlight project.

**Architecture:** Prettier 3.x as core formatter with official Astro and Tailwind plugins. Husky manages git hooks, lint-staged optimizes by formatting only staged files. WebStorm editor integration via manual configuration (documented in README).

**Tech Stack:** Prettier, prettier-plugin-astro, prettier-plugin-tailwindcss, husky, lint-staged

---

## Task 1: Install Prettier and Plugins

**Files:**
- Modify: `package.json` (dependencies section)

**Step 1: Install Prettier and plugins**

Run:
```bash
pnpm add -D prettier@latest prettier-plugin-astro@latest prettier-plugin-tailwindcss@latest
```

Expected: Dependencies added to package.json devDependencies

**Step 2: Verify installation**

Run:
```bash
pnpm list prettier prettier-plugin-astro prettier-plugin-tailwindcss
```

Expected: All packages listed with latest versions (3.x+ for Prettier)

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "build: add Prettier with Astro and Tailwind plugins"
```

---

## Task 2: Create Prettier Configuration

**Files:**
- Create: `.prettierrc.json`

**Step 1: Create Prettier config file**

Create `.prettierrc.json` with:
```json
{
  "plugins": [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss"
  ]
}
```

**Why this config:**
- Minimal config uses Prettier defaults (proven standards)
- Plugin array order matters: Tailwind must be last (official requirement)
- Plugins auto-detect file types, no manual overrides needed

**Step 2: Verify config is valid**

Run:
```bash
pnpm exec prettier --help
```

Expected: No errors about invalid config

**Step 3: Commit**

```bash
git add .prettierrc.json
git commit -m "config: add Prettier configuration with plugins"
```

---

## Task 3: Create Prettier Ignore File

**Files:**
- Create: `.prettierignore`

**Step 1: Create ignore file**

Create `.prettierignore` with:
```
# Build outputs
dist/
.astro/

# Dependencies
node_modules/

# Lock files
pnpm-lock.yaml

# Git
.git/
```

**Why these ignores:**
- Build outputs (dist, .astro) are generated, shouldn't be formatted
- node_modules is external code
- Lock files have specific format maintained by package manager
- .git is binary data

**Step 2: Commit**

```bash
git add .prettierignore
git commit -m "config: add Prettier ignore file"
```

---

## Task 4: Add Package Scripts

**Files:**
- Modify: `package.json` (scripts section)

**Step 1: Read current package.json**

Read: `package.json` to see existing scripts section

**Step 2: Add formatting scripts**

Add to `"scripts"` section:
```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "astro": "astro",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

**Script purposes:**
- `format`: Format all files (manual use)
- `format:check`: Check formatting without modifying (CI/verification)

**Step 3: Test format:check script**

Run:
```bash
pnpm format:check
```

Expected: Output showing which files would be formatted (likely many files unformatted at this point)

**Step 4: Commit**

```bash
git add package.json
git commit -m "config: add format and format:check scripts"
```

---

## Task 5: Install and Initialize Husky

**Files:**
- Create: `.husky/` directory with pre-commit hook

**Step 1: Install Husky**

Run:
```bash
pnpm add -D husky@latest
```

Expected: Husky added to devDependencies

**Step 2: Initialize Husky**

Run:
```bash
pnpm exec husky init
```

Expected: Creates `.husky/` directory with default pre-commit hook

**Step 3: Verify Husky setup**

Run:
```bash
ls -la .husky/
```

Expected: Directory exists with pre-commit file

**Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml .husky/
git commit -m "build: add and initialize Husky for git hooks"
```

---

## Task 6: Configure lint-staged

**Files:**
- Create: `.lintstagedrc.json`
- Modify: `.husky/pre-commit`

**Step 1: Install lint-staged**

Run:
```bash
pnpm add -D lint-staged@latest
```

Expected: lint-staged added to devDependencies

**Step 2: Create lint-staged config**

Create `.lintstagedrc.json` with:
```json
{
  "*": "prettier --write --ignore-unknown"
}
```

**Why this config:**
- `"*"` matches all files
- `--ignore-unknown` prevents errors on file types Prettier doesn't support
- Simple pattern works for all our file types

**Step 3: Update pre-commit hook**

Replace contents of `.husky/pre-commit` with:
```bash
pnpm exec lint-staged
```

**Step 4: Make pre-commit executable**

Run:
```bash
chmod +x .husky/pre-commit
```

Expected: Hook has execute permissions

**Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml .lintstagedrc.json .husky/pre-commit
git commit -m "config: configure lint-staged for pre-commit formatting"
```

---

## Task 7: Test Formatting on Sample Files

**Purpose:** Verify formatting works before running on entire codebase

**Step 1: Test on package.json**

Run:
```bash
pnpm exec prettier --write package.json
```

Expected: File formatted (if not already formatted)

**Step 2: Check git diff**

Run:
```bash
git diff package.json
```

Expected: See formatting changes (indentation, spacing, etc.)

**Step 3: Test on astro.config.mjs**

Run:
```bash
pnpm exec prettier --write astro.config.mjs
```

Expected: File formatted

**Step 4: Check git diff**

Run:
```bash
git diff astro.config.mjs
```

Expected: See formatting changes

**Step 5: Verify pre-commit hook works**

Run:
```bash
git add package.json astro.config.mjs
git commit -m "test: verify formatting works"
```

Expected: Hook runs, formats staged files, commit succeeds

---

## Task 8: Format Entire Codebase

**Purpose:** Apply consistent formatting to all existing files

**Step 1: Run format on entire codebase**

Run:
```bash
pnpm format
```

Expected: Prettier formats all files, shows list of formatted files

**Step 2: Review changes**

Run:
```bash
git status
git diff --stat
```

Expected: Many files modified with formatting changes

**Step 3: Spot-check a few files**

Run:
```bash
git diff src/content/docs/getting-started/onboarding.md
```

Expected: See formatting improvements (line wrapping, spacing, etc.)

**Step 4: Commit formatted codebase**

```bash
git add .
git commit -m "style: format entire codebase with Prettier

Applied Prettier formatting across all JavaScript, TypeScript, Astro,
CSS, Markdown, and configuration files. This establishes the formatting
baseline for the project."
```

---

## Task 9: Document WebStorm Setup

**Files:**
- Create or modify: `README.md` (add Developer Setup section)

**Step 1: Read existing README**

Read: `README.md` to see current structure

**Step 2: Add WebStorm setup section**

Add section to README.md:

```markdown
## Developer Setup

### Code Formatting (WebStorm)

This project uses Prettier for automated code formatting. To enable format-on-save in WebStorm:

1. Open **Preferences → Languages & Frameworks → JavaScript → Prettier**
2. Set **Prettier package** to project's `node_modules/prettier` (should auto-detect)
3. Enable **On save** checkbox
4. Set **Run for files** pattern to:
   ```
   {**/*,*}.{js,ts,jsx,tsx,astro,css,md,mdx,json,yaml,yml}
   ```
5. Apply and close preferences

**Pre-commit hook:** Formatting runs automatically before each commit via Husky and lint-staged. You don't need to remember to format manually.

**Manual formatting:**
- Format all files: `pnpm format`
- Check formatting: `pnpm format:check`
```

**Step 3: Commit documentation**

```bash
git add README.md
git commit -m "docs: add WebStorm formatting setup instructions"
```

---

## Task 10: Verify Complete Setup

**Purpose:** End-to-end verification that all components work together

**Step 1: Test format:check script**

Run:
```bash
pnpm format:check
```

Expected: "All matched files use Prettier code style!" (no formatting issues)

**Step 2: Test pre-commit hook with intentional formatting issue**

Run:
```bash
echo '{"test":    "spacing"}' > test-format.json
git add test-format.json
git commit -m "test: verify pre-commit formats files"
```

Expected: Hook runs, formats test-format.json, commit succeeds

**Step 3: Verify formatted result**

Run:
```bash
cat test-format.json
```

Expected: File properly formatted with correct spacing

**Step 4: Clean up test file**

```bash
git rm test-format.json
git commit -m "test: remove formatting test file"
```

**Step 5: Final verification**

Run:
```bash
pnpm format:check
```

Expected: All files formatted correctly

**Step 6: Success**

All formatting automation is now active:
✅ Prettier configured with Astro and Tailwind plugins
✅ Format and format:check scripts available
✅ Pre-commit hook formats staged files automatically
✅ WebStorm setup documented in README
✅ Entire codebase formatted consistently

---

## Summary

**Commits made:** ~10 commits
**Time estimate:** 20-30 minutes total
**Testing:** Each task verified before moving forward

**Next steps for developer:**
1. Configure WebStorm using instructions in README.md
2. Test format-on-save by making edits to any file
3. Test pre-commit hook by staging and committing changes
4. Enjoy automated formatting!
