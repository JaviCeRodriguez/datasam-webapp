import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRootStore } from "@/stores/root-store";
import { SubjectStatus } from "@/stores/slices/subjects";

type MateriaType = {
  code: string;
  nombre: string;
  cuatrimestre: number;
  anio: number;
  creditos: number;
  horasPresenciales: number;
  horasVirtuales: number;
  correlativas: string[] | null;
};

type Props = {
  materia: MateriaType | null;
  isOpen: boolean;
  onClose: () => void;
  onCorrelativaClick: (code: string) => void;
  materias: MateriaType[];
};

export const SubjectDrawer = ({
  materia,
  isOpen,
  onClose,
  onCorrelativaClick,
  materias,
}: Props) => {
  const { subjectStatuses, setSubjectStatuses } = useRootStore();

  if (!materia) return null;

  const correlativas = materia.correlativas
    ? materias.filter((m) => materia.correlativas?.includes(m.code))
    : [];

  const estadoActual = subjectStatuses[materia.code] || "Por hacer";

  const handleEstadoChange = (value: string) => {
    setSubjectStatuses(materia.code, value as SubjectStatus);
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{materia.nombre}</DrawerTitle>
          <DrawerDescription>
            Código: {materia.code} | Año: {materia.anio} | Cuatrimestre:{" "}
            {materia.cuatrimestre}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>Créditos: {materia.creditos}</p>
          <p>Horas Presenciales: {materia.horasPresenciales}</p>
          <p>Horas Virtuales: {materia.horasVirtuales}</p>

          <h3 className="mt-4 mb-2 font-semibold">Estado:</h3>
          <RadioGroup
            defaultValue={estadoActual}
            onValueChange={handleEstadoChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Por hacer" id="por-hacer" />
              <Label htmlFor="por-hacer">Por hacer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Cursando" id="cursando" />
              <Label htmlFor="cursando">Cursando</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Aprobado" id="aprobado" />
              <Label htmlFor="aprobado">Aprobado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Aprobado con Final" id="aprobado-final" />
              <Label htmlFor="aprobado-final">Aprobado con Final</Label>
            </div>
          </RadioGroup>

          <h3 className="mt-4 mb-2 font-semibold">Correlativas:</h3>
          {correlativas.length > 0 ? (
            <ul className="space-y-2">
              {correlativas.map((correlativa) => (
                <li key={correlativa.code}>
                  <Button
                    variant="link"
                    onClick={() => onCorrelativaClick(correlativa.code)}
                  >
                    {correlativa.nombre}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tiene correlativas</p>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
