"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Image from "next/image";

export const ParticlesHome = () => {
  initParticlesEngine(async (engine) => {
    await loadSlim(engine);
  });

  return (
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
        <Image
          src="images/logo_v_claro_sombra_final.svg"
          alt="Logo"
          className="mb-20 mx-auto w-5/6 md:w-3/4 max-w-[600px] drop-shadow-md pointer-events-none select-none"
          loading="lazy"
          sizes="(max-width: 800px) 100vw, 800px"
          width={800}
          height={800}
        />
        <h2 className="text-xl font-semibold text-center text-white">
          Donde el conocimiento se comparte y la comunidad se fortalece 🚀
        </h2>
      </div>
    </div>
  );
};
