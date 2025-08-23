import { Button } from "@/components/ui/button"
import { Zap, Star } from "lucide-react"

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary via-accent to-secondary">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="text-white">
          <h2 className="text-4xl font-bold font-poppins mb-6">¿Listo para unirte a la comunidad?</h2>
          <p className="text-xl mb-8 opacity-90">
            Conecta con otros estudiantes, comparte conocimientos y crece profesionalmente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3">
              <Zap className="mr-2 h-5 w-5" />
              Únete Ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3 bg-transparent"
            >
              <Star className="mr-2 h-5 w-5" />
              Explorar Recursos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
