import { Button } from "@/components/ui/button";
import { useRootStore } from "@/store/root-store";
import { SubjectStatus } from "@/store/slices/subjects";

type Props = {
  materia: {
    code: string;
    nombre: string;
    creditos: number;
    horasPresenciales: number;
    horasVirtuales: number;
  };
  onClick: () => void;
  onHighlight: () => void;
  isHighlighted: boolean;
  isCorrelative: boolean;
};

const statusColors: Record<SubjectStatus, string> = {
  "Por hacer": "bg-gray-200",
  Cursando: "bg-yellow-200",
  Aprobado: "bg-green-200",
  "Aprobado con Final": "bg-blue-200",
};

export const SubjectCard = ({
  materia,
  onClick,
  onHighlight,
  isHighlighted,
  isCorrelative,
}: Props) => {
  const status = useRootStore(
    (state) => state.subjectStatuses[materia.code] || "Por hacer"
  );

  return (
    <div
      className={`relative ${
        isHighlighted
          ? "ring-2 ring-primary ring-offset-2"
          : isCorrelative
          ? "ring-2 ring-secondary ring-offset-2 animate-pulse"
          : ""
      }`}
    >
      <Button
        variant="outline"
        className={`w-full justify-start text-left h-auto ${statusColors[status]}`}
        onClick={onClick}
      >
        <div>
          <div className="font-medium">{materia.nombre}</div>
          <div className="text-sm text-muted-foreground">
            💡 Créditos: {materia.creditos}
          </div>
          <div className="text-sm text-muted-foreground">
            🏫 Presencial: {materia.horasPresenciales}h | 💻 Virtual:{" "}
            {materia.horasVirtuales}h
          </div>
          <div className="mt-1 text-xs">{status}</div>
        </div>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1"
        onClick={(e) => {
          e.stopPropagation();
          onHighlight();
        }}
      >
        🔗
      </Button>
    </div>
  );
};
