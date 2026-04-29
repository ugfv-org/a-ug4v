# Repository Guidelines

## Project Structure & Module Organization

This is a static Astro site with MDX pages. Source files live in `src/`: route pages are in `src/pages/*.mdx`, reusable UI is in `src/components/*.astro`, shared page chrome is in `src/layouts/`, and global styling is in `src/styles/global.css`. Static brand assets belong in `public/assets/brand/` and are served from `/assets/brand/...`. Root-level SVG files appear to be source brand assets; keep public-facing copies under `public/`. `dist/` is generated build output and should not be edited by hand.

## Build, Test, and Development Commands

Use pnpm, matching `packageManager: pnpm@10.28.0`.

- `pnpm install` installs dependencies from `pnpm-lock.yaml`.
- `pnpm dev` starts the Astro development server.
- `pnpm build` creates the static production build in `dist/`.
- `pnpm preview` serves the built site locally for final checks.

Run commands from the repository root.

## Coding Style & Naming Conventions

Astro, TypeScript, and CSS use two-space indentation. Prefer single quotes in frontmatter scripts and imports, matching the existing `.astro` files. Name Astro components in PascalCase, such as `Navigation.astro` and `Hero.astro`. Name route files by URL slug in lowercase, for example `about.mdx` for `/about/`. Use the configured path aliases where they improve clarity: `@components/*`, `@layouts/*`, and `@styles/*`.

Keep CSS variables centralized in `src/styles/global.css`. Reuse existing design tokens for color, spacing, radii, and fonts before adding new ones.

## Testing Guidelines

No automated test framework is currently configured. Treat `pnpm build` as the required validation step for every change. For visual or content changes, also run `pnpm preview` and manually check the affected routes, including `/`, `/about/`, and `/rules/`. If tests are added later, place them near the relevant source or under a dedicated `tests/` directory and document the command here.

## Commit & Pull Request Guidelines

This checkout does not include Git history, so no repository-specific commit convention can be inferred. Use concise, imperative commit subjects, preferably with a conventional prefix when helpful, such as `feat: add rules page` or `fix: correct server policy copy`.

Pull requests should include a short summary, affected routes or components, validation performed (`pnpm build`, browser preview), and screenshots for visible UI changes. Link related issues when available.

## Security & Configuration Tips

The site is configured for static output in `astro.config.mjs` with `https://ug4v.com` as the canonical site. Do not commit secrets; this project should not need runtime secrets for static pages.
