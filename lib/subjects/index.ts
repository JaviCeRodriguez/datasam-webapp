import { initNodes } from "./nodes";

export type Subject = {
  code: string;
  nombre: string;
  cuatrimestre: number;
  anio: number;
  creditos: number;
  horasPresenciales: number;
  horasVirtuales: number;
  correlativas: string[] | null;
  esOptativa?: boolean;
  esElectiva?: boolean;
};

export const subjects = initNodes
  .filter(
    (node: any) => node.type === "custom" && node.data.condicion === "carrera"
  )
  .map((node: any) => ({
    code: node.data.codigo || node.data.materia,
    nombre: node.data.materia,
    cuatrimestre: node.data.cuatrimestre - (node.data.anio - 1) * 2,
    anio: node.data.anio,
    creditos: node.data.creditos,
    horasPresenciales: node.data.ch_presencial,
    horasVirtuales: node.data.ch_distancia,
    correlativas: node.data.correlativas?.split("|") || null,
    // esOptativa: node.data.condicion === "optativa",
    // esElectiva: node.data.condicion === "electiva",
  })) as Subject[];
