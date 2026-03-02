"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getIdentityProviderSummary } from "@/lib/supabase/identity-providers";

type ActionResult = {
  ok: boolean;
  message: string;
};

type UpdateProfileInput = {
  name: string;
  surname: string;
  avatarUrl?: string | null;
};

type UserProviderRow = {
  linked_providers: string[] | null;
  primary_identity_id: string | null;
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

  const { data: currentRow } = await supabase
    .from("users")
    .select("linked_providers, primary_identity_id")
    .eq("id", user.id)
    .maybeSingle<UserProviderRow>();

  const summary = getIdentityProviderSummary(user, currentRow?.primary_identity_id ?? null);

  await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      linked_providers: summary.linkedProviders,
      primary_provider: summary.primaryProvider,
      identities_count: summary.identitiesCount,
      identities_synced_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  return { supabase, user };
}

export async function syncIdentityProvidersAction(): Promise<ActionResult> {
  const { supabase, user } = await getAuthenticatedContext();

  if (!user || !user.email) {
    return {
      ok: false,
      message: "No hay sesión activa.",
    };
  }

  const { data: currentRow } = await supabase
    .from("users")
    .select("linked_providers, primary_identity_id")
    .eq("id", user.id)
    .maybeSingle<UserProviderRow>();

  const previousProviders = new Set(currentRow?.linked_providers ?? []);
  const summary = getIdentityProviderSummary(user, currentRow?.primary_identity_id ?? null);

  const { error } = await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      linked_providers: summary.linkedProviders,
      primary_provider: summary.primaryProvider,
      identities_count: summary.identitiesCount,
      identities_synced_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    return {
      ok: false,
      message: "No se pudo sincronizar las cuentas vinculadas.",
    };
  }

  const currentProviders = new Set(summary.linkedProviders);

  for (const provider of summary.linkedProviders) {
    if (previousProviders.has(provider)) {
      continue;
    }

    await supabase.rpc("append_event", {
      event_type: "account_linked",
      event_user_id: user.id,
      event_connector_text: "vinculó la cuenta",
      event_target: provider,
      event_target_type: "identity_provider",
      event_target_id: provider,
      event_metadata: { provider },
    });
  }

  for (const provider of previousProviders) {
    if (currentProviders.has(provider)) {
      continue;
    }

    await supabase.rpc("append_event", {
      event_type: "account_unlinked",
      event_user_id: user.id,
      event_connector_text: "desvinculó la cuenta",
      event_target: provider,
      event_target_type: "identity_provider",
      event_target_id: provider,
      event_metadata: { provider },
    });
  }

  revalidatePath("/perfil");

  return {
    ok: true,
    message: "Cuentas vinculadas sincronizadas.",
  };
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
