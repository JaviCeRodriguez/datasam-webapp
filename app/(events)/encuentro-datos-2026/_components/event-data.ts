import { BarChart3, Presentation, Users } from "lucide-react"

export const eventDetails = {
  shortName: "ENECD",
  name: "1° Encuentro Nacional de Estudiantes de Ciencia de Datos",
  date: "Sábado 10 de Octubre 2026",
  location: "ITS - UNSAM - San Martín - Buenos Aires",
  locationUrl: "https://maps.app.goo.gl/7rF99fDhis6bXTup7",
  subtitle: "El evento más importante que conecta a estudiantes de Ciencia de Datos de todo el país.",
  registrationUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfn7qrshPZ-qQacdIVjAsrgn5PmhwPEeIkhh2fssdg7T0m_yA/viewform?usp=header",
  talksUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSegVGY62jf3WtG2OvC9MjzuS0YiheKvnEemGv7WEc2eLZUV4w/viewform?usp=header",
  formsDeadline: "Fecha límite viernes 31/07/2026",
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

export const organizers = [
  {
    name: "DATA SAM",
    description: "Comunidad de datos de UNSAM",
    logo: "/images/logo_v_claro_sombra_final.svg",
    link: "https://datasam.com.ar/",
  },
  {
    name: "Construir CyT",
    description: "Construccion colectiva en ciencia y tecnologia",
    logo: "/images/construir_cyt.jpg",
    link: "https://www.instagram.com/construir.cecyt/",
  },
  {
    name: "Lic. en Ciencia de Datos",
    description: "Carrera de Ciencia de Datos UNSAM",
    logo: "/images/unsam_lcd.jpg",
    logoClassName: "scale-[1.45]",
    link: "https://www.unsam.edu.ar/escuelas/ecyt/661/ciencia/ciencia-de-datos",
  },
  {
    name: "UNSAM",
    description: "Universidad Nacional de San Martin",
    logo: "/images/unsam.jpg",
    logoClassName: "scale-[2.3]",
    link: "https://www.unsam.edu.ar/",
  },
]
