import { Subject } from "@/screens/subjects";
import { initNodes } from "./nodes";

export const subjects: Subject[] = initNodes
  .filter((node) => node.type === "custom" && node.data.condicion === "carrera")
  .map((node) => ({
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
  }));
