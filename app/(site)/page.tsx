"use client"

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { HeroSection } from "./_components/HeroSection"
import { AboutSection } from "./_components/AboutSection"
import { TeamSection } from "./_components/TeamSection"
import { ResourcesSection } from "./_components/ResourcesSection"
import { CTASection } from "./_components/CTASection"

export default function DataSamHomepage() {
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
