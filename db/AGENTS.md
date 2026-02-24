# Database – Supabase SQL & policies

> **Nearest-wins**: This file applies to everything under `db/`. For app usage see [app/AGENTS.md](../app/AGENTS.md). Root: [AGENTS.md](../AGENTS.md).

---

## 1. Package identity

- **What**: Database SQL artifacts and migration history.
- **Tech**: Supabase Postgres (Auth + SQL migrations + RLS).

---

## 2. Current status

- Legacy Drizzle files were removed from runtime/tooling.
- Existing SQL files under `db/migrations/` may remain as historical reference while Supabase migration flow is finalized.

---

## 3. Conventions

- Keep SQL migration files deterministic and idempotent where practical.
- Prefer explicit constraints and RLS policies for access control.
- Never store secrets in SQL files or commit `.env*`.

---

## 4. Touch points

| Purpose | File(s) |
|--------|--------|
| Historical SQL snapshots | `db/migrations/*.sql`, `db/migrations/meta/` |
| App auth clients | `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/middleware.ts` |

---

## 5. Pre-PR checks

From repo root:

```bash
pnpm lint && pnpm build
```
