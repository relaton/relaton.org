# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Relaton.org is the documentation website for the [Relaton](https://github.com/metanorma/relaton) project — a unified bibliographic data model and tooling for citing technical standards (ISO, IEC, ITU, NIST, IEEE, etc.). The site is built with **VitePress + Vue 3 + TypeScript** and deployed to GitHub Pages.

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

Content is written in **Markdown** (`.md`), organized by section directories:

| Section | Directory | Purpose |
|---|---|---|
| Home | `index.md` | Landing page with `<HomePage />` component |
| Model | `model/` | Information model docs (16 pages: overview, 14 entities, diagrams) |
| Flavors | `flavors/` | Citation guides per SDO — dynamic routes via `[flavor].paths.ts` |
| Specs | `specs/` | Specification documents (relaton-yaml, relaton-render, cli, ruby, asciibib) |
| Software | `software/` | Gem pages — dynamic routes via `[gem].paths.ts` |
| Blog | `blog/` | Blog posts with `<BlogByline />` component |
| API | `api/index.md` | Interactive API demo with `<ApiDemo />` |
| About | `about.md` | About page |

## Key configuration

- `.vitepress/config.ts` — VitePress config: nav, sidebars, head, themeConfig, sitemap
- `.vitepress/theme/index.ts` — Theme entry point, registers all Vue components
- `.vitepress/theme/custom.css` — Swiss Style design system (CSS custom properties)
- `.vitepress/data/types.ts` — TypeScript interfaces (Flavor, SoftwareGem, BlogPost)
- `.vitepress/data/flavors.ts` — 27 flavor entries with metadata
- `.vitepress/data/software.ts` — 32 gem entries with metadata
- `.vitepress/posts.data.ts` — Blog content loader using `createContentLoader`

## Vue components

All in `.vitepress/theme/components/`:
- `HomePage.vue` — Landing page with hero, stats, ISO 690 mapping, flavor grid, blog preview
- `FlavorGrid.vue` — Searchable/filterable grid of supported organizations (used on home and /flavors/)
- `FlavorPage.vue` — Dynamic flavor detail page with citation guide content
- `SoftwareGrid.vue` — Searchable/filterable grid of all gems
- `SoftwarePage.vue` — Dynamic gem detail page with installation and quick start
- `BlogIndex.vue` — Blog listing page
- `BlogByline.vue` — Author/date display on blog posts
- `ModelDiagram.vue` — UML diagram display component
- `ApiDemo.vue` — Interactive Relaton API demo

## Dynamic routes

- `flavors/[flavor].paths.ts` — Generates 27 flavor pages from `flavors.ts`, loads citation guide content from `flavors/content/{id}.md`
- `software/[gem].paths.ts` — Generates 32 gem pages from `software.ts`

## CI/CD

Two GitHub Actions workflows:
- **build_deploy.yml** — builds with VitePress (`npm run build`) and deploys to GitHub Pages on push to `main`
- **links.yml** — builds site then runs lychee link checker on `.vitepress/dist/**/*.html`

## Adding a new Relaton flavor

1. Add an entry to `.vitepress/data/flavors.ts` (with `id`, `label`, `fullName`, `category`, `gem`, `sources`, `repoUrl`)
2. Add a corresponding entry to `.vitepress/data/software.ts` (with `id`, `name`, `displayName`, `repoUrl`, `description`, `category`, `flavorId`)
3. Create a citation guide in `flavors/content/<id>.md` (if `citationGuide: true`)
4. Add any sidebar links in `.vitepress/config.ts` if needed
