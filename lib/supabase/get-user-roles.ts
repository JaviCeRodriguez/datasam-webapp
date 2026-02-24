"use server";

import { getUserRoleNamesCached } from "@/lib/supabase/roles";

export async function getUserRolesAction(userId: string): Promise<string[]> {
  return getUserRoleNamesCached(userId);
}
