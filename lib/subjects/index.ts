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

export type StudyPlan = {
  year: number;
  quarters: {
    quarter: number;
    content: Subject[];
  }[];
};

export const studyPlan = [
  {
    year: 1,
    quarters: [
      {
        quarter: 1,
        content: [
          {
            code: "N1",
            nombre: "Análisis 1",
            cuatrimestre: 1,
            anio: 1,
            creditos: 8,
            horasPresenciales: 128,
            horasVirtuales: 0,
            correlativas: null,
          },
          {
            code: "CD01",
            nombre: "Introducción a la Ciencia de Datos",
            cuatrimestre: 1,
            anio: 1,
            creditos: 6,
            horasPresenciales: 64,
            horasVirtuales: 32,
            correlativas: null,
          },
          {
            code: "CD02",
            nombre: "Programación 1",
            cuatrimestre: 1,
            anio: 1,
            creditos: 6,
            horasPresenciales: 64,
            horasVirtuales: 32,
            correlativas: null,
          },
        ],
      },
      {
        quarter: 2,
        content: [
          {
            code: "N10",
            nombre: "Análisis 2",
            cuatrimestre: 2,
            anio: 1,
            creditos: 8,
            horasPresenciales: 128,
            horasVirtuales: 0,
            correlativas: ["N1"],
          },
          {
            code: "CD03",
            nombre: "Matemática Discreta",
            cuatrimestre: 2,
            anio: 1,
            creditos: 8,
            horasPresenciales: 96,
            horasVirtuales: 32,
            correlativas: ["N1"],
          },
          {
            code: "CD04",
            nombre: "Introducción al Aprendizaje Automático",
            cuatrimestre: 2,
            anio: 1,
            creditos: 6,
            horasPresenciales: 64,
            horasVirtuales: 32,
            correlativas: ["N1", "CD01", "CD02"],
          },
        ],
      },
    ],
  },
  {
    year: 2,
    quarters: [
      {
        quarter: 1,
        content: [
          {
            code: "CD05",
            nombre: "Infraestructura para Ciencia de Datos",
            cuatrimestre: 1,
            anio: 2,
            creditos: 6,
            horasPresenciales: 0,
            horasVirtuales: 96,
            correlativas: ["CD02"],
          },
          {
            code: "TPI07",
            nombre: "Algoritmos I",
            cuatrimestre: 1,
            anio: 2,
            creditos: 10,
            horasPresenciales: 160,
            horasVirtuales: 0,
            correlativas: ["N1"],
          },
          {
            code: "CB34",
            nombre: "Probabilidad y Estadística",
            cuatrimestre: 1,
            anio: 2,
            creditos: 4,
            horasPresenciales: 64,
            horasVirtuales: 0,
            correlativas: ["N10"],
          },
        ],
      },
      {
        quarter: 2,
        content: [
          {
            code: "CD06",
            nombre: "Estadística e Inferencia I",
            cuatrimestre: 2,
            anio: 2,
            creditos: 8,
            horasPresenciales: 0,
            horasVirtuales: 128,
            correlativas: ["CB34", "CD03"],
          },
          {
            code: "TPI10",
            nombre: "Algoritmos II",
            cuatrimestre: 2,
            anio: 2,
            creditos: 9,
            horasPresenciales: 144,
            horasVirtuales: 0,
            correlativas: ["N10", "CD03", "TPI07"],
          },
          {
            code: "Electiva 1",
            nombre: "Electiva 1",
            cuatrimestre: 2,
            anio: 2,
            creditos: 4,
            horasPresenciales: 0,
            horasVirtuales: 64,
            correlativas: null,
          },
        ],
      },
    ],
  },
  {
    year: 3,
    quarters: [
      {
        quarter: 1,
        content: [
          {
            code: "CD07",
            nombre: "Estadística e Inferencia II",
            cuatrimestre: 1,
            anio: 3,
            creditos: 8,
            horasPresenciales: 0,
            horasVirtuales: 128,
            correlativas: ["CD06"],
          },
          {
            code: "CD08",
            nombre: "Programación 2",
            cuatrimestre: 1,
            anio: 3,
            creditos: 6,
            horasPresenciales: 0,
            horasVirtuales: 96,
            correlativas: ["CD02", "TPI10"],
          },
          {
            code: "Electiva 2",
            nombre: "Electiva 2",
            cuatrimestre: 1,
            anio: 3,
            creditos: 6,
            horasPresenciales: 96,
            horasVirtuales: 0,
            correlativas: null,
          },
        ],
      },
      {
        quarter: 2,
        content: [
          {
            code: "CD09",
            nombre: "Ciencia de Datos",
            cuatrimestre: 2,
            anio: 3,
            creditos: 8,
            horasPresenciales: 32,
            horasVirtuales: 96,
            correlativas: ["CD07", "TPI10"],
          },
          {
            code: "TPI14",
            nombre: "Bases de Datos",
            cuatrimestre: 2,
            anio: 3,
            creditos: 8,
            horasPresenciales: 128,
            horasVirtuales: 0,
            correlativas: ["TPI10"],
          },
          {
            code: "CD10",
            nombre: "Ingeniería de Software",
            cuatrimestre: 2,
            anio: 3,
            creditos: 6,
            horasPresenciales: 64,
            horasVirtuales: 32,
            correlativas: ["CD08"],
          },
        ],
      },
    ],
  },
  {
    year: 4,
    quarters: [
      {
        quarter: 1,
        content: [
          {
            code: "CD11",
            nombre: "Aprendizaje Automático",
            cuatrimestre: 1,
            anio: 4,
            creditos: 6,
            horasPresenciales: 0,
            horasVirtuales: 96,
            correlativas: ["CD07", "CD08"],
          },
          {
            code: "Electiva 3",
            nombre: "Electiva 3",
            cuatrimestre: 1,
            anio: 4,
            creditos: 8,
            horasPresenciales: 64,
            horasVirtuales: 64,
            correlativas: ["CD08", "CD10"],
          },
          {
            code: "Optativa 1",
            nombre: "Optativa 1",
            cuatrimestre: 1,
            anio: 4,
            creditos: 6,
            horasPresenciales: 96,
            horasVirtuales: 0,
            correlativas: null,
          },
        ],
      },
      {
        quarter: 2,
        content: [
          {
            code: "CD12",
            nombre: "Aprendizaje Profundo",
            cuatrimestre: 2,
            anio: 4,
            creditos: 6,
            horasPresenciales: 0,
            horasVirtuales: 96,
            correlativas: ["CD11"],
          },
          {
            code: "Optativa 3",
            nombre: "Optativa 3",
            cuatrimestre: 2,
            anio: 4,
            creditos: 6,
            horasPresenciales: 96,
            horasVirtuales: 0,
            correlativas: null,
          },
          {
            code: "Optativa 2",
            nombre: "Optativa 2",
            cuatrimestre: 2,
            anio: 4,
            creditos: 8,
            horasPresenciales: 64,
            horasVirtuales: 64,
            correlativas: ["CD12"],
          },
        ],
      },
    ],
  },
];
