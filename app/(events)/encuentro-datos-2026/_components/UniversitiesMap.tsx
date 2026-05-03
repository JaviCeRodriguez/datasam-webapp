"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import type { Map as LeafletMap, Marker, LatLngExpression } from "leaflet"
import { ExternalLink, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { academicProposals } from "./event-data"

type AcademicProposal = (typeof academicProposals)[number]

function buildProposalPopup(proposal: AcademicProposal) {
  const popup = document.createElement("div")
  popup.className = "min-w-52"

  const header = document.createElement("div")
  header.className = "mb-3 flex items-center gap-3"

  const logo = document.createElement("img")
  logo.src = proposal.logo
  logo.alt = proposal.acronym
  logo.className = "size-11 rounded-md border border-slate-200 bg-white object-contain p-1"

  const titleGroup = document.createElement("div")

  const acronym = document.createElement("strong")
  acronym.className = "block"
  acronym.textContent = proposal.acronym

  const name = document.createElement("span")
  name.className = "text-xs text-slate-500"
  name.textContent = proposal.name

  titleGroup.append(acronym, name)
  header.append(logo, titleGroup)

  const title = document.createElement("p")
  title.className = "mb-3 text-sm"
  title.textContent = proposal.title

  const link = document.createElement("a")
  link.href = proposal.link
  link.target = "_blank"
  link.rel = "noopener noreferrer"
  link.className = "text-sm font-semibold text-fuchsia-700"
  link.textContent = "Ver pagina"

  popup.append(header, title, link)

  return popup
}

export function UniversitiesMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const markersRef = useRef<Marker[]>([])
  const [selectedAcronym, setSelectedAcronym] = useState(academicProposals[0].acronym)
  const selectedProposal =
    academicProposals.find((proposal) => proposal.acronym === selectedAcronym) ?? academicProposals[0]

  useEffect(() => {
    let cancelled = false

    async function setupMap() {
      if (!mapContainerRef.current || mapRef.current) return

      const L = await import("leaflet")
      if (cancelled || !mapContainerRef.current) return

      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
      }).setView([-35.4, -59.8], 6)
      mapRef.current = map

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      const icon = L.divIcon({
        className: "",
        html: '<span style="display:block;width:22px;height:22px;border-radius:9999px;background:#c026d3;border:3px solid white;box-shadow:0 10px 20px rgba(8,17,31,.32)"></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      })

      markersRef.current = academicProposals.map((proposal) => {
        const marker = L.marker(([...proposal.coords] as unknown) as LatLngExpression, { icon }).addTo(map)
        marker.bindPopup(buildProposalPopup(proposal))
        marker.on("click", () => setSelectedAcronym(proposal.acronym))
        return marker
      })
    }

    void setupMap()

    return () => {
      cancelled = true
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <section id="propuestas" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-balance text-4xl font-bold md:text-5xl">Mapa de propuestas academicas</h2>
          <p className="text-balance text-lg text-muted-foreground">
            Una vista demo con carreras y propuestas vinculadas a Ciencia de Datos en universidades argentinas.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <Card className="overflow-hidden rounded-md p-0">
            <div ref={mapContainerRef} className="h-[560px] w-full" aria-label="Mapa de propuestas academicas" />
          </Card>

          <div className="space-y-4">
            <Card className="rounded-md p-6">
              <p className="text-sm text-muted-foreground">Propuesta seleccionada</p>
              <div className="mt-4 flex items-start gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-md border bg-white p-2">
                  <Image src={selectedProposal.logo} alt={selectedProposal.acronym} fill sizes="64px" className="object-contain p-2" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedProposal.acronym}</h3>
                  <p className="text-sm text-muted-foreground">{selectedProposal.name}</p>
                </div>
              </div>
              <p className="mt-4 font-semibold">{selectedProposal.title}</p>
              <a
                href={selectedProposal.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Ver pagina
                <ExternalLink className="size-4" />
              </a>
            </Card>

            <div className="grid gap-3">
              {academicProposals.map((proposal) => (
                <button
                  key={proposal.acronym}
                  type="button"
                  onClick={() => setSelectedAcronym(proposal.acronym)}
                  className={cn(
                    "rounded-md border bg-background p-4 text-left transition-all hover:border-primary/50 hover:shadow-sm",
                    selectedAcronym === proposal.acronym && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold">{proposal.acronym}</span>
                    <Badge variant="outline" className="text-xs">
                      Demo
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{proposal.title}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 text-primary" />
                    <span>{proposal.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
