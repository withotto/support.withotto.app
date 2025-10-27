# Support Site Brand Colors & Fonts Design

**Date:** 2025-10-27
**Status:** Approved
**Scope:** Apply With Otto brand identity to support.withotto.app

## Overview

Update the support site (built with Astro + Starlight) to use brand colors and typography from the main withotto.app site, while maintaining Starlight's documentation structure and UX patterns.

## Goals

1. Apply Rethink Sans Variable font across the support site
2. Implement brand color palette (primary teal, terracotta, semantic colors)
3. Create diverse, accessible callout palette for documentation
4. Maintain Starlight's functionality and component structure
5. Ensure WCAG AA accessibility standards

## Design Decisions

### Customization Level
**Light customization** - Override colors, fonts, and component styling while keeping Starlight's structure intact. Balances brand consistency with documentation best practices.

### Color Strategy
**Teal primary with strategic terracotta accents:**
- Primary teal (#00AC8A) for links, buttons, active states, key actions
- Terracotta (#e67d5f) for callouts, secondary elements, warmth
- Diverse callout palette for different content types

### Technical Approach
**Hybrid implementation:**
- Tailwind config defines color tokens and font family (consistency with main site)
- CSS custom properties map tokens to Starlight's theming system (proper integration)
- Self-hosted fonts via @fontsource-variable npm package

## Typography

### Font Family
**Rethink Sans Variable** - variable font providing full weight range (400-700)

### Implementation
1. Install `@fontsource-variable/rethink-sans` npm package (matches main site)
2. Import in `src/style.css` at top of file
3. Configure Tailwind to use Rethink Sans as default sans-serif family
4. Starlight inherits typography from Tailwind base configuration

### Font Loading
```javascript
// package.json dependency
"@fontsource-variable/rethink-sans": "^5.2.6"

// src/style.css import
@import '@fontsource-variable/rethink-sans';
```

## Color Palette

### Core Brand Colors (from main site)

**Default (Text & Neutrals)**
- DEFAULT: `#2D2D2D` - Primary text
- soft: `#696969` - Secondary text, muted elements
- strong: `#000000` - Headings, high emphasis

**Primary (Brand Teal)**
- DEFAULT: `#00AC8A` - Links, buttons, active states
- soft: `#E9F2E1` - Hover backgrounds, subtle highlights
- accent: `#CDDDC0` - Alternative light teal
- medium: `#A1B58F` - Mid-range teal-green
- strong: `#115E59` - Dark teal, high contrast

**Terracotta (Warm Accent)**
- DEFAULT: `#e67d5f` - Examples, warm callouts
- soft: `#faf3f0` - Light backgrounds
- medium: `#f0b8a6` - Mid-range terracotta
- strong: `#b85a3d` - Dark terracotta

**Muted (Backgrounds)**
- DEFAULT: `#2c3b2a` - Dark muted green
- soft: `#F9FAFB` - Light gray backgrounds
- strong: `#E5E7EB` - Borders, dividers

**Semantic Colors**
- success: `#34D399`, soft: `#E3FCEF`, strong: `#047857`
- warning: `#FBBF24`, soft: `#FFFAEB`, strong: `#A16207`
- danger: `#EF4444`, soft: `#FEF2F2`, strong: `#7F1D1D`
- info: `#3B82F6`, soft: `#EFF6FF`, strong: `#1E40AF`

### Enhanced Callout Palette

Diverse color set for different documentation content types, all WCAG AA accessible:

1. **Note (Info Blue)** - `#3B82F6` - General informational content
2. **Tip (Success Green)** - `#34D399` - Helpful hints, best practices
3. **Warning (Amber)** - `#FBBF24` - Cautions, things to watch out for
4. **Danger (Red)** - `#EF4444` - Critical warnings, breaking changes
5. **Example (Terracotta)** - `#e67d5f` - Code examples, demonstrations
6. **Important (Primary Teal)** - `#00AC8A` - Key takeaways, highlights
7. **Tutorial (Purple)** - `#8B5CF6` - Step-by-step guides, walkthroughs
8. **Reference (Slate)** - `#64748B` - Technical references, API docs

Each callout type includes:
- Soft variant (10-15% opacity) for backgrounds
- Default for borders and medium emphasis
- Strong variant for icons and high emphasis
- Minimum 4.5:1 contrast ratio for text

## Component Styling

### Header & Navigation
- **Active states:** Primary teal background with soft teal highlight
- **Hover states:** Light teal background (#E9F2E1)
- **Text colors:** Default (#2D2D2D) for main text, strong (#000000) for emphasis
- **Search bar:** Teal focus rings using primary color

### Sidebar
- **Active page:** Primary teal indicator with soft background
- **Hover:** Light teal background on links
- **Category headers:** Default strong (#000000) for hierarchy
- **Icons:** Muted soft (#696969) for visual weight balance

### Content Area
- **Headings:** Default strong (#000000), Rethink Sans font
- **Body text:** Default (#2D2D2D)
- **Links:** Primary teal, terracotta on hover (visual interest)
- **Code blocks:** Maintain Starlight syntax highlighting, add subtle primary border
- **Inline code:** Muted soft background (#F9FAFB)

### Callout Boxes
- **Background:** Soft variant of callout color (subtle)
- **Border:** 4px left border in main color (visual distinction)
- **Icon:** Strong variant for clarity
- **Structure:** Maintain Starlight's callout HTML/CSS structure

### Footer
- **Custom component:** Already exists at `src/components/Footer.astro`
- **Links:** Primary teal
- **Background:** Muted soft (#F9FAFB) or white
- **Text:** Default color palette

## Implementation Structure

### File Organization

```
support.withotto.app/
├── package.json                      # Add @fontsource-variable/rethink-sans
├── tailwind.config.mjs               # Define all color tokens & font family
├── src/
│   ├── style.css                     # Import font, map to Starlight CSS vars
│   └── components/
│       └── Footer.astro              # Update to use new color tokens
└── docs/
    └── plans/
        └── 2025-10-27-brand-colors-fonts-design.md  # This document
```

### Tailwind Configuration

Extend theme with complete brand palette:

```javascript
// tailwind.config.mjs
import starlightPlugin from '@astrojs/starlight-tailwind';
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rethink Sans Variable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        default: {
          DEFAULT: "#2D2D2D",
          soft: "#696969",
          strong: "#000000",
        },
        primary: {
          DEFAULT: "#00AC8A",
          soft: "#E9F2E1",
          accent: "#CDDDC0",
          medium: "#A1B58F",
          strong: "#115E59",
        },
        muted: {
          DEFAULT: "#2c3b2a",
          soft: "#F9FAFB",
          strong: "#E5E7EB",
        },
        terracotta: {
          DEFAULT: "#e67d5f",
          soft: "#faf3f0",
          medium: "#f0b8a6",
          strong: "#b85a3d",
        },
        success: {
          DEFAULT: "#34D399",
          soft: "#E3FCEF",
          strong: "#047857",
        },
        warning: {
          DEFAULT: "#FBBF24",
          soft: "#FFFAEB",
          strong: "#A16207",
        },
        danger: {
          DEFAULT: "#EF4444",
          soft: "#FEF2F2",
          strong: "#7F1D1D",
        },
        info: {
          DEFAULT: "#3B82F6",
          soft: "#EFF6FF",
          strong: "#1E40AF",
        },
        // Additional callout colors
        purple: {
          DEFAULT: "#8B5CF6",
          soft: "#F5F3FF",
          strong: "#6D28D9",
        },
        slate: {
          DEFAULT: "#64748B",
          soft: "#F8FAFC",
          strong: "#334155",
        },
      },
    },
  },
  plugins: [starlightPlugin()],
};
```

### CSS Custom Properties Mapping

Map Tailwind tokens to Starlight's theming system:

```css
/* src/style.css */
@import '@fontsource-variable/rethink-sans';

@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind variants;

:root {
  /* Typography */
  font-family: theme('fontFamily.sans');

  /* Accent colors - Primary Teal */
  --sl-color-accent: theme('colors.primary.DEFAULT');
  --sl-color-accent-low: theme('colors.primary.soft');
  --sl-color-accent-high: theme('colors.primary.strong');

  /* Text colors */
  --sl-color-text: theme('colors.default.DEFAULT');
  --sl-color-text-accent: theme('colors.primary.DEFAULT');

  /* Background & grays */
  --sl-color-bg: #ffffff;
  --sl-color-gray-1: theme('colors.muted.soft');
  --sl-color-gray-2: theme('colors.muted.strong');
  --sl-color-gray-3: theme('colors.default.soft');
  --sl-color-gray-4: theme('colors.default.DEFAULT');
  --sl-color-gray-5: theme('colors.default.strong');
  --sl-color-gray-6: theme('colors.default.strong');

  /* Starlight callout colors */
  --sl-color-blue: theme('colors.info.DEFAULT');
  --sl-color-blue-low: theme('colors.info.soft');
  --sl-color-blue-high: theme('colors.info.strong');

  --sl-color-green: theme('colors.success.DEFAULT');
  --sl-color-green-low: theme('colors.success.soft');
  --sl-color-green-high: theme('colors.success.strong');

  --sl-color-orange: theme('colors.warning.DEFAULT');
  --sl-color-orange-low: theme('colors.warning.soft');
  --sl-color-orange-high: theme('colors.warning.strong');

  --sl-color-red: theme('colors.danger.DEFAULT');
  --sl-color-red-low: theme('colors.danger.soft');
  --sl-color-red-high: theme('colors.danger.strong');

  --sl-color-purple: theme('colors.purple.DEFAULT');
  --sl-color-purple-low: theme('colors.purple.soft');
  --sl-color-purple-high: theme('colors.purple.strong');
}

/* Custom callout types */
.starlight-aside--example {
  border-color: theme('colors.terracotta.DEFAULT');
  background-color: theme('colors.terracotta.soft');
}

.starlight-aside--important {
  border-color: theme('colors.primary.DEFAULT');
  background-color: theme('colors.primary.soft');
}

.starlight-aside--reference {
  border-color: theme('colors.slate.DEFAULT');
  background-color: theme('colors.slate.soft');
}
```

## Testing & Validation

### Accessibility Checks
- Verify all color combinations meet WCAG AA standards (4.5:1 contrast ratio)
- Test with screen readers for semantic structure
- Ensure keyboard navigation works with new focus styles

### Visual Testing
- Verify callout distinctiveness across all 8 types
- Check link colors and hover states
- Test font rendering across browsers (Chrome, Firefox, Safari)
- Verify mobile responsiveness

### Cross-browser Testing
- Font loading and fallbacks
- CSS custom property support
- Tailwind theme() function compatibility

### Performance
- Font file sizes (woff2 variable font is efficient)
- CSS bundle size after Tailwind processing
- First paint metrics with self-hosted fonts

## Migration Path

1. Install font dependency
2. Update Tailwind configuration with full color palette
3. Update style.css with font import and CSS variable mappings
4. Test all pages and callout types
5. Update Footer component if needed
6. Commit and deploy

## Future Considerations

- Dark mode support (if needed, duplicate color mappings for dark theme)
- Additional callout types based on content needs
- Animation/transition refinements for interactive elements
- Performance monitoring for font loading strategies

## References

- Main site: `/Users/stuart/src/websites/withotto.app-v2`
- Main site Tailwind config: `withotto.app-v2/tailwind.config.cjs`
- Support site: `/Users/stuart/src/websites/support.withotto.app`
- Starlight theming docs: https://starlight.astro.build/guides/css-and-tailwind/
