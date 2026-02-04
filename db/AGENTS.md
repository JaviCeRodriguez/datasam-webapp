# Database – Drizzle schema, migrations, seed

> **Nearest-wins**: This file applies to everything under `db/`. For app usage see [app/AGENTS.md](../app/AGENTS.md). Root: [AGENTS.md](../AGENTS.md).

---

## 1. Package identity

- **What**: Data layer — Drizzle ORM schema (Postgres), migrations, seed, and role-assignment script. Single DB client used by the app.
- **Tech**: Drizzle ORM, postgres.js driver, dotenv for `DATABASE_URL`. Config: `drizzle.config.ts` at repo root.

---

## 2. Setup & run

From repo root. Requires `.env.local` with `DATABASE_URL`.

```bash
pnpm db:generate   # Generate migrations from schema changes (drizzle-kit generate)
pnpm db:migrate    # Apply migrations (drizzle-kit migrate)
pnpm db:seed       # Seed roles (tsx db/seed.ts)
pnpm db:assign-role  # Assign role to user (tsx db/assign-role.ts)
```

---

## 3. Patterns & conventions

### Schema and relations

- **Schema**: Single file `db/schema.ts`. Tables: `users`, `roles`, `userRoles`, `forms`, `formResponses`. Relations exported for Drizzle queries.
- **Naming**: Table names snake_case in DB; Drizzle camelCase in TS. Use `db/schema.ts` as source of truth.

**Examples:**

- ✅ DO: Define tables and relations in `db/schema.ts` (see `users`, `forms`, `formsRelations`)
- ✅ DO: Import from schema: `import { users, forms } from '@/db/schema'` or `from '../schema'` inside db
- ❌ DON'T: Create a second schema file or duplicate table definitions

### Connection and usage

- **Client**: Singleton from `db/index.ts` — `import { db } from '@/db'` or `from './index'`. Uses `dotenv` with `.env.local`; no connection in browser (server/scripts only).

**Examples:**

- ✅ DO: Use in Server Components, Route Handlers, or server scripts: `import { db } from '@/db'`
- ❌ DON'T: Import `db` or run queries in `"use client"` components (use server actions or API routes that call db)

### Migrations

- **Generated**: `db/migrations/` (e.g. `0000_absurd_starhawk.sql`). Meta in `db/migrations/meta/`.
- **Flow**: Edit `db/schema.ts` → `pnpm db:generate` → review SQL → `pnpm db:migrate`. Do not edit migration SQL by hand unless you know the implications.

### Seed and scripts

- **Seed**: `db/seed.ts` — seeds roles; idempotent (skips existing). Run after migrations.
- **Assign role**: `db/assign-role.ts` — CLI helper to assign roles to users. Run with tsx.

---

## 4. Touch points / key files

| Purpose | File(s) |
|--------|--------|
| Schema (tables + relations) | `db/schema.ts` |
| DB client (singleton) | `db/index.ts` |
| Drizzle config | `drizzle.config.ts` (root) |
| Migrations | `db/migrations/*.sql`, `db/migrations/meta/` |
| Seed | `db/seed.ts` |
| Role assignment | `db/assign-role.ts` |

---

## 5. JIT index hints

```bash
# Tables and relations
rg -n "pgTable|relations\(" db/schema.ts

# Where db is imported
rg -n "from ['\"]@/db|from ['\"].*db" app/ lib/ db/

# Migration files
ls db/migrations/*.sql
```

---

## 6. Common gotchas

- **Env**: `DATABASE_URL` must be in `.env.local`; `db/index.ts` and `drizzle.config.ts` load it via dotenv. Never commit `.env*`.
- **Server-only**: Use `db` only in server context (RSC, Route Handlers, scripts). For client-driven flows, expose data via Server Actions or API routes that call `db`.
- **Supabase**: Schema comments that `users.id` references `auth.users.id`; actual auth is handled in the app (e.g. `app/hooks/useAuth.tsx`), not in this db package.

---

## 7. Pre-PR checks

From repo root (ensures schema and migrations are valid; run against a local DB if you have one):

```bash
pnpm db:generate
# Optionally: pnpm db:migrate && pnpm db:seed
pnpm build
```
