# App – Routes, Layouts, Pages

> **Nearest-wins**: This file applies to everything under `app/`. For DB see [db/AGENTS.md](../db/AGENTS.md), for UI primitives see [components/AGENTS.md](../components/AGENTS.md).

---

## 1. Package identity

- **What**: Next.js App Router app — public site `(site)` and dashboard `(dashboard)` with layouts, pages, and app-level hooks/utils.
- **Tech**: Next.js 15, React 19, TypeScript. RSC by default; `"use client"` only where needed.

---

## 2. Setup & run

From repo root (no separate install for app):

```bash
pnpm dev          # Dev server
pnpm build        # Production build (includes typecheck)
pnpm start        # Run production build
pnpm lint         # ESLint
```

---

## 3. Patterns & conventions

### Route groups and layouts

- **`(site)`**: Public pages (home, links, materias, formularios, perfil, qr, auth pages). Layout: `app/(site)/layout.tsx` (Navigation + Footer + metadata).
- **`(dashboard)`**: Admin area with sidebar. Layout: `app/(dashboard)/layout.tsx` (SidebarProvider + AppSidebar).
- **Root**: `app/layout.tsx` — fonts and global metadata. Do not put route-specific UI here.

**Examples:**

- ✅ DO: Site layout with metadata and shared shell: `app/(site)/layout.tsx`
- ✅ DO: Dashboard shell with sidebar: `app/(dashboard)/layout.tsx`, `app/(dashboard)/_components/AppSidebar.tsx`
- ❌ DON'T: Put dashboard-only UI in root `app/layout.tsx`

### File organization

- **Pages**: `page.tsx` (and optional `loading.tsx`, `error.tsx`) in the route folder.
- **Route-local components**: Place in `_components/` or `_componentes/` next to the route (underscore = not a route segment).
- **App-level hooks/utils**: `app/hooks/`, `app/utils/` (e.g. `useSubjectProgress.ts`, `progressCalculations.ts`).

**Examples:**

- ✅ DO: Page that composes sections: `app/(site)/page.tsx` (imports from `./_components/HeroSection` etc.)
- ✅ DO: Admin page that composes list + header: `app/(dashboard)/admin/formularios/page.tsx` (imports from `./_componentes/FormsList`, `../_componentes/PageHeader`)
- ✅ DO: Colocated components for a feature: `app/(dashboard)/admin/formularios/[formId]/_componentes/FormBuilder.tsx`, `FormPreview.tsx`
- ❌ DON'T: Put route-specific components in root `components/` (reserve that for shared UI)

### Server vs client

- **Default**: Layouts and pages are Server Components unless they need hooks, event handlers, or browser APIs.
- **Client**: Add `"use client"` at the top. Use for: hooks, `useState`/`useEffect`, form handlers, theme/particles, anything using window/document.

**Examples:**

- ✅ DO: Client page that uses state/hooks: `app/(site)/page.tsx` (`"use client"` + section components)
- ✅ DO: Client component for interactive list: `app/(dashboard)/admin/formularios/_componentes/FormsList.tsx`
- ✅ DO: Server page that only composes client components: `app/(dashboard)/admin/formularios/page.tsx` (no directive)
- ❌ DON'T: Add `"use client"` to a file that only composes other components and doesn’t use hooks or client APIs

### Imports and aliases

- Use `@/` for app, components, lib, db: `@/components/ui/button`, `@/lib/utils`, `@/db`, `@/hooks/use-toast`.
- Prefer short relative imports within the same route: `./_componentes/FormsList`, `../_componentes/PageHeader`.

### Metadata

- Root metadata: `app/layout.tsx` (default title, description, OG, etc.).
- Segment metadata: export `metadata` or `generateMetadata` from `layout.tsx` or `page.tsx` (e.g. `app/(site)/layout.tsx`).

---

## 4. Touch points / key files

| Purpose | File(s) |
|--------|--------|
| Root layout, fonts | `app/layout.tsx` |
| Site shell, metadata, JSON-LD | `app/(site)/layout.tsx` |
| Dashboard shell, sidebar | `app/(dashboard)/layout.tsx`, `app/(dashboard)/_components/AppSidebar.tsx` |
| Auth (Supabase) | `lib/supabase/client.ts`, `lib/supabase/server.ts`, `app/auth/callback/route.ts` |
| Subject progress (client) | `app/hooks/useSubjectProgress.ts`, `app/utils/progressCalculations.ts` |
| Page examples (server) | `app/(dashboard)/admin/formularios/page.tsx`, `app/(dashboard)/admin/page.tsx` |
| Page examples (client) | `app/(site)/page.tsx`, `app/(site)/materias/page.tsx` |
| Dynamic route example | `app/(dashboard)/admin/formularios/[formId]/page.tsx`, `app/(site)/formularios/[formId]/page.tsx` |

---

## 5. JIT index hints

```bash
# All pages
find app -name "page.tsx"

# All layouts
find app -name "layout.tsx"

# Client boundaries
rg -l '"use client"' app/

# Exports from _components / _componentes
rg -n "export (function|const) \w+" app --glob "**/_component*"

# Metadata
rg -n "metadata|generateMetadata" app/

# Auth usage
rg -n "supabase|auth" app/ lib/supabase/
```

---

## 6. Common gotchas

- **Auth**: Supabase Auth is used through `lib/supabase/*`; protected routes use `middleware.ts` and server checks in layouts/pages.
- **Spanish folders**: Some routes use Spanish (`formularios`, `_componentes`, `cerrar-sesion`, `iniciar-sesion`). Keep that convention when adding under the same area.
- **Loading/errors**: Optional `loading.tsx` and `error.tsx` are supported (e.g. `app/(site)/iniciar-sesion/loading.tsx`, `app/(dashboard)/admin/formularios/[formId]/respuestas/loading.tsx`). Add where you need streaming or error boundaries.

---

## 7. Pre-PR checks

From repo root:

```bash
pnpm lint && pnpm build
```
