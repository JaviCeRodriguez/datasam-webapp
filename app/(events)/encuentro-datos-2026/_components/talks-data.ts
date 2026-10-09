export type Talk = {
  id: number
  time: string
  room: string
  title: string
  summary: string
  details?: string[]
  speakers: { name: string; bio?: string; photo?: string }[]
  institutions?: { name: string; url?: string; logo?: string; logoWidth?: number }[]
}

const asset = "/events/encuentro-datos-2026/ponencias/"

export const talks: Talk[] = [
  {
    id: 12,
    time: "11:30–12:30",
    room: "Aula 1",
    title: "Buenas prácticas de un vibecoder eficiente",
    summary:
      "Hábitos, configuraciones y automatizaciones de Claude Code para construir más con menos tokens y administrar mejor el presupuesto de uso.",
    details: [
      "Un vibecoder eficiente no es el que más tokens gasta, sino el que más construye con ellos. Veremos hábitos, configuraciones y automatizaciones de Claude Code para trabajar mejor, cuidar el presupuesto y aprovechar el plan durante todo el mes.",
      "También se presentará brevemente TELUS Digital y, al finalizar, su programa de pasantías y oportunidades para estudiantes.",
    ],
    speakers: [{ name: "Emiliano Lafferriere", bio: "Manager, Gen AI en TELUS Digital." }],
    institutions: [{ name: "TELUS Digital", logo: `${asset}ponencia12-telus-digital.png`, logoWidth: 145 }],
  },
  {
    id: 1,
    time: "11:30–12:30",
    room: "Aula 2",
    title: "Estudio de técnicas de aprendizaje automático usando sobremuestreo de datos",
    summary:
      "Evaluación de SMOTE, G-SMOTE, ADASYN y ADASYN+ENN con árboles de decisión, Random Forest y SVM para abordar el desbalance de clases.",
    speakers: [{ name: "Aarón Zeballo" }],
  },
  {
    id: 4,
    time: "11:30–12:30",
    room: "Aula 3",
    title: "Del conteo binario al multiclase: estimación de ganado en imágenes satelitales con deep learning",
    summary:
      "Detección y conteo de vacas, ovejas y guanacos en imágenes satelitales mediante transfer learning, posprocesamiento y métricas de evaluación. Explora un sistema en dos etapas.",
    speakers: [
      {
        name: "Juan Sebastián Carrizo",
        bio: "Estudiante de cuarto año de la Licenciatura en Ciencias de Datos de la UNaB. Desarrolla de forma autónoma, bajo la supervisión del Dr. Juan Domingo González (UBA–UNaB), un sistema de conteo multiclase de ganado en imágenes satelitales. Retoma el trabajo de Torrusio et al. (2024).",
      },
    ],
    institutions: [
      { name: "UNaB", url: "https://www.unab.edu.ar/", logo: `${asset}ponencia4-logo_unibrown.png` },
      {
        name: "FCNyM–UNLP",
        url: "https://www.fcnym.unlp.edu.ar/",
        logo: `${asset}ponencia4-identidad-fcnym-unlp-2-color-svg.svg`,
      },
    ],
  },
  {
    id: 11,
    time: "11:30–12:30",
    room: "Aula 4",
    title: "Agentes, skills y rules: del concepto a un pipeline de datos",
    summary:
      "Una introducción práctica a agentes, skills, rules y Ways para organizar procesos reutilizables. Diseñaremos una familia de skills para ciencia de datos y veremos una demo de ingeniería de datos con Python y SQL.",
    speakers: [
      {
        name: "Javier Rodriguez",
        bio: "Tech Lead frontend en Incu, donde lidera equipos y desarrolla aplicaciones con React y TypeScript. Autodidacta y estudiante de Programación en la UTN. Fue ayudante de Programación 1 de la Licenciatura en Ciencia de Datos de la UNSAM y coordinó un grupo de estudio de Python en FrontendCafé.",
        photo: `${asset}ponencia11-Javier.png`,
      },
    ],
  },
  {
    id: 8,
    time: "14:00–15:00",
    room: "Aula 1",
    title: "Cuando la inteligencia no alcanza",
    summary:
      "En julio, cientos de agentes de IA que estaban siendo evaluados terminaron atacando Hugging Face para prevalecer. ¿Cómo se llega a eso, y qué podemos hacer los que estudiamos datos?",
    details: [
      "Una charla sobre IA que hace trampa, cómo mirar adentro de un modelo y cómo empezar a investigar desde la facu.",
    ],
    speakers: [
      {
        name: "Tomás Pablo Korenblit",
        bio: "Científico de datos, estudiante de grado en la UNSAM, investigador y facilitador en BAISH. Trabaja para que la IA salga bien.",
      },
    ],
    institutions: [
      { name: "UNSAM", url: "https://www.unsam.edu.ar/" },
      { name: "BAISH" },
    ],
  },
  {
    id: 10,
    time: "14:00–16:00",
    room: "Aula 3",
    title: "Zona 4: Reconstruyendo la memoria colectiva mediante ciencia de datos",
    summary:
      "Charla taller sobre la integración de fuentes dispersas en un grafo de conocimiento para apoyar la búsqueda de personas desaparecidas y la restitución de identidades.",
    details: [
      "Zona 4 es un proyecto interdisciplinario que trabaja junto con Abuelas de Plaza de Mayo en la búsqueda de personas desaparecidas y la restitución de identidades de nietxs apropiadxs. Su comisión de ciencia de datos también colabora con Wikimedia para disponibilizar datos y con Cybercirujas, que donó un servidor para alojar la web y las aplicaciones.",
      "La charla mostrará cómo se integran datos de sitios web, bases de datos y texto plano en un grafo de conocimiento. Con él se podrán resolver identidades, establecer circuitos represivos y estimar la probabilidad de que una persona haya estado en un centro clandestino. El taller propondrá actividades basadas en problemas reales del proyecto para pensar soluciones en conjunto con IA.",
    ],
    speakers: [
      { name: "Nerea Lopez", bio: "Directora del proyecto Zona 4, historiadora y docente." },
      {
        name: "Mauricio Genta",
        bio: "Científico de datos senior en LATAM Airlines, con cinco años de trabajo en grafos y resolución de identidades. Estudiante de Ciencia de Datos en UNSAM e integrante de la comisión de ciencia de datos de Zona 4.",
      },
      {
        name: "Joaquin Saposnik",
        bio: "Científico de datos en Banco Credicoop, fundador y administrador de DATA SAM. Estudiante de Ciencia de Datos en UNSAM e integrante de la comisión de ciencia de datos de Zona 4.",
      },
    ],
    institutions: [
      { name: "Zona 4", url: "https://www.instagram.com/zonacuatrosm", logo: `${asset}ponencia10-zona4.png` },
      { name: "Abuelas de Plaza de Mayo", url: "https://www.abuelas.org.ar", logo: `${asset}ponencia10-abuelas.png` },
    ],
  },
  {
    id: 5,
    time: "14:00–15:00",
    room: "Aula 4",
    title: "Predecir menos, planificar mejor: simulación probabilística para una tesorería expuesta a Bitcoin",
    summary:
      "Precios históricos, simulación probabilística y análisis de sensibilidad para evaluar cómo la exposición a Bitcoin afecta liquidez, riesgo y presupuesto.",
    speakers: [
      {
        name: "Juan Manuel Pedrol",
        bio: "Estudiante de cuarto año de Ciencia de Datos en la UNaB y Data Scientist Semi Senior en Seidor Analytics. Trabaja en analítica, planificación de demanda y presupuestación.",
      },
    ],
    institutions: [{ name: "UNaB", url: "https://www.unab.edu.ar/", logo: `${asset}ponencia4-logo_unibrown.png` }],
  },
  {
    id: 9,
    time: "15:00–16:00",
    room: "Aula 2",
    title: "Herramientas matemáticas aplicadas a gobierno de datos",
    summary:
      "Comparación de herramientas de aprendizaje automático para el gobierno de datos y su utilidad según los problemas de cada organización.",
    speakers: [
      {
        name: "Ayelén Luján Scafati",
        bio: "Estudia la Licenciatura en Ciencia de Datos y trabaja en esa área.",
        photo: `${asset}ponencia9-Ayelen.jpg`,
      },
    ],
  },
  {
    id: 6,
    time: "15:00–16:00",
    room: "Aula 4",
    title: "¿Cómo un científico de datos puede cambiar un centro de investigación?",
    summary:
      "Tres casos de CIMeT —reportes semanales automatizados, facturación sistematizada y fenotipado clínico de IRAB mediante clustering— muestran el impacto de la ciencia de datos en un centro de investigación en salud.",
    speakers: [
      {
        name: "María Sol Crespi",
        bio: "Estudiante de último año de Ciencia de Datos en UNSAM y Scientist en el Centro INFANT de Medicina Traslacional, donde es coautora de dos publicaciones. También participa en un proyecto interdisciplinario sobre economía popular con la Escuela de Política y Gobierno.",
        photo: `${asset}ponencia6-Sol_crespi.jpg`,
      },
    ],
  },
  {
    id: 3,
    time: "17:30–18:30",
    room: "Aula 1",
    title: "Desarrollo de una red neuronal de grafos para analizar la dinámica de proteínas",
    summary:
      "Diseño de una red neuronal de grafos con atención (GAT) para estudiar simulaciones de una proteína vinculada con la regulación del microambiente tumoral.",
    speakers: [
      {
        name: "Andrea Calbi",
        bio: "Estudiante avanzada de Ingeniería Biomédica en UNSAM. Realiza su proyecto final en el Laboratorio de Biofísica Teórica y Computacional (LBTyC). Fue becaria PEFI 2024 y CIN 2025–26 en el laboratorio y realizó un intercambio en el Karlsruhe Institute of Technology con la beca BWS.",
        photo: `${asset}ponencia3-AndreaCalbi.jpeg`,
      },
    ],
    institutions: [
      {
        name: "LBTyC · UNSAM",
        url: "https://icifi.unsam.edu.ar/src/paginas/lbtyc/",
        logo: `${asset}ponencia3-LBTyC_logo.png`,
      },
    ],
  },
  {
    id: 2,
    time: "17:30–18:30",
    room: "Aula 2",
    title: "Modelado del estado de cultivos bajo variabilidad climática",
    summary:
      "Un modelo de clasificación que usa datos climáticos para anticipar el estado de cultivos y posibles pérdidas agropecuarias en Argentina.",
    speakers: [
      {
        name: "Emanuel Pinasco",
        bio: "Graduado en Letras de la UBA y Análisis de Sistemas de ORT; estudiante de Ciencia de Datos en UNSAM. Presentó un trabajo sobre probing en LLMs en un congreso de lingüística y trabaja en infraestructura de datos.",
        photo: `${asset}ponencia2-Emanuel.jpeg`,
      },
      {
        name: "Ignacio Miguel García",
        bio: "Graduado en Letras de la UBA y estudiante de Ciencia de Datos en UNSAM.",
        photo: `${asset}ponencia2-Ignacio.jpeg`,
      },
    ],
  },
  {
    id: 7,
    time: "17:30–18:30",
    room: "Aula 4",
    title: "Aspectos metodológicos en inferencia ecológica con datos electorales aplicados a la Provincia de Buenos Aires",
    summary:
      "Modelos de inferencia ecológica para relacionar datos censales y electorales y estimar preferencias políticas de distintos sectores socioeconómicos.",
    speakers: [
      {
        name: "Juan Domingo Gonzalez",
        bio: "Matemático y profesor de la UNaB, autor de paquetes de R. Investigó modelos de acústica submarina y estadística computacional, y colabora en proyectos de ciencia de datos e inteligencia artificial.",
        photo: `${asset}ponencia7-Juan.jpg`,
      },
    ],
    institutions: [{ name: "UNaB", url: "https://www.unab.edu.ar/", logo: `${asset}ponencia4-logo_unibrown.png` }],
  },
]
