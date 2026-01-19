"use client"

import { HeroSection } from "./_components/HeroSection"
import { AboutSection } from "./_components/AboutSection"
import { TeamSection } from "./_components/TeamSection"
import { ResourcesSection } from "./_components/ResourcesSection"
import { CTASection } from "./_components/CTASection"

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
