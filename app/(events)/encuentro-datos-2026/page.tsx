import type { Metadata } from "next"
import { CalendarClock } from "lucide-react"

import { Button } from "@/components/ui/button"

import { About } from "./_components/About"
import { EventFooter } from "./_components/EventFooter"
import { EventNavigation } from "./_components/EventNavigation"
import { Hero } from "./_components/Hero"
import { Organizers } from "./_components/Organizers"
import { Schedule } from "./_components/Schedule"
import { UniversitiesMap } from "./_components/UniversitiesMap"
import { academicProposals } from "./_components/academic-proposals"
import { eventDetails } from "./_components/event-data"

export const metadata: Metadata = {
  title: `${eventDetails.shortName} 2026 | DataSam`,
  description:
    "Primer Encuentro Nacional de Estudiantes de Ciencia de Datos, un evento para estudiantes de todo el país.",
  openGraph: {
    title: eventDetails.name,
    description: eventDetails.subtitle,
    type: "website",
  },
}

export default function EncuentroDatos2026Page() {
  return (
    <main className="min-h-screen">
      <EventNavigation />
      <Hero />
      <About />
      <Schedule />
      <UniversitiesMap academicProposals={academicProposals} />
      <Organizers />
      <section id="registro" className="bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">Preinscribite al ENECD</h2>
          <p className="mx-auto mb-8 max-w-2xl text-balance text-lg text-muted-foreground">
            Completá el formulario para ayudarnos a dimensionar la acreditación y las actividades del encuentro.
          </p>
          <p className="mb-6 inline-flex items-center gap-2 rounded-md bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-900">
            <CalendarClock className="size-4 text-sky-700" />
            {eventDetails.formsDeadline}
          </p>
          <div>
            <Button asChild size="lg" className="px-8 text-base font-semibold">
              <a href={eventDetails.registrationUrl} target="_blank" rel="noopener noreferrer">
                Ir al formulario de preinscripción
              </a>
            </Button>
          </div>
        </div>
      </section>
      <EventFooter />
    </main>
  )
}
