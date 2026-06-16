"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { Map as LeafletMap, Marker, LatLngExpression } from "leaflet"
import { MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

import type { AcademicProposal } from "./academic-proposals"

function buildProposalPopup(proposal: AcademicProposal) {
  const popup = document.createElement("div")
  popup.className = "max-w-72"

  const header = document.createElement("div")
  header.className = "mb-3 flex items-center gap-3"

  const acronymMark = document.createElement("span")
  acronymMark.className =
    "flex size-11 shrink-0 items-center justify-center rounded-md bg-sky-700 px-1 text-center text-xs font-bold text-white"
  acronymMark.textContent = proposal.acronym

  const titleGroup = document.createElement("div")

  const acronym = document.createElement("strong")
  acronym.className = "block"
  acronym.textContent = proposal.acronym

  const name = document.createElement("span")
  name.className = "text-xs text-slate-500"
  name.textContent = proposal.name

  titleGroup.append(acronym, name)
  header.append(acronymMark, titleGroup)

  const title = document.createElement("p")
  title.className = "mb-3 text-sm font-semibold text-slate-950"
  title.textContent = proposal.title

  const details = document.createElement("p")
  details.className = "mb-3 text-xs leading-5 text-slate-600"
  details.textContent = `${proposal.careerType} · ${proposal.modality} · ${proposal.province}`

  const institution = document.createElement("p")
  institution.className = "mb-3 text-xs text-slate-500"
  institution.textContent = proposal.institutionType

  const link = document.createElement("a")
  link.href = proposal.link
  link.target = "_blank"
  link.rel = "noopener noreferrer"
  link.className = "inline-flex rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold !text-white hover:bg-sky-800"
  link.textContent = "Ver página"

  popup.append(header, title, details, institution, link)

  return popup
}

type UniversitiesMapProps = {
  academicProposals: AcademicProposal[]
}

export function UniversitiesMap({ academicProposals }: UniversitiesMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const markersRef = useRef<Map<string, Marker>>(new Map())
  const [selectedProposalId, setSelectedProposalId] = useState(academicProposals[0]?.id ?? "")
  const [selectedProvince, setSelectedProvince] = useState("all")
  const [selectedModality, setSelectedModality] = useState("all")
  const provinces = useMemo(
    () => Array.from(new Set(academicProposals.map((proposal) => proposal.province))).sort((a, b) => a.localeCompare(b)),
    [academicProposals]
  )
  const modalities = useMemo(
    () => Array.from(new Set(academicProposals.map((proposal) => proposal.modality))).sort((a, b) => a.localeCompare(b)),
    [academicProposals]
  )
  const filteredProposals = useMemo(
    () =>
      academicProposals.filter((proposal) => {
        const matchesProvince = selectedProvince === "all" || proposal.province === selectedProvince
        const matchesModality = selectedModality === "all" || proposal.modality === selectedModality

        return matchesProvince && matchesModality
      }),
    [academicProposals, selectedModality, selectedProvince]
  )
  const filteredProposalIds = useMemo(
    () => new Set(filteredProposals.map((proposal) => proposal.id)),
    [filteredProposals]
  )

  function openProposal(proposal: AcademicProposal) {
    const marker = markersRef.current.get(proposal.id)
    const map = mapRef.current

    setSelectedProposalId(proposal.id)

    if (!marker || !map) return

    const target = ([...proposal.coords] as unknown) as LatLngExpression
    const targetZoom = Math.max(map.getZoom(), 7)
    let popupOpened = false
    const openPopup = () => {
      if (popupOpened) return
      popupOpened = true
      marker.openPopup()
    }

    map.closePopup()
    map.once("moveend", openPopup)
    map.flyTo(target, targetZoom, {
      animate: true,
      duration: 0.45,
    })
    window.setTimeout(openPopup, 550)
  }

  useEffect(() => {
    let cancelled = false

    async function setupMap() {
      if (!mapContainerRef.current || mapRef.current) return

      const L = await import("leaflet")
      if (cancelled || !mapContainerRef.current) return

      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
      }).setView([-38, -63], 4)
      mapRef.current = map

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      const icon = L.divIcon({
        className: "",
        html: '<span style="display:block;width:22px;height:22px;border-radius:9999px;background:#0284c7;border:3px solid white;box-shadow:0 10px 20px rgba(8,17,31,.32)"></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      })

      markersRef.current = new Map()

      academicProposals.forEach((proposal) => {
        const marker = L.marker(([...proposal.coords] as unknown) as LatLngExpression, { icon }).addTo(map)
        marker.bindPopup(buildProposalPopup(proposal))
        marker.on("click", () => setSelectedProposalId(proposal.id))
        markersRef.current.set(proposal.id, marker)
      })

      if (markersRef.current.size > 0) {
        const bounds = L.latLngBounds(academicProposals.map((proposal) => [...proposal.coords] as LatLngExpression))
        map.fitBounds(bounds, { padding: [28, 28] })
      }
    }

    void setupMap()

    return () => {
      cancelled = true
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = new Map()
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [academicProposals])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    map.closePopup()

    markersRef.current.forEach((marker, proposalId) => {
      if (filteredProposalIds.has(proposalId)) {
        marker.addTo(map)
      } else {
        marker.remove()
      }
    })

    if (selectedProposalId && !filteredProposalIds.has(selectedProposalId)) {
      setSelectedProposalId("")
    }

    if (filteredProposals.length > 0) {
      const bounds = filteredProposals.map((proposal) => [proposal.coords[0], proposal.coords[1]] as [number, number])

      map.fitBounds(bounds, {
        padding: [28, 28],
      })
    }
  }, [filteredProposalIds, filteredProposals, selectedProposalId])

  return (
    <section id="propuestas" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-balance text-4xl font-bold md:text-5xl">Mapa de propuestas academicas</h2>
          <p className="text-balance text-lg text-muted-foreground">
            Carreras y propuestas vinculadas a Ciencia de Datos en universidades argentinas.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <Card className="relative z-0 isolate overflow-hidden rounded-md p-0">
            <div
              ref={mapContainerRef}
              className="relative z-0 h-[560px] w-full"
              aria-label="Mapa de propuestas academicas"
            />
          </Card>

          <div className="relative z-20 flex h-[560px] flex-col overflow-hidden">
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                <SelectTrigger className="w-full" aria-label="Filtrar por provincia">
                  <SelectValue placeholder="Provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las provincias</SelectItem>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedModality} onValueChange={setSelectedModality}>
                <SelectTrigger className="w-full" aria-label="Filtrar por modalidad">
                  <SelectValue placeholder="Modalidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las modalidades</SelectItem>
                  {modalities.map((modality) => (
                    <SelectItem key={modality} value={modality}>
                      {modality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid min-h-0 flex-1 auto-rows-max content-start gap-3 overflow-y-auto pr-1">
              {filteredProposals.length > 0 ? (
                filteredProposals.map((proposal) => (
                  <button
                    key={proposal.id}
                    type="button"
                    onClick={() => openProposal(proposal)}
                    className={cn(
                      "rounded-md border bg-background p-3 text-left transition-all hover:border-sky-300 hover:shadow-sm",
                      selectedProposalId === proposal.id && "border-sky-500 bg-sky-50"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold">{proposal.acronym}</span>
                      <Badge variant="outline" className="text-xs">
                        {proposal.careerType}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{proposal.title}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 text-sky-700" />
                      <span>
                        {proposal.name} · {proposal.province}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
                  No hay propuestas para los filtros seleccionados.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
