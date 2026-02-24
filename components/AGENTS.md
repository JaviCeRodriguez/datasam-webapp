# Components – UI primitives and theme

> **Nearest-wins**: This file applies to `components/`. For app routes/pages see [app/AGENTS.md](../app/AGENTS.md). Root: [AGENTS.md](../AGENTS.md).

---

## 1. Package identity

- **What**: Shared UI layer — theme provider and shadcn/ui primitives (new-york style). Used by both `(site)` and `(dashboard)`.
- **Tech**: React, Radix UI primitives, Tailwind CSS, class-variance-authority, `cn()` from `@/lib/utils`. Config: `components.json` (aliases, style, Tailwind).

---

## 2. Setup & run

No separate install or dev server. Add components via shadcn CLI from repo root:

```bash
pnpm dlx shadcn@latest add <component-name>
```

Lint/build from root: `pnpm lint`, `pnpm build`.

---

## 3. Patterns & conventions

### Where components live

- **Theme**: `components/theme-provider.tsx` (wraps next-themes). Use in layout if needed (root layout defines global metadata/fonts; theme can sit there or in a child layout).
- **Primitives**: `components/ui/*` — one file per component (e.g. `button.tsx`, `card.tsx`, `form.tsx`). These are the building blocks; don’t put route-specific composition here.

**Examples:**

- ✅ DO: Use UI primitives from `@/components/ui/*`: `import { Button } from "@/components/ui/button"`
- ✅ DO: Use `cn()` for class merging: `import { cn } from "@/lib/utils"` (see `components/ui/button.tsx`)
- ✅ DO: Add new primitives via shadcn CLI so they match existing style and aliases
- ❌ DON'T: Put page-specific sections (e.g. HeroSection, FormsList) in `components/` — keep those in `app/.../_components/` or `_componentes/`

### Naming and style

- **Components**: PascalCase. Files match component name: `button.tsx` → `Button`, `dropdown-menu.tsx` → `DropdownMenu`.
- **Aliases** (from `components.json`): `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`. Use these in imports.

### Design tokens and theming

- **Tailwind**: Config and CSS variables live in `app/globals.css` (and Tailwind config). Use semantic tokens (e.g. `background`, `primary`, `muted-foreground`) instead of hardcoding hex/rgb in components when possible.
- **Base color**: new-york, neutral base, CSS variables (see `components.json`).

**Examples:**

- ✅ DO: Use Tailwind/semantic classes: `className="bg-background text-foreground"`
- ✅ DO: Compose with `cn()`: `className={cn("base-styles", variantStyles, className)}`
- ❌ DON'T: Hardcode colors in UI primitives when a design token exists

### Forms

- **Form primitives**: `components/ui/form.tsx` (react-hook-form + Zod-friendly). Use for consistent form layout and validation wiring.
- **Form data/types**: App and form-specific data live in `lib/` (e.g. `lib/form-data.ts`, `lib/form-types.ts`); reference from app, not from components/ui.

---

## 4. Touch points / key files

| Purpose | File(s) |
|--------|--------|
| shadcn/config, aliases, style | `components.json` |
| Theme (dark/light) | `components/theme-provider.tsx` |
| Class merge utility | `lib/utils.ts` (`cn`) |
| Button (variant pattern) | `components/ui/button.tsx` |
| Card | `components/ui/card.tsx` |
| Form (react-hook-form) | `components/ui/form.tsx` |
| Global styles / tokens | `app/globals.css` |

---

## 5. JIT index hints

```bash
# UI component exports
rg -n "export (function|const) \w+" components/ui/

# Usage of a specific primitive
rg -n "from ['\"]@/components/ui/" app/ components/

# cn() usage
rg -n "cn\(" app/ components/
```

---

## 6. Common gotchas

- **Aliases**: Use `@/components` and `@/lib/utils`; avoid deep relative imports from app into components (e.g. prefer `@/lib/utils` over `../../lib/utils` from a component).
- **RSC**: Most UI primitives are client-safe (Radix). If a primitive uses hooks or DOM, it’s already a client component; don’t add `"use client"` in the app file that only imports and renders it unless that file also uses hooks.
- **New components**: Prefer `pnpm dlx shadcn@latest add <name>` so new files match existing conventions and Tailwind setup.

---

## 7. Pre-PR checks

From repo root:

```bash
pnpm lint && pnpm build
```
