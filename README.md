# Harbour Design System + accessible claim flow (UX case study)

A small design system for a fictional insurance company and a UX case study that uses it.

- **Design tokens** (`tokens/tokens.json` → `css/tokens.css`): colour, spacing, radius, type, touch-target size
- **7 reusable components** with usage guidelines, do's and don'ts and naming conventions:
  button, text field, checkbox and radio group, switch, alert, tabs, dialog (plus a stepper)
- **Accessibility built in:** WCAG 2.2 AA colour contrast, visible focus, 44px targets, keyboard patterns
  from the WAI-ARIA Authoring Practices, errors announced to screen readers, reduced-motion support
- **UX case study:** problem, proto-personas, journey map, low-fidelity wireframes, design decisions,
  accessibility review and a usability test plan
- **Clickable prototype:** a 3-step health claim flow built only from the components
- **22 automated tests:** token contrast (WCAG formula), axe-core WCAG 2.2 AA scans of every page,
  keyboard behaviour of tabs, dialog and switch, and the prototype flow
- **Figma:** see [FIGMA_GUIDE.md](FIGMA_GUIDE.md) to rebuild the system in Figma with variables and variants

Pages: `index.html` (design system docs), `case-study.html`, `prototype.html`.

> The company, people and data are fictional. Usability findings are left blank until real sessions are run.

## Run it (Windows Command Prompt)

Needs Node.js 18 or newer (`node --version`).

```
npm install
npm test
npm run tokens
start index.html
```

`npm test` should show **22 passed**. `npm run tokens` rebuilds the CSS and prints the contrast report (14/14 pass).

## Publish with GitHub Pages

Repo → **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
After a minute the site is at `https://<your-username>.github.io/accessible-design-system/`.

## Project layout

```
tokens/tokens.json       design tokens (source of truth) and the colour pairs to check
scripts/build-tokens.js  builds css/tokens.css and prints the contrast report
scripts/contrast.js      WCAG contrast ratio formula
css/components.css       component styles (only tokens, no hard-coded colours)
js/components.js         switch, tabs, dialog, disabled buttons, accessible form validation
index.html               design system documentation
case-study.html          UX case study
prototype.html           clickable claim flow
tests/                   Vitest + jsdom + axe-core tests
FIGMA_GUIDE.md           step-by-step guide to build it in Figma
```
