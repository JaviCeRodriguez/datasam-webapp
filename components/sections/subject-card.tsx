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
};

const statusColors: Record<SubjectStatus, string> = {
  "Por hacer": "bg-gray-200",
  Cursando: "bg-yellow-200",
  Aprobado: "bg-green-200",
  "Aprobado con Final": "bg-blue-200",
};

export const SubjectCard = ({ materia, onClick }: Props) => {
  const status = useRootStore(
    (state) => state.subjectStatuses[materia.code] || "Por hacer"
  );

  return (
    <div className="relative">
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
    </div>
  );
};
