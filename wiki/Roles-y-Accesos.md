# Roles y Accesos (Supabase)

## Objetivo

Este documento describe el modelo de autorización del proyecto, las tablas involucradas, sus relaciones y cómo se usan actualmente para controlar acceso a rutas del panel administrativo.

## Tablas principales

### `public.users`

Representa el perfil de usuario de la aplicación (vinculado al usuario autenticado de Supabase Auth en primer login).

Campos relevantes:

- `id uuid` (PK): identificador del usuario (debe coincidir con `auth.users.id`)
- `email varchar(255)` único
- `name varchar(255)`
- `avatar_url text`
- `created_at timestamp`
- `updated_at timestamp`

Significado:

- Es la identidad de aplicación sobre la cual se aplican relaciones de permisos y ownership de recursos.

### `public.roles`

Catálogo de roles disponibles.

Campos relevantes:

- `id uuid` (PK)
- `name varchar(100)` único
- `description text`
- `created_at timestamp`
- `updated_at timestamp`

Roles definidos hoy:

- `user`
- `admin`
- `collaborator`

Significado:

- Define capacidades de alto nivel para autorización.

### `public.user_roles`

Tabla puente entre usuarios y roles (relación muchos a muchos).

Campos relevantes:

- `id uuid` (PK)
- `user_id uuid` (FK a `users.id`)
- `role_id uuid` (FK a `roles.id`)
- `created_at timestamp`
- Restricción única: (`user_id`, `role_id`)

Significado:

- Permite asignar uno o más roles a cada usuario.

## Relaciones

- `user_roles.user_id -> users.id` (many-to-one)
- `user_roles.role_id -> roles.id` (many-to-one)
- `users` ↔ `roles` es many-to-many vía `user_roles`

## Uso actual en el proyecto

- La sesión de autenticación se obtiene desde Supabase Auth.
- Para autorización de rutas `/admin/*`, se consultan roles vía relación `user_roles -> roles(name)`.
- Los valores válidos de rol se resuelven por constantes de nombre en código (`user`, `admin`, `collaborator`).
- El resultado por usuario se cachea por 1 hora para reducir lecturas repetidas a Supabase.
- Acceso permitido al panel:
  - `admin`
  - `collaborator`
- Acceso denegado:
  - `user` (u otros sin rol permitido), mostrando página `Unauthorized` y redirección al inicio.

Archivos clave:

- `lib/supabase/roles.ts`: obtención y normalización de roles + regla `canAccessAdmin`.
- `app/(dashboard)/layout.tsx`: guard de sesión + autorización por roles para todo `/admin/*`.
- `app/(site)/unauthorized/page.tsx`: página de denegación y redirect automático.

Constantes actuales de referencia (`lib/supabase/roles.ts`):

- `ROLE_NAMES.user = "user"`
- `ROLE_NAMES.admin = "admin"`
- `ROLE_NAMES.collaborator = "collaborator"`

## Reglas de acceso esperadas

1. Usuario no autenticado:
   - Redirección a `/iniciar-sesion?metodo=google` al intentar entrar en `/admin/*`.
2. Usuario autenticado con rol `admin` o `collaborator`:
   - Acceso permitido a `/admin/*`.
3. Usuario autenticado con rol `user`:
   - Redirección a `/unauthorized` y luego al índice (`/`) en 5 segundos.

## Notas de operación

- Si un usuario autenticado no tiene filas en `user_roles`, se considera sin permisos de admin.
- La asignación de roles debe mantenerse consistente con `users.id`.
- Se recomienda reforzar este modelo con políticas RLS equivalentes en tablas sensibles de datos.
