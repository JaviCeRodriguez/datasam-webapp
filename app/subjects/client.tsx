"use client";

import { useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { SubjectDrawer } from "@/components/sections/subject-drawer";
import { SubjectCard } from "@/components/sections/subject-card";
import { useRootStore } from "@/store/root-store";
import { subjects } from "@/lib/subjects";
import type { Subject } from "@/lib/subjects";

export const SubjectsClient = () => {
  const [selectedMateria, setSelectedMateria] = useState<Subject | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [highlightedMateria, setHighlightedMateria] = useState<string | null>(
    null
  );
  const materiaRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMateriaClick = (materia: Subject) => {
    setSelectedMateria(materia);
    setIsDrawerOpen(true);
  };

  const handleCorrelativaClick = (code: string) => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      const element = materiaRefs.current[code];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          const materia = subjects.find((m) => m.code === code);
          if (materia) {
            setSelectedMateria(materia);
            setIsDrawerOpen(true);
          }
        }, 500); // Espera a que termine el scroll antes de abrir el drawer
      }
    }, 300); // Espera a que se cierre el drawer antes de hacer scroll
  };

  const handleHighlight = (materiaCode: string) => {
    setHighlightedMateria((prevHighlighted) =>
      prevHighlighted === materiaCode ? null : materiaCode
    );
  };

  const isHighlighted = (materiaCode: string) => {
    return materiaCode === highlightedMateria;
  };

  const isCorrelative = (materiaCode: string) => {
    if (!highlightedMateria) return false;
    const highlightedMateriaObj = subjects.find(
      (m) => m.code === highlightedMateria
    );
    return highlightedMateriaObj?.correlativas?.includes(materiaCode) || false;
  };

  const years = Math.max(...subjects.map((m) => m.anio));

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
          {Array.from({ length: years }, (_, i) => i + 1).map((year) => (
            <div key={year} className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Año {year}</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[1, 2].map((cuatrimestre) => (
                  <div key={cuatrimestre} className="p-4 border rounded-lg">
                    <h3 className="mb-2 text-lg font-medium">
                      Cuatrimestre {cuatrimestre}
                    </h3>
                    <div className="space-y-2">
                      {subjects
                        .filter(
                          (m) =>
                            m.anio === year && m.cuatrimestre === cuatrimestre
                        )
                        .map((subject) => (
                          <div
                            key={subject.code}
                            ref={(el) => {
                              materiaRefs.current[subject.code] = el;
                            }}
                          >
                            <SubjectCard
                              materia={subject}
                              onClick={() => handleMateriaClick(subject)}
                              onHighlight={() => handleHighlight(subject.code)}
                              isHighlighted={isHighlighted(subject.code)}
                              isCorrelative={isCorrelative(subject.code)}
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
