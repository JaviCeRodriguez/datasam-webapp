import Image from "next/image"
import { LinksSection } from "./_componentes/LinksSection"

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-20">
        <div className="absolute inset-0 bg-[url('/abstract-data-visualization.png')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-full mx-auto flex justify-center items-center">
                <Image src="/images/logo_v_claro_sombra_final.svg" alt="DataSam" width={400} height={200} />
              </div>
            </div>
            <p className="text-xl text-muted-foreground mb-8">Todos nuestros enlaces en un solo lugar</p>
          </div>
        </div>
      </section>

      <LinksSection />
    </div>
  )
}
