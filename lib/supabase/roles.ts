import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { ROLE_NAMES, ADMIN_ALLOWED_ROLES } from "@/lib/role-constants";

const ROLE_CACHE_TTL_MS = 60 * 60 * 1000;

type RoleCacheEntry = {
  roleNames: string[];
  expiresAt: number;
};

const roleCache = new Map<string, RoleCacheEntry>();

type UserRoleRow = {
  roles?: { name?: string | null } | Array<{ name?: string | null }> | null;
};

function normalizeRoleNames(rows: UserRoleRow[] | null): string[] {
  if (!rows) {
    return [];
  }

  const roleNames = new Set<string>();

  for (const row of rows) {
    const relation = row.roles;

    if (Array.isArray(relation)) {
      for (const role of relation) {
        if (role?.name) {
          roleNames.add(role.name);
        }
      }
      continue;
    }

    if (relation?.name) {
      roleNames.add(relation.name);
    }
  }

  return Array.from(roleNames);
}

export async function getUserRoleNames(supabase: SupabaseClient, userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("user_roles")
    .select("roles(name)")
    .eq("user_id", userId);

  if (error) {
    return [];
  }

  return normalizeRoleNames((data ?? null) as UserRoleRow[] | null);
}

export async function getUserRoleNamesCached(userId: string): Promise<string[]> {
  const now = Date.now();
  const cached = roleCache.get(userId);

  if (cached && cached.expiresAt > now) {
    return cached.roleNames;
  }

  const supabase = await createClient();
  const roleNames = await getUserRoleNames(supabase, userId);

  roleCache.set(userId, {
    roleNames,
    expiresAt: now + ROLE_CACHE_TTL_MS,
  });

  return roleNames;
}

export function canAccessAdmin(roleNames: string[]): boolean {
  return roleNames.some((roleName) => ADMIN_ALLOWED_ROLES.has(roleName));
}
