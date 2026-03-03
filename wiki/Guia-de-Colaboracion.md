# Guía de Colaboración - DataSam WebApp

Esta guía resume el flujo recomendado para colaborar en el proyecto: desde el fork hasta las buenas prácticas de trabajo con agentes de IA.

## 1) Fork y clonado del repositorio

1. Haz fork de `JaviCeRodriguez/datasam-webapp` en GitHub.
2. Clona tu fork:

```bash
git clone https://github.com/TU-USUARIO/datasam-webapp.git
cd datasam-webapp
```

3. Agrega el remoto del repositorio original (upstream):

```bash
git remote add upstream https://github.com/JaviCeRodriguez/datasam-webapp.git
git remote -v
```

4. Crea una rama de trabajo:

```bash
git checkout -b feat/mi-cambio
```

## 2) Instalación de dependencias

### Opción recomendada: `pnpm`

```bash
pnpm install
pnpm dev
```

### Opción alternativa: `npm`

```bash
npm install
npm run dev
```

> Recomendación del proyecto: usar `pnpm` para mantener consistencia con `pnpm-lock.yaml`.

## 3) Supabase: crear cuenta y proyecto

1. Crea cuenta en [Supabase](https://supabase.com/).
2. Crea un proyecto nuevo.
3. Copia estos valores desde **Project Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. En **Authentication → URL Configuration**, agrega al menos:
   - `http://localhost:3000/auth/callback`
5. (Opcional recomendado) Habilita proveedor Google en **Authentication → Providers** para login OAuth.

## 4) Variables de entorno en el repo

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Notas:
- No se debe commitear `.env*`.
- `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` son obligatorias para Auth y acceso de cliente/servidor Supabase.
- `NEXT_PUBLIC_SITE_URL` se usa para metadata y OG tags.

## 5) Migraciones SQL: orden de ejecución

En este repositorio las migraciones SQL están en `db/migrations/` y deben ejecutarse **de menor a mayor prefijo numérico**.

Orden actual:

1. `0000_absurd_starhawk.sql`
2. `0001_profile_identity_fields.sql`
3. `0002_avatar_storage_policies.sql`
4. `0003_user_subject_progress.sql`
5. `0004_admin_dashboard_subjects_events.sql`
6. `0005_forms_public_access_and_rls.sql`

Puedes aplicarlas desde el SQL Editor de Supabase (copiando cada archivo en ese orden) o con tu flujo SQL interno, respetando siempre la secuencia.

## 6) Flujo recomendado de contribución

1. Toma o crea un issue antes de empezar.
2. Sincroniza con upstream:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git checkout feat/mi-cambio
```

3. Implementa cambios pequeños y enfocados.
4. Verifica calidad:

```bash
pnpm lint
pnpm build
```

5. Sube tu rama y abre Pull Request hacia `main`.

## 7) Cursor, Codex e IDEs con Agentes

### Qué está configurado en este repo

- `AGENTS.md` (raíz): reglas generales del proyecto.
- `app/AGENTS.md`, `db/AGENTS.md`, `components/AGENTS.md`: reglas específicas por carpeta (nearest-wins).
- `.cursor/rules/sentry-nextjs-rules.md`: guía para instrumentación Sentry en Next.js.
- `.agents/skills/*`: skills reutilizables para buenas prácticas (Next.js, React, Supabase Postgres, diseño web, etc.).

Esto permite que asistentes como Cursor Agent, Codex y otros IDE agents entiendan convenciones, estructura y restricciones del repo antes de editar.

### Usos recomendados con agentes

- Pide primero análisis de contexto (`qué archivos tocar y por qué`) antes de pedir cambios grandes.
- Trabaja por tareas pequeñas: "ajusta X en esta ruta", "luego ejecuta lint/build", "resume diff".
- Exige validación: siempre pedir que corra `pnpm lint` y, si aplica, `pnpm build`.
- Solicita cambios mínimos y sin refactors innecesarios fuera de alcance.

## 8) Buenas prácticas de prompting

Plantilla sugerida:

```text
Contexto: Estoy en <ruta/feature>.
Objetivo: Necesito <resultado concreto>.
Restricciones: No tocar <áreas>, mantener estilo actual, cambios mínimos.
Validación: Ejecutar pnpm lint (y build si afecta tipos/rutas).
Entrega: Lista de archivos cambiados + resumen corto.
```

Consejos rápidos:
- Define alcance y criterios de aceptación.
- Indica explícitamente qué no debe cambiarse.
- Pide enlaces a archivos modificados para revisión rápida.

## 9) Checklist antes de abrir PR

- [ ] Cambios alineados al issue
- [ ] `pnpm lint` sin errores nuevos por tu cambio
- [ ] `pnpm build` sin errores nuevos por tu cambio
- [ ] Sin secretos ni `.env*` versionados
- [ ] Descripción clara en el PR (qué, por qué, cómo validar)

---

Si quieres, puedes complementar esta guía con la [Guía de Desarrollo Local](./Guia-de-Desarrollo-Local.md).