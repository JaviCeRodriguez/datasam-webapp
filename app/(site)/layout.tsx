import type React from "react";
import { Navigation } from "./_componentes/Navigation";
import { Footer } from "./_componentes/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
