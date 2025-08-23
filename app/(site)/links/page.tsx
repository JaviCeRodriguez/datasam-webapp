import { LinksSection } from "./_componentes/LinksSection"

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-20">
        <div className="absolute inset-0 bg-[url('/abstract-data-visualization.png')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  DATA
                </span>
                <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent ml-4">
                  SAM
                </span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">Todos nuestros enlaces en un solo lugar</p>
          </div>
        </div>
      </section>

      <LinksSection />
    </div>
  )
}
