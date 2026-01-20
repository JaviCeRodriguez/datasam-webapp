import { Users, Rocket } from "lucide-react";
import Image from "next/image";

export const AboutSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-poppins mb-4">
            ¿Quiénes somos?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full mr-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Comunidad Estudiantil</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Somos una comunidad de estudiantes de la Licenciatura en Ciencia
              de Datos de la Universidad Nacional de San Martín.
            </p>

            <div className="flex items-center mb-6">
              <div className="p-3 bg-secondary/10 rounded-full mr-4">
                <Rocket className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold">Nuestro Objetivo</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Brindar un espacio de encuentro y colaboración para estudiantes de
              la carrera. Todos los estudiantes son bienvenidos a aportar con
              recursos y conocimientos.
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-4xl aspect-[16/10] overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/about.jpg"
                alt="DATA SAM"
                fill
                className="object-cover"
                quality={100}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Database className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Base de datos</h4>
              <p className="text-sm text-muted-foreground">
                Recursos, notas y más
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <BarChart3 className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Análisis</h4>
              <p className="text-sm text-muted-foreground">
                Herramientas y técnicas
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Machine Learning</h4>
              <p className="text-sm text-muted-foreground">
                Algoritmos y modelos
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Code className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Programación</h4>
              <p className="text-sm text-muted-foreground">Python, R y más</p>
            </Card>
          </div> */}
        </div>
      </div>
    </section>
  );
};
