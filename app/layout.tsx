import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { AuthProvider } from "./hooks/useAuth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "DATA SAM - Comunidad de Estudiantes de Ciencia de Datos",
    template: "%s | DATA SAM",
  },
  description:
    "Comunidad estudiantil de la Licenciatura en Ciencia de Datos de la UNSAM. Recursos, plan de estudios, materiales y más para estudiantes. Donde el conocimiento se comparte y la comunidad se fortalece 🚀",
  keywords: [
    "ciencia de datos",
    "estudiantes",
    "UNSAM",
    "licenciatura",
    "recursos académicos",
    "plan de estudios",
    "comunidad estudiantil",
    "data science",
    "machine learning",
    "programación",
  ],
  authors: [{ name: "DATA SAM" }],
  creator: "DATA SAM",
  publisher: "DATA SAM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "DATA SAM",
    title: "DATA SAM - Comunidad de Estudiantes de Ciencia de Datos",
    description:
      "Comunidad estudiantil de la Licenciatura en Ciencia de Datos de la UNSAM. Recursos, plan de estudios, materiales y más para estudiantes. Donde el conocimiento se comparte y la comunidad se fortalece 🚀",
    images: [
      {
        url: "/og-image",
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
    images: ["/og-image"],
    creator: "@datasam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${poppins.variable} antialiased`}
    >
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
