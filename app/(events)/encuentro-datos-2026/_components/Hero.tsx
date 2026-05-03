import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"

import { eventDetails } from "./event-data"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#08111f] pt-24 text-white"
    >
      <Image
        src="/events/encuentro-datos-2026/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#08111f_0%,rgba(8,17,31,0.92)_38%,rgba(8,17,31,0.7)_72%,rgba(8,17,31,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#08111f] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-4 py-16">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-50 shadow-[0_0_40px_rgba(34,211,238,0.18)] backdrop-blur">
            <span className="size-2 rounded-full bg-[#22d3ee]" />Evento nacional presencial
          </div>

          <div className="space-y-5">
            <p className="font-mono text-sm font-semibold uppercase text-[#22d3ee]">
              {eventDetails.shortName} 2026
            </p>
            <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[1.02] md:text-7xl lg:text-8xl">
              {eventDetails.name}
            </h1>
          </div>

          <p className="max-w-2xl text-balance text-xl leading-8 text-slate-200 md:text-2xl md:leading-9">
            {eventDetails.subtitle}
          </p>

          <div className="flex flex-col gap-4 text-slate-100 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-[#f0abfc]" />
              <span className="font-semibold">{eventDetails.date}</span>
            </div>
            <span className="hidden size-1 rounded-full bg-slate-400 sm:block" />
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-[#f0abfc]" />
              <span className="font-semibold">{eventDetails.location}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[#c026d3] px-8 text-base font-semibold text-white shadow-lg shadow-fuchsia-950/30 hover:bg-[#a21caf]"
            >
              <a href={eventDetails.registrationUrl} target="_blank" rel="noopener noreferrer">
                Registrate
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur hover:bg-white/15 hover:text-white"
            >
              <a href="#agenda">Ver agenda</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
