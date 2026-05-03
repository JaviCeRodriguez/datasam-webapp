import { Card } from "@/components/ui/card"

import { features } from "./event-data"

export function About() {
  return (
    <section id="que-es" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-balance text-4xl font-bold md:text-5xl">Qué es el ENECD</h2>
          <p className="text-balance text-lg text-muted-foreground">
            Un evento único que reúne a estudiantes y profesionales de Ciencia de Datos de universidades públicas y
            privadas de Argentina.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <Card key={feature.title} className="gap-4 rounded-md p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex size-12 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
