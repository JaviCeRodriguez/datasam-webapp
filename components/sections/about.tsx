"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCollaboratorsData } from "@/hooks/use-collaborators";

export const About = () => {
  const { data: collaborators, loading } = useCollaboratorsData();

  return (
    <section>
      <h4 className="mb-4 text-4xl font-semibold text-center">
        ¿Quiénes somos?
      </h4>
      <p className="mb-4 text-lg">
        👉🏼 Somos una comunidad de estudiantes de la Licenciatura en Ciencia de
        Datos, de la Universidad Nacional de San Martín.
      </p>
      <p className="text-lg">
        🧉 Nuestro objetivo es brindar un espacio de encuentro y colaboración
        para estudiantes de la carrera. Todos los estudiantes son bienvenidos a
        aportar con recursos y conocimientos. También son bienvenidos los
        estudiantes y docentes de otras carreras que quieran aprender y
        compartir.
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
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/collaborators/${collaborator.profile}`}
                          alt={collaborator.name}
                          width={500}
                          height={500}
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
  );
};
