"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { SubjectDrawer } from "@/components/sections/subject-drawer";
import { SubjectCard } from "@/components/sections/subject-card";
import { useRootStore } from "@/store/root-store";
import { studyPlan } from "@/lib/subjects";
import type { Subject } from "@/lib/subjects";

export const SubjectsClient = () => {
  const [selectedMateria, setSelectedMateria] = useState<Subject | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const subjects = studyPlan.flatMap((year) =>
    year.quarters.flatMap((quarter) => quarter.content)
  );

  const handleMateriaClick = (materia: Subject) => {
    setSelectedMateria(materia);
    setIsDrawerOpen(true);
  };

  const handleCorrelativaClick = (code: string) => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      const materia = subjects.find((m) => m.code === code);
      if (materia) {
        setSelectedMateria(materia);
        setIsDrawerOpen(true);
      }
    }, 500);
  };

  const { subjectStatuses } = useRootStore();
  const totalMaterias = subjects.length;
  const materiasAprobadas = Object.values(subjectStatuses).filter(
    (estado) => estado === "Aprobado con Final"
  ).length;
  const progreso = (materiasAprobadas / totalMaterias) * 100;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Plan de Estudios - Licenciatura en Ciencia de Datos
      </h1>
      <div className="mb-4">
        <Progress value={progreso} className="w-full" />
        <p className="mt-2 text-sm text-muted-foreground">
          Progreso: {materiasAprobadas} de {totalMaterias} materias aprobadas
          con final ({progreso.toFixed(2)}%)
        </p>
      </div>
      <ScrollArea className="md:px-4 h-[calc(100vh-290px)] md:h-[calc(100vh-220px)]">
        <div className="space-y-8">
          {studyPlan.map((sp) => (
            <div key={sp.year} className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Año {sp.year}</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {sp.quarters.map((qs) => (
                  <div key={qs.quarter} className="p-4 border rounded-lg">
                    <h3 className="mb-2 text-lg font-semibold">
                      Cuatrimestre {qs.quarter}
                    </h3>
                    <div className="space-y-2">
                      {qs.content.map((subject) => (
                        <div key={subject.code}>
                          <SubjectCard
                            materia={subject}
                            onClick={() => handleMateriaClick(subject)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <SubjectDrawer
        materia={selectedMateria}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onCorrelativaClick={handleCorrelativaClick}
        materias={subjects}
      />
    </div>
  );
};
