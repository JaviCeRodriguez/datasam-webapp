import type { User } from "@supabase/supabase-js";

function pickString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function getUserAvatarUrl(user: User | null | undefined): string | null {
  if (!user) {
    return null;
  }

  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;

  const fromMetadata =
    pickString(metadata.avatar_url) ??
    pickString(metadata.picture);

  if (fromMetadata) {
    return fromMetadata;
  }

  for (const identity of user.identities ?? []) {
    const identityData = (identity.identity_data ?? {}) as Record<string, unknown>;
    const fromIdentity =
      pickString(identityData.avatar_url) ??
      pickString(identityData.picture);

    if (fromIdentity) {
      return fromIdentity;
    }
  }

  return null;
}
