"use client"

import { Suspense, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { HeroSection } from "./_components/HeroSection"
import { AboutSection } from "./_components/AboutSection"
import { TeamSection } from "./_components/TeamSection"
import { ResourcesSection } from "./_components/ResourcesSection"
import { CTASection } from "./_components/CTASection"

function DataSamHomepageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const errorCodeFromQuery = searchParams.get("error_code")
    const errorDescriptionFromQuery = searchParams.get("error_description")

    const hashParams = new URLSearchParams(globalThis.location.hash.replace("#", ""))
    const errorCodeFromHash = hashParams.get("error_code")
    const errorDescriptionFromHash = hashParams.get("error_description")

    const errorCode = errorCodeFromQuery ?? errorCodeFromHash
    const errorDescription = errorDescriptionFromQuery ?? errorDescriptionFromHash

    if (!errorCode) {
      return
    }

    if (errorCode === "otp_expired") {
      toast.info("El enlace de verificación expiró o ya fue usado. Solicita uno nuevo desde registro.")
    } else {
      const fallbackMessage = "No se pudo completar la verificación de la cuenta."
      toast.error(errorDescription ? decodeURIComponent(errorDescription.replaceAll("+", " ")) : fallbackMessage)
    }

    globalThis.history.replaceState({}, "", pathname)
    router.replace(pathname)
  }, [pathname, router, searchParams])

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <ResourcesSection />
      <CTASection />
    </div>
  )
}

export default function DataSamHomepage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="max-w-md w-full rounded-lg border bg-card p-6 text-center shadow-sm space-y-2">
            <h2 className="text-xl font-semibold">Contenido temporalmente no disponible</h2>
            <p className="text-sm text-muted-foreground">
              Estamos preparando esta vista. Intentá nuevamente en unos segundos.
            </p>
          </div>
        </div>
      }
    >
      <DataSamHomepageContent />
    </Suspense>
  )
}
