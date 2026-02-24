# AGENTS.md Hierarchy – Analysis Summary (Phase 1)

## 1. Repository type

**Simple single project.** One Next.js app at repo root. `pnpm-workspace.yaml` declares `packages/*` but no `packages/` directory exists yet — single-app layout.

---

## 2. Primary technology stack

| Layer | Tech |
|-------|------|
| Runtime | Node.js (ES6 target) |
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript (strict) |
| Styling | Tailwind CSS 4, PostCSS, shadcn/ui (new-york, CSS variables) |
| Data | Drizzle ORM, Postgres (postgres.js driver) |
| Forms | react-hook-form, @hookform/resolvers, Zod |
| State | Zustand |
| Tooling | pnpm, ESLint (Next + Prettier), Prettier (Tailwind plugin), tsx for scripts |

---

## 3. Major directories (AGENTS.md placement)

| Directory | Purpose | AGENTS.md |
|-----------|---------|-----------|
| `app/` | Routes, layouts, pages, app-level hooks/utils | `app/AGENTS.md` |
| `db/` | Schema, migrations, seed, DB client | `db/AGENTS.md` |
| `components/` | Theme provider + shadcn/ui primitives | `components/AGENTS.md` |
| `lib/` | Shared utils, stores, static data (form-data, study-plan, etc.) | No AGENTS.md (referenced from app/db) |
| `hooks/` | Root-level hooks (use-mobile, use-toast) | No AGENTS.md |
| `public/` | Static assets | — |

No separate apps, services, or workers; one app with (site) and (dashboard) route groups.

---

## 4. Build system

- **Package manager**: pnpm.
- **Workspaces**: `pnpm-workspace.yaml` with `packages/*` (empty for now).
- **Build**: Single `next build` at root. No Turborepo/Lerna.

---

## 5. Testing setup

- **No tests found**: No Jest, Vitest, Playwright, or `*.test.*` files in the repo.
- **Pre-PR**: Relies on `pnpm lint` and `pnpm build` (TypeScript checked via build).

---

## 6. Key patterns to document

### Code organization

- **App Router**: Route groups `(site)` (public) and `(dashboard)` (admin/sidebar). Layouts per group; root layout in `app/layout.tsx` with fonts and global metadata.
- **Colocated components**: Route-specific components in `_components/` or `_componentes/` next to the route (e.g. `app/(site)/_components/`, `app/(dashboard)/admin/formularios/_componentes/`).
- **Shared UI**: `components/ui/` (shadcn); `components/theme-provider.tsx`. Use `@/components/*` and `@/lib/utils` (`cn()`).
- **Data layer**: Supabase SDK clients in `lib/supabase/`; `db/` currently retains SQL migration history; `lib/` for stores and static data.

### Conventions

- **Naming**: Spanish for some UI copy and folder names (`formularios`, `_componentes`, `cerrar-sesion`, `iniciar-sesion`). Code identifiers in English.
- **RSC vs client**: Layouts and static pages are Server Components by default; add `"use client"` only where needed (hooks, interactivity, browser APIs). Homepage composes client sections.
- **Path alias**: `@/*` → project root (see `tsconfig.json` and `components.json` aliases).

### Critical files (examples)

- **Root layout + metadata**: `app/layout.tsx`
- **Site layout + metadata**: `app/(site)/layout.tsx`
- **Dashboard shell**: `app/(dashboard)/layout.tsx`, `app/(dashboard)/_components/AppSidebar.tsx`
- **Page pattern (server)**: `app/(dashboard)/admin/formularios/page.tsx`
- **Page pattern (client)**: `app/(site)/page.tsx`, `app/(site)/materias/page.tsx`
- **Auth**: Supabase Auth via `lib/supabase/*` + OAuth callback route `app/auth/callback/route.ts`
- **DB access**: Supabase SDK clients (`lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/middleware.ts`)
- **UI utility**: `lib/utils.ts` (`cn()`); design system config `components.json`

### Anti-patterns to avoid

- Don’t add `"use client"` at the top of a file that doesn’t use hooks or client-only APIs (keep RSC where possible).
- Don’t bypass `@/` for project-root imports (no deep relative paths from app to lib/db when `@/` works).
- Don’t commit `.env*`; use `.env.local` and document required vars in wiki/README.

---

## 7. Sub-folder AGENTS.md roles

- **app/AGENTS.md**: Route groups, layouts, page vs client boundaries, `_components`/`_componentes`, hooks under app, metadata, JIT commands for app.
- **db/AGENTS.md**: Drizzle schema, migrations, seed, assign-role, connection usage, JIT commands for db.
- **components/AGENTS.md**: shadcn/ui usage, theme, `cn()`, where to add new components, design tokens (globals.css / CSS variables).
