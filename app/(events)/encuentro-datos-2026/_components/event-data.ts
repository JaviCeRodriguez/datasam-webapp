import { BarChart3, Presentation, Users } from "lucide-react"

const assetPath = "/events/encuentro-datos-2026"

export const eventDetails = {
  shortName: "ENECD",
  name: "1° Encuentro Nacional de Estudiantes de Ciencia de Datos",
  date: "10 de Octubre 2026",
  location: "ITS - UNSAM - San Martín - Buenos Aires",
  subtitle: "El evento más importante que conecta a estudiantes de Ciencia de Datos de todo el país.",
  registrationUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfn7qrshPZ-qQacdIVjAsrgn5PmhwPEeIkhh2fssdg7T0m_yA/viewform?usp=header",
  talksUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSegVGY62jf3WtG2OvC9MjzuS0YiheKvnEemGv7WEc2eLZUV4w/viewform?usp=header",
  hashtag: "#ENECD2026",
}

export const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "ENECD", href: "#que-es" },
  { label: "Agenda", href: "#agenda" },
  { label: "Propuestas", href: "#propuestas" },
  { label: "Organizadores", href: "#organizadores" },
]

export const features = [
  {
    icon: BarChart3,
    title: "Charlas Especializadas",
    description:
      "Conferencias con referentes de la industria y academia sobre los ultimos avances y proyectos en Ciencia de Datos, IA y Machine Learning.",
  },
  {
    icon: Users,
    title: "Networking",
    description: "Conecta con estudiantes, profesionales y universidades de todo el pais.",
  },
  {
    icon: Presentation,
    title: "Ponencias estudiantiles",
    description: "Vas a tener la oportunidad de presentar tu proyecto de datos a toda la comunidad.",
  },
]

export const schedule = [
  { start: "09:00", end: "10:00", activity: "Acreditacion" },
  { start: "10:00", end: "11:00", activity: "Apertura" },
  { start: "11:00", end: "11:30", activity: "Receso" },
  { start: "11:30", end: "12:30", activity: "Mesas ordinarias" },
  { start: "12:30", end: "14:00", activity: "Receso" },
  { start: "14:00", end: "16:00", activity: "Mesas ordinarias" },
  { start: "16:00", end: "17:30", activity: "Receso" },
  { start: "17:30", end: "18:30", activity: "Mesas ordinarias" },
  { start: "18:30", end: "19:00", activity: "Receso" },
  { start: "19:00", end: "20:00", activity: "Cierre" },
]

export const academicProposals = [
  {
    name: "Universidad Nacional de San Martin",
    acronym: "UNSAM",
    title: "Licenciatura en Ciencia de Datos",
    logo: `${assetPath}/unsam-logo.jpg`,
    link: "https://unsam.edu.ar/escuelas/ecyt/661/ciencia/ciencia-de-datos",
    coords: [-34.58046469920226, -58.52253522702739] as const,
  },
  {
    name: "Universidad de Buenos Aires",
    acronym: "UBA",
    title: "Licenciatura en Ciencias de Datos",
    logo: `${assetPath}/uba-logo.jpg`,
    link: "https://lcd.exactas.uba.ar/",
    coords: [-34.54191487620748, -58.442429997263964] as const,
  },
  {
    name: "Instituto Tecnologico de Buenos Aires",
    acronym: "ITBA",
    title: "Licenciatura en Analitica",
    logo: `${assetPath}/itba-logo.jpg`,
    link: "https://www.itba.edu.ar/grado/analitica-empresarial-y-social/",
    coords: [-34.64048034854542, -58.400958598510066] as const,
  },
  {
    name: "Universidad Nacional de La Plata",
    acronym: "UNLP",
    title: "Ciencia de Datos en Organizaciones",
    logo: `${assetPath}/unlp-logo.jpg`,
    link: "https://www.econo.unlp.edu.ar/cdo",
    coords: [-34.91246259146304, -57.9506745884923] as const,
  },
  {
    name: "Universidad Nacional de Rosario",
    acronym: "UNR",
    title: "Licenciatura en Ciencia de Datos",
    logo: `${assetPath}/unr-logo.jpg`,
    link: "https://portal.fcecon.unr.edu.ar/carreras/grado/licenciatura-en-ciencia-de-datos-pagina-en-construccion",
    coords: [-32.95020600150649, -60.635595436124554] as const,
  },
]

export const organizers = [
  {
    name: "DATA SAM",
    description: "Comunidad de datos de UNSAM",
    logo: "/logos/datasam.png",
    link: "https://datasam.com.ar/",
  },
  {
    name: "Construir CyT",
    description: "Construccion colectiva en ciencia y tecnologia",
    logoText: "CyT",
    link: "https://unsam.edu.ar/",
  },
  {
    name: "Lic. en Ciencia de Datos",
    description: "Carrera de Ciencia de Datos UNSAM",
    logoText: "LCD",
    link: "https://www.instagram.com/cienciadedatosunsam/",
  },
  {
    name: "UNSAM",
    description: "Universidad Nacional de San Martin",
    logo: `${assetPath}/unsam-logo.jpg`,
    link: "https://www.unsam.edu.ar/",
  },
]
