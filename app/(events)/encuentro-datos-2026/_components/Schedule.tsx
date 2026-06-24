import { CalendarClock, Mic2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { eventDetails, schedule } from "./event-data"

export function Schedule() {
  return (
    <section id="agenda" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 font-mono text-sm font-semibold uppercase text-sky-700">Cronograma tentativo</p>
          <h2 className="mb-6 text-balance text-4xl font-bold md:text-5xl">Agenda del evento</h2>
          <p className="text-balance text-lg text-muted-foreground">
            Un día intenso con muchas actividades para poder participar. Tendremos mesas ordinarias con ponencias de
            estudiantes y profesionales del área.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <Card className="overflow-hidden rounded-md p-0 blur-[2px] select-none">
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
                  <span className="font-mono text-sm font-semibold text-foreground">{item.end}</span>
                  <span className="font-medium">{item.activity}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/45 px-4 backdrop-blur-[1px]">
            <div className="max-w-xl rounded-md border border-sky-200 bg-sky-50 px-5 py-4 text-center shadow-lg shadow-sky-950/10">
              <p className="text-base font-bold text-sky-950">Agenda en preparación</p>
              <p className="mt-1 text-sm font-medium text-sky-900">
                Próximamente daremos a conocer los horarios definitivos, ponentes y otras actividades del encuentro.
              </p>
            </div>
          </div>
        </div>

        <Card className="mx-auto mt-8 max-w-4xl rounded-md border-sky-200 bg-sky-50 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-[#0284c7] text-white">
                <Mic2 className="size-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Inscribite para exponer tu proyecto o charla</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sumate a las mesas ordinarias y compartí tu trabajo con la comunidad.
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-sky-900">
                  <CalendarClock className="size-4 text-sky-700" />
                  {eventDetails.formsDeadline}
                </p>
              </div>
            </div>
            <Button asChild className="shrink-0 bg-[#0284c7] text-white hover:bg-[#0369a1]">
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
