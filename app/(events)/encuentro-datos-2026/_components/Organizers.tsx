import Image from "next/image"
import { ExternalLink } from "lucide-react"

import { Card } from "@/components/ui/card"

import { organizers } from "./event-data"

export function Organizers() {
  return (
    <section id="organizadores" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="mb-6 text-balance text-4xl font-bold md:text-5xl">Organizadores</h2>
          <p className="text-balance text-lg text-muted-foreground">
            Instituciones y comunidades que impulsan el primer encuentro nacional de estudiantes de Ciencia de Datos.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {organizers.map((organizer) => (
            <a key={organizer.name} href={organizer.link} target="_blank" rel="noopener noreferrer">
              <Card className="h-full items-center gap-4 rounded-md p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex size-20 items-center justify-center rounded-md border bg-white p-3">
                  {organizer.logo ? (
                    <div className="relative size-full">
                      <Image
                        src={organizer.logo}
                        alt={organizer.name}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-xl font-black text-primary">{organizer.logoText}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold">{organizer.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{organizer.description}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Ver sitio
                  <ExternalLink className="size-3.5" />
                </span>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
