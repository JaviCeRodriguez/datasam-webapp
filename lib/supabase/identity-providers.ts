import type { User } from "@supabase/supabase-js"

type IdentityProviderSummary = {
  linkedProviders: string[]
  primaryProvider: string | null
  identitiesCount: number
}

function normalizeIdentityId(identity: NonNullable<User["identities"]>[number]): string | null {
  if (typeof identity.identity_id === "string") {
    return identity.identity_id
  }

  if (typeof identity.id === "string") {
    return identity.id
  }

  return null
}

export function getIdentityProviderSummary(user: User, preferredIdentityId?: string | null): IdentityProviderSummary {
  const identities = user.identities ?? []
  const providers = Array.from(
    new Set(
      identities
        .map((identity) => identity.provider)
        .filter((provider): provider is string => typeof provider === "string" && provider.length > 0)
    )
  )

  let primaryProvider: string | null = null

  if (preferredIdentityId) {
    const primaryIdentity = identities.find((identity) => normalizeIdentityId(identity) === preferredIdentityId)
    primaryProvider = typeof primaryIdentity?.provider === "string" ? primaryIdentity.provider : null
  }

  if (!primaryProvider && providers.length > 0) {
    primaryProvider = providers[0]
  }

  return {
    linkedProviders: providers,
    primaryProvider,
    identitiesCount: identities.length,
  }
}
