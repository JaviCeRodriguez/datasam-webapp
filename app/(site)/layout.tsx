import type React from "react";
import type { Metadata } from "next";
import { Navigation } from "./_components/Navigation";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Comunidad estudiantil de la Licenciatura en Ciencia de Datos de la UNSAM. Accede a recursos académicos, plan de estudios interactivo, materiales de estudio y conecta con otros estudiantes. Más de 500 estudiantes activos compartiendo conocimiento.",
  openGraph: {
    title: "DATA SAM - Comunidad de Estudiantes de Ciencia de Datos",
    description:
      "Comunidad estudiantil de la Licenciatura en Ciencia de Datos de la UNSAM. Recursos, plan de estudios, materiales y más para estudiantes. Más de 500 estudiantes activos 🚀",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DATA SAM - Comunidad de Estudiantes de Ciencia de Datos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DATA SAM - Comunidad de Estudiantes de Ciencia de Datos",
    description:
      "Comunidad estudiantil de la Licenciatura en Ciencia de Datos de la UNSAM. Recursos, plan de estudios y más para estudiantes 🚀",
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "DATA SAM",
  description:
    "Comunidad estudiantil de la Licenciatura en Ciencia de Datos de la Universidad Nacional de San Martín (UNSAM)",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://datasam.com.ar",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://datasam.com.ar/"}images/logo_h_claro_final.svg`,
  sameAs: [
    "https://www.instagram.com/datasamok/",
    "https://github.com/DATA-SAM-LCD",
    "https://datasam.notion.site/",
  ],
  memberOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Nacional de San Martín",
    url: "https://www.unsam.edu.ar",
  },
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Estudiantes de Ciencia de Datos",
  },
  offers: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Course",
      name: "Recursos y Materiales de Estudio",
      description: "Recursos académicos, plan de estudios interactivo y materiales de estudio para estudiantes",
    },
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
