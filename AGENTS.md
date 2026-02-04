# DataSam WebApp – Agent Guide (Root)

> **Nearest-wins**: Read the closest `AGENTS.md` to the file you're editing. Sub-folders have more detail.

---

## 1. Project Snapshot

- **Repo type**: Simple single project (Next.js app). `pnpm-workspace.yaml` exists for future `packages/*` but no packages yet.
- **Stack**: Next.js 15, React 19, TypeScript (strict), Drizzle ORM + Postgres, Tailwind CSS 4, shadcn/ui (new-york), Zustand, react-hook-form + Zod.
- **Sub-guides**: `app/AGENTS.md`, `db/AGENTS.md`, `components/AGENTS.md` — open these for package-specific patterns.

---

## 2. Root Setup Commands

```bash
pnpm install
pnpm build
pnpm lint
```

No dedicated test script; typecheck is via `next build` (TypeScript). Database: `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:seed`, `pnpm db:assign-role`.

---

## 3. Universal Conventions

- **Code style**: TypeScript strict (`tsconfig.json`), Prettier (`.prettierrc.js`: semicolons off, trailing comma es5, printWidth 120), ESLint (Next + Prettier). Use `pnpm lint` before PR.
- **Imports**: Use `@/` alias for project root (e.g. `@/components/ui/button`, `@/lib/utils`, `@/db`).
- **Commits / PRs**: Prefer clear, conventional-style messages. PRs should pass `pnpm lint` and `pnpm build`; see wiki for full flow.

---

## 4. Security & Secrets

- **Never commit** `.env*` (in `.gitignore`). Use `.env.local` for `DATABASE_URL`, `NEXT_PUBLIC_*` for client-safe values.
- **PII**: Handle user data only where needed; DB schema lives in `db/schema.ts`.

---

## 5. JIT Index – Directory Map

### Where to open (not paste)

| Area | Path | Guide |
|------|------|--------|
| App (routes, layouts, pages) | `app/` | [app/AGENTS.md](app/AGENTS.md) |
| Database (schema, migrations, seed) | `db/` | [db/AGENTS.md](db/AGENTS.md) |
| UI primitives & theme | `components/` | [components/AGENTS.md](components/AGENTS.md) |
| Shared logic, stores, data | `lib/` | — (no AGENTS.md; see app/db for usage) |
| Root-level hooks | `hooks/` | — |

### Quick find commands

```bash
# Find a component by name
rg -n "export (function|const) \w+" app/ components/

# Find "use client" boundaries
rg -l '"use client"' app/

# Find route segments (pages)
find app -name "page.tsx" -o -name "layout.tsx"

# Find DB usage
rg -n "from ['\"]@/db|from ['\"].*db" app/ lib/ db/

# Find UI component usage
rg -n "from ['\"]@/components/ui" app/ components/
```

---

## 6. Definition of Done

- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes
- [ ] No new `.env*` or secrets committed
- [ ] Changes follow patterns in the nearest `AGENTS.md` (app, db, or components)
