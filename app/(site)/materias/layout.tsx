import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan de Estudios",
  description:
    "Plan de estudios interactivo de la Licenciatura en Ciencia de Datos de la UNSAM. Haz seguimiento de tu progreso académico, visualiza las materias por año y cuatrimestre, y gestiona tu avance en la carrera. Incluye todas las materias desde el primer año hasta el cuarto año.",
  openGraph: {
    title: "Plan de Estudios - DATA SAM",
    description:
      "Plan de estudios interactivo de la Licenciatura en Ciencia de Datos de la UNSAM. Haz seguimiento de tu progreso académico y gestiona tu avance en la carrera.",
    type: "website",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "Plan de Estudios - DATA SAM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan de Estudios - DATA SAM",
    description:
      "Plan de estudios interactivo de la Licenciatura en Ciencia de Datos de la UNSAM. Haz seguimiento de tu progreso académico.",
    images: ["/og-image"],
  },
};

export default function MateriasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
