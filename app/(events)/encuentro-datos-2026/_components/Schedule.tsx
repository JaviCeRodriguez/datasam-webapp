import { Mic2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { eventDetails, schedule } from "./event-data"

export function Schedule() {
  return (
    <section id="agenda" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 font-mono text-sm font-semibold uppercase text-primary">Cronograma tentativo</p>
          <h2 className="mb-6 text-balance text-4xl font-bold md:text-5xl">Agenda del evento</h2>
          <p className="text-balance text-lg text-muted-foreground">
            Un día intenso con muchas actividades para poder participar. Tendremos mesas ordinarias con ponencias de
            estudiantes y profesionales del área.
          </p>
        </div>

        <Card className="mx-auto max-w-4xl overflow-hidden rounded-md p-0">
          <div className="grid grid-cols-[1fr_1fr_1.6fr] border-b bg-muted/60 px-4 py-3 text-sm font-semibold text-muted-foreground md:grid-cols-[160px_160px_1fr]">
            <span>Inicio</span>
            <span>Fin</span>
            <span>Actividad</span>
          </div>
          <div className="divide-y">
            {schedule.map((item) => (
              <div
                key={`${item.start}-${item.activity}`}
                className="grid grid-cols-[1fr_1fr_1.6fr] items-center px-4 py-4 md:grid-cols-[160px_160px_1fr]"
              >
                <span className="font-mono text-sm font-semibold">{item.start}</span>
                <span className="font-mono text-sm text-muted-foreground">{item.end}</span>
                <span className="font-medium">{item.activity}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mx-auto mt-8 max-w-4xl rounded-md border-primary/20 bg-primary/5 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Mic2 className="size-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Inscribite para exponer tu proyecto o charla</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sumate a las mesas ordinarias y compartí tu trabajo con la comunidad.
                </p>
              </div>
            </div>
            <Button asChild className="shrink-0">
              <a href={eventDetails.talksUrl} target="_blank" rel="noopener noreferrer">
                Cargar ponencia
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
