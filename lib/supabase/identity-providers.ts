import type { User } from "@supabase/supabase-js"

type IdentityProviderSummary = {
  linkedProviders: string[]
  primaryProvider: string | null
  identitiesCount: number
}

const SUPPORTED_PROVIDERS = new Set(["email", "google"])

function normalizeProvider(value: unknown): "email" | "google" | null {
  if (typeof value !== "string") {
    return null
  }

  if (value === "email" || value === "google") {
    return value
  }

  return null
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
  const appMetadata = (user.app_metadata ?? {}) as Record<string, unknown>
  const metadataProvidersRaw = Array.isArray(appMetadata.providers) ? appMetadata.providers : []

  const metadataProviders = Array.from(
    new Set(
      metadataProvidersRaw
        .map((provider) => normalizeProvider(provider))
        .filter((provider): provider is "email" | "google" => provider !== null)
    )
  )

  const identityProviders = Array.from(
    new Set(
      identities
        .map((identity) => normalizeProvider(identity.provider))
        .filter((provider): provider is "email" | "google" => provider !== null)
    )
  )

  const providers = Array.from(new Set([...metadataProviders, ...identityProviders])).filter((provider) =>
    SUPPORTED_PROVIDERS.has(provider)
  )

  let primaryProvider: string | null = null

  if (preferredIdentityId) {
    const primaryIdentity = identities.find((identity) => normalizeIdentityId(identity) === preferredIdentityId)
    const normalizedPrimaryProvider = normalizeProvider(primaryIdentity?.provider)
    primaryProvider = normalizedPrimaryProvider && providers.includes(normalizedPrimaryProvider) ? normalizedPrimaryProvider : null
  }

  if (!primaryProvider) {
    const metadataProvider = normalizeProvider(appMetadata.provider)
    if (metadataProvider && providers.includes(metadataProvider)) {
      primaryProvider = metadataProvider
    }
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
