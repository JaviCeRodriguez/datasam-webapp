import { useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { linksHome } from "@/lib/links-home";
import LogoV from "@/assets/images/logo_v_claro_sombra_final.svg";
import { loadSlim } from "@tsparticles/slim";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useCollaboratorsData } from "@/hooks/use-collaborators";
import { Skeleton } from "@/components/ui/skeleton";

const HomeScreen = () => {
  const { data: collaborators, loading } = useCollaboratorsData();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  return (
    <div>
      <div
        id="particles-js"
        className="z-0 h-[calc(100vh-64px)] bg-gradient-to-r from-pink-600 to-indigo-900 relative"
      >
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: 80,
              },
              opacity: {
                value: 0.6,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 6 },
              },
            },
            detectRetina: true,
          }}
        />

        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center h-full">
          <img
            src={LogoV}
            alt="Logo"
            className="mb-20 mx-auto w-5/6 md:w-3/4 max-w-[600px] drop-shadow-md pointer-events-none select-none"
            loading="lazy"
            sizes="(max-width: 800px) 100vw, 800px"
          />
          {/* <h2 className="text-xl font-semibold text-center text-white">
            Donde el conocimiento se comparte y la comunidad se fortalece 🚀
          </h2> */}
        </div>
      </div>

      <main className="relative z-10 p-4 bg-white md:p-10">
        <section>
          <h4 className="mb-4 text-4xl font-semibold text-center">
            ¿Quiénes somos?
          </h4>
          <p className="mb-4 text-lg">
            👉🏼 Somos un grupo de estudiantes de la Licenciatura en Ciencia de
            Datos, de la Universidad Nacional de San Martín.
          </p>
          <p className="text-lg">
            🧉 Nuestro objetivo es brindar un espacio de encuentro y
            colaboración para estudiantes de la carrera. Todos los estudiantes
            son bienvenidos a aportar con recursos y conocimientos. También son
            bienvenidos los estudiantes y docentes de otras carreras que quieran
            aprender y compartir.
          </p>

          <div className="grid gap-6 mt-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-48" />
                ))}
              </>
            ) : (
              <>
                {collaborators.map((collaborator, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="h-full p-0">
                      <div className="flex flex-col h-full sm:flex-row">
                        <div className="w-full sm:w-1/3 md:w-2/5 lg:w-1/3">
                          <div className="relative w-full h-48 sm:h-full">
                            <img
                              src={`${
                                import.meta.env.VITE_SUPABASE_URL
                              }/storage/v1/object/public/collaborators/${
                                collaborator.profile
                              }`}
                              alt="Javier Rodriguez"
                              className="absolute inset-0 object-cover object-center w-full h-full rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                            />
                          </div>
                        </div>
                        <div className="p-4 sm:w-2/3">
                          <h3 className="text-lg font-semibold">
                            {collaborator.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {collaborator.role}
                          </p>
                          <p className="mt-2 text-sm italic">
                            {collaborator.phrase}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        </section>

        <section className="mt-20">
          <h4 className="mb-4 text-4xl font-semibold text-center">
            Links útiles
          </h4>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {linksHome.map((card, idx) => (
              <Link
                to={card.link}
                target="_blank"
                key={`link-${idx + 1}`}
                rel="noopener noreferrer"
              >
                <Card>
                  <CardContent className="flex items-center p-2 xl:p-4">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-12 h-12"
                    />
                    <div className="flex flex-col ml-4">
                      <h3 className="font-semibold">{card.name}</h3>
                      <p className="text-sm">{card.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-20 text-center">
          <p>
            Web desarrollada por{" "}
            <a
              href="https://javicerodriguez.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-500"
            >
              Javo
            </a>
            &nbsp;(con muchos 🧉), para&nbsp;
            <span className="font-semibold text-orange-600 whitespace-nowrap">
              DATA SAM
            </span>{" "}
            © {currentYear}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default HomeScreen;
