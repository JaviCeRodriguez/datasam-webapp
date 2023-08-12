import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <main className="container mx-auto min-h-screen">
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
  );
}
