import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Disc } from "lucide-react";
import { useParticles } from "@/app/hooks/useParticles";
import Image from "next/image";

export const HeroSection = () => {
  const particlesRef = useParticles();

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-20"
    >
      <canvas
        ref={particlesRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold font-poppins mb-6">
              <div className="w-full mx-auto flex justify-center items-center">
                <Image src="/images/logo_v_claro_sombra_final.svg" alt="DataSam" width={400} height={200} />
              </div>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Donde el conocimiento se comparte y la comunidad se fortalece 🚀
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              asChild
            >
              <Link href="#recursos">
                <BookOpen className="mr-2 h-5 w-5" />
                Explorar Recursos
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">600+</div>
              <div className="text-sm text-muted-foreground">Estudiantes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">70+ GB</div>
              <div className="text-sm text-muted-foreground">Recursos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">20+</div>
              <div className="text-sm text-muted-foreground">Materias</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
