# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Pre-commit Checklist

Before every commit, run `pnpm check` and fix all errors:

```bash
pnpm check        # typecheck + lint + knip + format:check across all packages
pnpm --filter <pkg> format   # auto-fix formatting issues
```

All 13 tasks must pass before committing. Never commit with a failing `pnpm check`.

## Package Manager

Always use `pnpm`. Never use `npm` or `yarn`.

```bash
pnpm add <pkg>          # runtime dependency
pnpm add -D <pkg>       # dev dependency
pnpm install            # install / sync lockfile
```

## Front-end Commands (`front/`)

```bash
pnpm dev        # start dev server
pnpm build      # tsc type-check + vite production build
pnpm lint       # oxlint
pnpm knip       # find unused exports, dependencies, and files
pnpm preview    # preview production build
```

## Architecture

### Stack

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no `tailwind.config.js`; configure via CSS variables)
- **HeroUI v3** — component library built on Tailwind v4; CSS imported via `@heroui/react/styles`, components imported per-module (e.g. `@heroui/react/button`)
- **TanStack Router** — file-based routing; routes live in `src/routes/`, route tree auto-generated to `src/routeTree.gen.ts` by the Vite plugin on every build/dev start
- **TanStack Form** — form state management

### File & Folder Conventions

All file and folder names are **kebab-case**. Never PascalCase or camelCase for filenames (Linux CI is case-sensitive).

| Pattern | Symbol casing |
|---|---|
| Component files `button/button.tsx` | `Button` (PascalCase) |
| Hook files `use-auth.ts` | `useAuth` (camelCase) |
| Service files `users.ts` | `fetchUsers` (camelCase) |
| Util files `format.ts` | `formatDate` (camelCase) |

Every component lives in its own folder with an `index.ts` that exposes only the public API:

```
button/
├── button.tsx
├── button.stories.ts
└── index.ts
```

### Smart vs Dumb Components

**Dumb** (`src/components/`, `views/*/components/`, `*.ui.tsx`): purely presentational, only local UI state, no network/service calls, no app contexts.

**Smart** (`*.view.tsx`): data fetching, side effects, error/loading states. No HTML markup or `className` — delegate all presentation to a dumb component.

Each view folder contains exactly:
- `<view>.view.tsx` — smart: fetches data, handles states, passes props down
- `<view>.ui.tsx` — dumb: renders the full layout

### Code Scoping

A file belongs in root `src/` folders only if used by **two or more views**. View-specific logic lives inside that view's folder.

```
src/
├── components/     ← shared across views
├── hooks/          ← reusable React logic (no JSX returned)
├── services/       ← async I/O functions (always return Promise)
├── utils/          ← pure synchronous functions
└── views/
    └── homescreen/
        ├── homescreen.view.tsx
        ├── homescreen.ui.tsx
        ├── components/
        ├── hooks/
        ├── services/
        └── utils/
```

### Services vs Utils

- **Services** (`services/`): always `async`, side effects allowed, network/I/O
- **Utils** (`utils/`): always synchronous, pure, no side effects

## Code Style

- Arrow functions only; no `function` declarations
- Object parameter instead of multiple positional params
- `forEach` over `for` loops
- No `any`, no magic strings/numbers (extract named constants)
- Guard clauses over deep nesting
- Business logic in hooks/services, not components
- No broad exports from feature internals

## Vite / Build Rules

- Only `VITE_` prefixed env vars in client code
- Use `import.meta.env.MODE` / `.DEV` / `.PROD` for environment checks
- Prefer static asset imports over `public/` path strings
- Use dynamic imports for large routes/features

## HeroUI Usage

- Default to HeroUI components; avoid mixing other UI systems
- Import per-module: `import { Button } from '@heroui/react/button'`
- Override via `className` only when theme tokens and variants are insufficient
- Never remove accessibility defaults (labels, roles, focus indicators)

## Tailwind Usage

- Mobile-first responsive classes
- Group classes: layout → spacing → typography → visual → state
- Avoid arbitrary values; use design tokens
- Consistent dark mode strategy (`class` or `media`) — pick one and stick to it
