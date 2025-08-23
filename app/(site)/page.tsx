"use client"

import { HeroSection } from "./_componentes/HeroSection"
import { AboutSection } from "./_componentes/AboutSection"
import { TeamSection } from "./_componentes/TeamSection"
import { ResourcesSection } from "./_componentes/ResourcesSection"
import { CTASection } from "./_componentes/CTASection"

export default function DataSamHomepage() {
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
