import type { User } from "@supabase/supabase-js";

type UserProfileLike = {
  name?: string | null;
  surname?: string | null;
  avatar_url?: string | null;
  primary_identity_id?: string | null;
};

type AvatarOptions = {
  profile?: UserProfileLike | null;
};

function pickString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function getUserAvatarUrl(user: User | null | undefined): string | null {
  return getUserAvatarUrlWithOptions(user, {});
}

export function getUserAvatarUrlWithOptions(
  user: User | null | undefined,
  options: AvatarOptions
): string | null {
  if (!user) {
    return null;
  }

  const profile = options.profile ?? null;
  const fromProfile = pickString(profile?.avatar_url);

  if (fromProfile) {
    return fromProfile;
  }

  const primaryIdentityId = pickString(profile?.primary_identity_id);

  if (primaryIdentityId) {
    const primaryIdentity = (user.identities ?? []).find((identity) => {
      const identityId =
        typeof identity.identity_id === "string"
          ? identity.identity_id
          : typeof identity.id === "string"
            ? identity.id
            : null;

      return identityId === primaryIdentityId;
    });
    const identityData = (primaryIdentity?.identity_data ?? {}) as Record<string, unknown>;
    const fromPrimaryIdentity = pickString(identityData.avatar_url) ?? pickString(identityData.picture);

    if (fromPrimaryIdentity) {
      return fromPrimaryIdentity;
    }
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

export function getUserDisplayName(
  user: User | null | undefined,
  profile?: UserProfileLike | null
): string {
  const profileName = `${pickString(profile?.name) ?? ""} ${pickString(profile?.surname) ?? ""}`.trim();

  if (profileName) {
    return profileName;
  }

  const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;

  return pickString(metadata.full_name) ?? pickString(metadata.name) ?? user?.email ?? "Usuario";
}
