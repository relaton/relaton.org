# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) for working with code in this repository.

## Project overview

Relaton.org is the documentation website for the [Relaton](https://github.com/metanorma/relaton) project — a unified bibliographic data model and tooling for citing technical standards (ISO, IEC, ITU, NIST, IEEE, etc.). The site is built with **Astro 7 + Vite 8 + Tailwind CSS 4 + Vue islands** and deployed to GitHub Pages.

## Build and serve commands

```bash
# Install dependencies
npm install

# Dev server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Content architecture

Pages live in `src/pages/`. Markdown pages declare their layout in frontmatter (`layout: ../../layouts/Docs.astro`); interactive pages are `.astro`/`.mdx` files embedding Vue islands with `client:load` / `client:visible`.

| Section | Location | Purpose |
|---|---|---|
| Home | `src/pages/index.astro` | Landing page — `<HomePage client:load />` island |
| Model | `src/pages/model/` | Information model docs (19 pages + iso-690/ subsection), `Docs.astro` layout with sidebar |
| Flavors | `src/pages/flavors/[flavor].astro` | Dynamic routes over `src/data/flavors.ts`; citation guide markdown read from root `flavors/content/{id}.md` and rendered server-side with `marked` |
| Specs | `src/pages/specs/` | Specification documents (relaton-yaml, relaton-render, cli, ruby, asciibib) |
| Software | `src/pages/software/[gem].astro` | Dynamic routes over `src/data/software.ts`; content from root `software/content/{id}.md` |
| Blog | `src/pages/blog/` | Posts (`BlogPost.astro` layout renders `BlogByline` from frontmatter) + index island |
| API | `src/pages/api/index.mdx` | API docs with `<ApiDemo client:visible />` island |
| About / Get Started | `src/pages/about.md`, `src/pages/get-started.md` | `Docs.astro` layout without sidebar |

## Key configuration

- `astro.config.mjs` — Astro config: `@astrojs/vue`, `@astrojs/mdx`, `@astrojs/sitemap`, Tailwind via `@tailwindcss/vite`
- `src/styles/global.css` — Tailwind entry + typography plugin + custom-block/diagram styles
- `src/styles/theme.css` — Relaton design system (brand tokens `#1F6CF1` / `#21C197` / `#1C2126`, `--vp-c-*` variables, light/dark)
- `src/layouts/Base.astro` — Site shell: nav, dark-mode toggle, footer, fonts
- `src/layouts/Docs.astro` — Docs shell: section sidebars (`/model/`, `/specs/`) + right-hand outline from Astro headings
- `src/data/*.ts` — TypeScript data (types, flavors 28 entries, software 35 entries, home, api, categories, flavor extensions, posts)
- Root `flavors/content/` and `software/content/` — canonical citation-guide markdown, read at build time

## Vue components

All in `src/components/` (rendered as Astro islands; no VitePress `useData` — data arrives via props or `src/data` imports):
- `HomePage.vue` — Landing hero, stats, layers, org marquee, ecosystem, blog preview
- `FlavorGrid.vue` / `SoftwareGrid.vue` — Searchable/filterable grids
- `FlavorPage.vue` / `SoftwarePage.vue` — Detail pages; receive server-rendered markdown HTML via `content` prop
- `BlogIndex.vue` / `BlogByline.vue` — Blog listing and author/date byline
- `ApiDemo.vue` — Interactive Relaton API demo (hits api.relaton.org)
- `SiteFooter.vue` — Static footer (server-rendered, no hydration)
- `GridControls.vue`, `CodeFormatTabs.vue`, `FlavorExtensions.vue` — Shared grid/tabs internals

## CI/CD

Two GitHub Actions workflows:
- **build_deploy.yml** — `npm ci && npm run build`, uploads `dist/`, deploys to GitHub Pages on push to `main`
- **links.yml** — builds, serves `astro preview`, runs lychee link checker on `dist/**/*.html`

## Adding a new Relaton flavor

1. Add an entry to `src/data/flavors.ts` (with `id`, `label`, `fullName`, `category`, `gem`, `sources`, `repoUrl`)
2. Add a corresponding entry to `src/data/software.ts` (with `id`, `name`, `displayName`, `repoUrl`, `description`, `category`, `flavorId`)
3. Create a citation guide in root `flavors/content/<id>.md` (if `citationGuide: true`)
4. Sidebar links live in `src/layouts/Docs.astro` (`SIDEBARS`) if needed
