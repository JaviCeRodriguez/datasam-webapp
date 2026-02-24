"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionResult = {
  ok: boolean;
  message: string;
};

type UpdateProfileInput = {
  name: string;
  surname: string;
  avatarUrl?: string | null;
};

const MAX_NAME_LENGTH = 80;

function normalizeName(value: string): string {
  return value.trim().slice(0, MAX_NAME_LENGTH);
}

async function getAuthenticatedContext() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}

async function ensureCurrentUserRow() {
  const { supabase, user } = await getAuthenticatedContext();

  if (!user || !user.email) {
    return { supabase, user: null as null };
  }

  await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  return { supabase, user };
}

export async function updateProfileAction(input: UpdateProfileInput): Promise<ActionResult> {
  const name = normalizeName(input.name);
  const surname = normalizeName(input.surname);
  const avatarUrl = input.avatarUrl?.trim() || null;

  const { supabase, user } = await ensureCurrentUserRow();

  if (!user) {
    return {
      ok: false,
      message: "No hay sesión activa.",
    };
  }

  const { error } = await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      name,
      surname,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    return {
      ok: false,
      message: "No se pudo guardar tu perfil.",
    };
  }

  revalidatePath("/perfil");

  return {
    ok: true,
    message: "Perfil actualizado correctamente.",
  };
}

export async function setPrimaryIdentityAction(identityId: string | null): Promise<ActionResult> {
  const requestedIdentityId = identityId?.trim() || null;
  const { supabase, user } = await ensureCurrentUserRow();

  if (!user) {
    return {
      ok: false,
      message: "No hay sesión activa.",
    };
  }

  if (requestedIdentityId) {
    const hasIdentity = (user.identities ?? []).some((identity) => {
      const identityId =
        typeof identity.identity_id === "string"
          ? identity.identity_id
          : typeof identity.id === "string"
            ? identity.id
            : null;

      return identityId === requestedIdentityId;
    });

    if (!hasIdentity) {
      return {
        ok: false,
        message: "La cuenta seleccionada no pertenece al usuario actual.",
      };
    }
  }

  const { error } = await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      primary_identity_id: requestedIdentityId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    return {
      ok: false,
      message: "No se pudo actualizar la cuenta principal.",
    };
  }

  revalidatePath("/perfil");

  return {
    ok: true,
    message: "Cuenta principal actualizada.",
  };
}
