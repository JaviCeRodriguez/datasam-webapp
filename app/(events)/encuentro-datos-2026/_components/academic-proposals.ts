export type AcademicProposal = {
  id: string
  name: string
  acronym: string
  title: string
  province: string
  modality: string
  institutionType: string
  careerType: string
  link: string
  coords: readonly [number, number]
}

export const academicProposalsById = {
  "unsam-1": {
    "id": "unsam-1",
    "name": "Universidad Nacional de San Martin (UNSAM)",
    "acronym": "UNSAM",
    "title": "Licenciatura en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Licenciatura",
    "link": "https://unsam.edu.ar/escuelas/ecyt/661/ciencia/ciencia-de-datos",
    "coords": [
      -34.58046469920226,
      -58.52253522702739
    ]
  },
  "unab-2": {
    "id": "unab-2",
    "name": "Universidad Nacional Guillermo Brown (UNaB)",
    "acronym": "UNaB",
    "title": "Licenciatura en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "Sin modalidad informada",
    "institutionType": "Pública",
    "careerType": "Licenciatura",
    "link": "https://www.unab.edu.ar/lic-ciencia-datos/",
    "coords": [
      -34.79581547013806,
      -58.38828887499707
    ]
  },
  "unlp-3": {
    "id": "unlp-3",
    "name": "Universidad Nacional de La Plata (UNLP)",
    "acronym": "UNLP",
    "title": "Ciencia de Datos en Organizaciones",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Licenciatura",
    "link": "https://www.econo.unlp.edu.ar/cdo",
    "coords": [
      -34.91246259146304,
      -57.9506745884923
    ]
  },
  "uba-4": {
    "id": "uba-4",
    "name": "Universidad Nacional de Buenos Aires (UBA)",
    "acronym": "UBA",
    "title": "Licenciatura en Ciencias de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Licenciatura",
    "link": "https://lcd.exactas.uba.ar/",
    "coords": [
      -34.54191487620748,
      -58.442429997263964
    ]
  },
  "unmdp-5": {
    "id": "unmdp-5",
    "name": "Universidad Nacional de Mar del Plata (UNMDP)",
    "acronym": "UNMDP",
    "title": "Tecnicatura Universitaria en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Tecnicatura",
    "link": "https://exactas.mdp.edu.ar/estudiantes/tecnicatura-universitaria-en-ciencia-de-datos/",
    "coords": [
      -38.005723328289164,
      -57.571308928235034
    ]
  },
  "unsl-6": {
    "id": "unsl-6",
    "name": "Universidad Nacional de San Luis (UNSL)",
    "acronym": "UNSL",
    "title": "Licenciatura en Análisis y Gestión de Datos",
    "province": "San Luis",
    "modality": "A distancia",
    "institutionType": "Pública",
    "careerType": "Licenciatura",
    "link": "https://carreras.unsl.edu.ar/carreras/lic-analisis-y-gest-datos",
    "coords": [
      -33.291908971943045,
      -66.33959804532948
    ]
  },
  "uner-8": {
    "id": "uner-8",
    "name": "Universidad Nacional de Entre Ríos (UNER)",
    "acronym": "UNER",
    "title": "Tec. en Procesamiento y Explotación de Datos",
    "province": "Entre Ríos",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Tecnicatura",
    "link": "http://ingenieria.uner.edu.ar/index.php/pregrado/data-mining",
    "coords": [
      -32.48400366679743,
      -58.23121752661151
    ]
  },
  "unca-10": {
    "id": "unca-10",
    "name": "Universidad Nacional de Catamarca (UNCA)",
    "acronym": "UNCA",
    "title": "Licenciatura en Ciencias de Datos",
    "province": "Catamarca",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Licenciatura",
    "link": "https://www.unca.edu.ar/grado",
    "coords": [
      -28.458993198751156,
      -65.78241093116898
    ]
  },
  "unl-11": {
    "id": "unl-11",
    "name": "Universidad Nacional del Litoral (UNL)",
    "acronym": "UNL",
    "title": "Licenciatura en Ciencia de Datos",
    "province": "Santa Fe",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Licenciatura",
    "link": "https://www.unl.edu.ar/carreras/licenciatura-en-ciencia-de-datos/",
    "coords": [
      -31.63391961768777,
      -60.70514806289112
    ]
  },
  "cps-12": {
    "id": "cps-12",
    "name": "Centro Politécnico Superior “Malvinas Argentinas” (CPS)",
    "acronym": "CPS",
    "title": "Tecnicatura Superior en Ciencia de Datos e Inteligencia Artificial",
    "province": "Tierra del Fuego",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Tecnicatura",
    "link": "https://campuspolitecnico.tdf.gob.ar/course/index.php?categoryid=1",
    "coords": [
      -53.81469707271458,
      -67.67651137381347
    ]
  },
  "inset-13": {
    "id": "inset-13",
    "name": "Instituto Superior de Enseñanza Técnica (InSET)",
    "acronym": "InSET",
    "title": "Tecnicatura Superior en Ciencia de Datos e Inteligencia Artificial (EaD)",
    "province": "Santa Cruz",
    "modality": "A distancia",
    "institutionType": "Pública",
    "careerType": "Tecnicatura",
    "link": "https://inset.edu.ar/carreras-inset/tecnicatura-superior-en-ciencia-de-datos-e-inteligencia-artificial/",
    "coords": [
      -51.62762716225423,
      -69.21274900679919
    ]
  },
  "untref-14": {
    "id": "untref-14",
    "name": "Universidad Nacional de Tres de Febrero (UNTREF)",
    "acronym": "UNTREF",
    "title": "Licenciatura en Estadística y Ciencias de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Licenciatura",
    "link": "https://untref.edu.ar/carrera/estadistica",
    "coords": [
      -34.604720383679606,
      -58.56159488544026
    ]
  },
  "ucaece-16": {
    "id": "ucaece-16",
    "name": "Universidad de la Cámara Argentina de Comercio y Servicios (UCAECE)",
    "acronym": "UCAECE",
    "title": "Licenciatura en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "A distancia",
    "institutionType": "Privada",
    "careerType": "Licenciatura",
    "link": "https://www.ucaece.edu.ar/es/carrera/licenciatura-en-ciencia-de-datos",
    "coords": [
      -34.60881273207133,
      -58.378488773816116
    ]
  },
  "uade-17": {
    "id": "uade-17",
    "name": "Universidad Argentina de la Empresa (UADE)",
    "acronym": "UADE",
    "title": "Licenciatura en IA y Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Licenciatura",
    "link": "https://www.uade.edu.ar/facultad-de-ingenieria-y-ciencias-exactas/licenciatura-en-inteligencia-artificial-y-ciencia-de-datos/",
    "coords": [
      -34.616081712141806,
      -58.37936882830116
    ]
  },
  "ugr-18": {
    "id": "ugr-18",
    "name": "Universidad del Gran Rosario (UGR)",
    "acronym": "UGR",
    "title": "Ciclo de Licenciatura en Ciencia de Datos",
    "province": "Santa Fe",
    "modality": "A distancia",
    "institutionType": "Privada",
    "careerType": "Licenciatura",
    "link": "https://ugr.edu.ar/carreras/ciclo-de-licenciatura-en-ciencia-de-datos/",
    "coords": [
      -32.951165929649896,
      -60.64350169378217
    ]
  },
  "ucasal-19": {
    "id": "ucasal-19",
    "name": "Universidad Católica de Salta (UCASAL)",
    "acronym": "UCASAL",
    "title": "Licenciatura en Ciencia de Datos",
    "province": "Salta",
    "modality": "A distancia",
    "institutionType": "Privada",
    "careerType": "Licenciatura",
    "link": "https://www.ucasal.edu.ar/carrera/por-modalidad/carreras-a-distancia/licenciatura-en-ciencia-de-datos",
    "coords": [
      -24.739794428090068,
      -65.39170522842674
    ]
  },
  "unr-20": {
    "id": "unr-20",
    "name": "Universidad Nacional de Rosario (UNR)",
    "acronym": "UNR",
    "title": "Licenciatura en Ciencia de Datos",
    "province": "Santa Fe",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Licenciatura",
    "link": "https://portal.fcecon.unr.edu.ar/carreras/grado/licenciatura-en-ciencia-de-datos-pagina-en-construccion",
    "coords": [
      -32.95020600150649,
      -60.635595436124554
    ]
  },
  "uner-21": {
    "id": "uner-21",
    "name": "Universidad Nacional de Entre Ríos (UNER)",
    "acronym": "UNER",
    "title": "Licenciatura en Ciencia de Datos",
    "province": "Entre Ríos",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Licenciatura",
    "link": "https://estudia.uner.edu.ar/propuestas/licenciatura-en-ciencia-de-datos/",
    "coords": [
      -31.832325477849547,
      -60.52140154710521
    ]
  },
  "undelta-22": {
    "id": "undelta-22",
    "name": "Universidad Nacional del Delta (UNDELTA)",
    "acronym": "UNDELTA",
    "title": "Licenciatura en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Licenciatura",
    "link": "https://undelta.edu.ar/instituto-de-tecnologia/",
    "coords": [
      -34.45384960498532,
      -58.55778977653931
    ]
  },
  "uca-23": {
    "id": "uca-23",
    "name": "Universidad Católica Argentina (UCA)",
    "acronym": "UCA",
    "title": "Licenciatura en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Licenciatura",
    "link": "https://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias/carrera-de-grado/licenciatura-en-ciencias-de-datos?sede_de_interes=Buenos%20Aires&carreras_de_grado__buenos_aires_=Licenciatura%20en%20Ciencia%20de%20Datos&carrera_de_grado__rosario_=Licenciatura%20en%20Ciencia%20de%20Datos",
    "coords": [
      -34.6135028953226,
      -58.36536144954432
    ]
  },
  "uca-24": {
    "id": "uca-24",
    "name": "Universidad Católica Argentina (UCA)",
    "acronym": "UCA",
    "title": "Licenciatura en Ciencia de Datos",
    "province": "Rosario",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Licenciatura",
    "link": "https://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias/carrera-de-grado/licenciatura-en-ciencias-de-datos?sede_de_interes=Buenos%20Aires&carreras_de_grado__buenos_aires_=Licenciatura%20en%20Ciencia%20de%20Datos&carrera_de_grado__rosario_=Licenciatura%20en%20Ciencia%20de%20Datos",
    "coords": [
      -32.951407703978184,
      -60.6712765011662
    ]
  },
  "up-25": {
    "id": "up-25",
    "name": "Universidad de Palermo (UP)",
    "acronym": "UP",
    "title": "Ingeniería en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "Elección",
    "institutionType": "Privada",
    "careerType": "Ingeniería",
    "link": "https://www.palermo.edu/ingenieria/ingenieria-ciencia-de-datos/",
    "coords": [
      -34.597142884002515,
      -58.41596147338298
    ]
  },
  "unaj-26": {
    "id": "unaj-26",
    "name": "Universidad Nacional Arturo Jauretche (UNAJ)",
    "acronym": "UNAJ",
    "title": "Maestría en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "A distancia",
    "institutionType": "Pública",
    "careerType": "Maestría",
    "link": "https://www.unaj.edu.ar/maestria-ciencia-datos/",
    "coords": [
      -34.77455126850694,
      -58.26710180536242
    ]
  },
  "unaj-27": {
    "id": "unaj-27",
    "name": "Universidad Nacional Arturo Jauretche (UNAJ)",
    "acronym": "UNAJ",
    "title": "Diplomatura Superior en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "A distancia",
    "institutionType": "Pública",
    "careerType": "Diplomatura",
    "link": "https://www.unaj.edu.ar/diplo-sup-ciencia-datos/",
    "coords": [
      -34.77455126850694,
      -58.26710180536242
    ]
  },
  "undec-28": {
    "id": "undec-28",
    "name": "Universidad Nacional de Chilecito (UNdeC)",
    "acronym": "UNdeC",
    "title": "Tecnicatura Universitaria en Ciencias de Datos",
    "province": "La Rioja",
    "modality": "A distancia",
    "institutionType": "Pública",
    "careerType": "Tecnicatura",
    "link": "https://www.undec.edu.ar/tecnicatura-universitaria-en-ciencia-de-datos/",
    "coords": [
      -29.1566416426874,
      -67.47005313681711
    ]
  },
  "unlu-29": {
    "id": "unlu-29",
    "name": "Universidad Nacional de Luján",
    "acronym": "UNLU",
    "title": "Analista Universitario/a en Ciencias de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Tecnicatura",
    "link": "https://www.unlu.edu.ar/carpre-analistaciedatos.html",
    "coords": [
      -34.57862820245755,
      -59.085601091875446
    ]
  },
  "unahur-30": {
    "id": "unahur-30",
    "name": "Universidad Nacional de Hurlingham",
    "acronym": "UNAHUR",
    "title": "Técnico/a Universitario/a en Inteligencia Artificial",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Tecnicatura",
    "link": "https://unahur.edu.ar/tecnicatura-universitaria-en-inteligencia-artificial/",
    "coords": [
      -34.618559553660866,
      -58.637266152416586
    ]
  },
  "unraf-31": {
    "id": "unraf-31",
    "name": "Universidad Nacional de Rafaela",
    "acronym": "UNRaf",
    "title": "Técnico/a Universitario/a en Análisis de Datos",
    "province": "Santa Fe",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Tecnicatura",
    "link": "https://www.unraf.edu.ar/carreras-unraf/tecnicaturas/163-propuesta/tec/pres/1566-carrera-14",
    "coords": [
      -31.250944487966432,
      -61.50210199384317
    ]
  },
  "itba-32": {
    "id": "itba-32",
    "name": "Instituto Tecnológico de Buenos Aires",
    "acronym": "ITBA",
    "title": "Licenciatura en Analítica (Data Science)",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Licenciatura",
    "link": "https://www.itba.edu.ar/grado/analitica-empresarial-y-social/",
    "coords": [
      -34.64048034854542,
      -58.400958598510066
    ]
  },
  "uaa-33": {
    "id": "uaa-33",
    "name": "Universidad Atlántida Argentina",
    "acronym": "UAA",
    "title": "Tecnicatura Universitaria en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Tecnicatura",
    "link": "https://inscribite.atlantida.edu.ar/carreras/tecnicatura-universitaria-en-ciencias-de-datos/",
    "coords": [
      -37.99448553866431,
      -57.52141012477061
    ]
  },
  "uaa-34": {
    "id": "uaa-34",
    "name": "Universidad Atlántida Argentina",
    "acronym": "UAA",
    "title": "Analista Universitario/a en Ciencias de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Tecnicatura",
    "link": "https://inscribite.atlantida.edu.ar/carreras/analista-universitario-a-en-ciencias-de-datos/",
    "coords": [
      -37.99448553866431,
      -57.52141012477061
    ]
  },
  "ua-35": {
    "id": "ua-35",
    "name": "Universidad Austral",
    "acronym": "UA",
    "title": "Licenciatura en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Licenciatura",
    "link": "https://www.austral.edu.ar/carreras-de-grado/ingenieria/ciencia-de-datos/",
    "coords": [
      -34.45399359401486,
      -58.86355661237146
    ]
  },
  "ua-36": {
    "id": "ua-36",
    "name": "Universidad Austral",
    "acronym": "UA",
    "title": "Diplomatura en Inteligencia de Negocio & Inteligencia Artificial",
    "province": "Buenos Aires",
    "modality": "A distancia",
    "institutionType": "Privada",
    "careerType": "Diplomatura",
    "link": "https://www.austral.edu.ar/ingenieria/ingenieria-posgrados/ciencia-de-datos/diplomatura-en-inteligencia-de-negocio/",
    "coords": [
      -34.45399359401486,
      -58.86355661237147
    ]
  },
  "ua-37": {
    "id": "ua-37",
    "name": "Universidad Austral",
    "acronym": "UA",
    "title": "Diplomatura en Ciencia de Datos Aplicada",
    "province": "Buenos Aires",
    "modality": "A distancia",
    "institutionType": "Privada",
    "careerType": "Diplomatura",
    "link": "https://www.austral.edu.ar/ingenieria/ingenieria-posgrados/ciencia-de-datos/diplomatura-en-ciencia-de-datos-aplicada/",
    "coords": [
      -34.45399359401486,
      -58.86355661237148
    ]
  },
  "ua-38": {
    "id": "ua-38",
    "name": "Universidad Austral",
    "acronym": "UA",
    "title": "Diplomatura en Inteligencia Artificial",
    "province": "Buenos Aires",
    "modality": "A distancia",
    "institutionType": "Privada",
    "careerType": "Diplomatura",
    "link": "https://www.austral.edu.ar/ingenieria/ingenieria-posgrados/ia/diplomatura-en-inteligencia-artificial/",
    "coords": [
      -34.45399359401486,
      -58.86355661237149
    ]
  },
  "ua-39": {
    "id": "ua-39",
    "name": "Universidad Austral",
    "acronym": "UA",
    "title": "Maestría en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Maestría",
    "link": "https://www.austral.edu.ar/ingenieria/ingenieria-posgrados/ciencia-de-datos/maestria-en-ciencia-de-datos-presencial/",
    "coords": [
      -34.45399359401486,
      -58.8635566123715
    ]
  },
  "ua-40": {
    "id": "ua-40",
    "name": "Universidad Austral",
    "acronym": "UA",
    "title": "Maestría en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "A distancia",
    "institutionType": "Privada",
    "careerType": "Maestría",
    "link": "https://www.austral.edu.ar/ingenieria/ingenieria-posgrados/ciencia-de-datos/maestria-en-ciencia-de-datos-online/",
    "coords": [
      -34.45399359401486,
      -58.86355661237151
    ]
  },
  "udesa-45": {
    "id": "udesa-45",
    "name": "Universidad de San Andrés",
    "acronym": "UDESA",
    "title": "Maestría en Ciencia de Datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Maestría",
    "link": "https://www.udesa.edu.ar/departamento-de-matematica-y-ciencias/maestria-en-ciencia-de-datos",
    "coords": [
      -34.44634131753273,
      -58.52912949690879
    ]
  },
  "uda-46": {
    "id": "uda-46",
    "name": "Universidad del Aconcagua",
    "acronym": "UDA",
    "title": "Licenciado/a en Analítica de Negocios",
    "province": "Mendoza",
    "modality": "A distancia",
    "institutionType": "Privada",
    "careerType": "Licenciatura",
    "link": "https://www.uda.edu.ar/index.php/licenciatura-en-analitica-de-negocios",
    "coords": [
      -32.88970945331008,
      -68.83615111097104
    ]
  },
  "uda-47": {
    "id": "uda-47",
    "name": "Universidad del Aconcagua",
    "acronym": "UDA",
    "title": "Licenciado en Informática y Desarrollo en Software",
    "province": "Mendoza",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Licenciatura",
    "link": "https://www.uda.edu.ar/index.php/lic-en-informatica-y-desarrollo-de-software",
    "coords": [
      -32.88970945331008,
      -68.83615111097104
    ]
  },
  "uda-48": {
    "id": "uda-48",
    "name": "Universidad del Aconcagua",
    "acronym": "UDA",
    "title": "Técnico Universitario en Desarrollo de Software",
    "province": "Mendoza",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Tecnicatura",
    "link": "https://www.uda.edu.ar/index.php/tecnico-universitario-en-desarrollo-de-software",
    "coords": [
      -32.88970945331008,
      -68.83615111097106
    ]
  },
  "uda-49": {
    "id": "uda-49",
    "name": "Universidad del Aconcagua",
    "acronym": "UDA",
    "title": "Diplomatura Business Analytics",
    "province": "Mendoza",
    "modality": "A distancia",
    "institutionType": "Privada",
    "careerType": "Diplomatura",
    "link": "https://www.uda.edu.ar/index.php/diplomatura-business-analitycs-distancia",
    "coords": [
      -32.88970945331008,
      -68.83615111097107
    ]
  },
  "ucema-50": {
    "id": "ucema-50",
    "name": "Universidad del CEMA",
    "acronym": "UCEMA",
    "title": "Ingeniero/a en Inteligencia Artificial",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Ingeniería",
    "link": "https://ucema.edu.ar/carrera-grado/inia",
    "coords": [
      -34.59847411824833,
      -58.37206825323697
    ]
  },
  "ucema-51": {
    "id": "ucema-51",
    "name": "Universidad del CEMA",
    "acronym": "UCEMA",
    "title": "Gestión Estratégica de Inteligencia Artificial y Automatización Empresarial",
    "province": "Buenos Aires",
    "modality": "A distancia",
    "institutionType": "Privada",
    "careerType": "Propuesta académica",
    "link": "https://ucema.edu.ar/posgrado/on/inteligencia-artificial-automatizacion-empresarial",
    "coords": [
      -34.59847411824833,
      -58.37206825323697
    ]
  },
  "ucel-52": {
    "id": "ucel-52",
    "name": "Universidad del Centro Educativo Latinoamericano",
    "acronym": "UCEL",
    "title": "Diplomatura en Inteligencia Artificial aplicada al ejercicio profesional",
    "province": "Santa Fe",
    "modality": "Elección",
    "institutionType": "Privada",
    "careerType": "Diplomatura",
    "link": "https://www.ucel.edu.ar/producto/diplomatura-en-inteligencia-artificial/",
    "coords": [
      -32.95631493032582,
      -60.643670807276436
    ]
  },
  "uch-53": {
    "id": "uch-53",
    "name": "Universidad Champagnat",
    "acronym": "UCH",
    "title": "Analista Programador Universitario de Sistemas",
    "province": "Mendoza",
    "modality": "Presencial",
    "institutionType": "Privada",
    "careerType": "Tecnicatura",
    "link": "https://www.uch.edu.ar/carrera/analista-programador-universitario-en-sistemas",
    "coords": [
      -27.37092404870119,
      -55.89362775791132
    ]
  },
  "uno-60": {
    "id": "uno-60",
    "name": "Universidad Nacional del Oeste",
    "acronym": "UNO",
    "title": "Especialista en ciencia de datos",
    "province": "Sin provincia informada",
    "modality": "Sin modalidad informada",
    "institutionType": "Pública",
    "careerType": "Especialización",
    "link": "https://www.uno.edu.ar/oferta-academica/posgrado/especializacion-en-ciencia-de-datos.html",
    "coords": [
      -34.670101753192164,
      -58.74333983399853
    ]
  },
  "unlam-61": {
    "id": "unlam-61",
    "name": "Universidad Nacional de La Matanza",
    "acronym": "UNLAM",
    "title": "Especialización en ciencia de datos",
    "province": "Buenos Aires",
    "modality": "Presencial",
    "institutionType": "Pública",
    "careerType": "Especialización",
    "link": "https://www.unlam.edu.ar/academicas/especializacion-en-ciencias-de-datos/",
    "coords": [
      -34.6706473028698,
      -58.56281592883515
    ]
  }
} as const satisfies Record<string, AcademicProposal>

export const academicProposals = Object.values(academicProposalsById)
