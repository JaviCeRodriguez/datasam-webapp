import React from "react";
import Head from "next/head";
import Image from "next/image";

const QRPage = () => {
  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center">
      <Head>
        <title>DATASAM / Comunidad de datos</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="DATASAM / Comunidad de datos" />
        <meta
          property="og:description"
          content="Comunidad de estudiantes de la Licenciatura en Ciencia de Datos de la Universidad Nacional de San Martín"
        />
        <meta
          property="og:image"
          content="https://datasam.vercel.app/images/logo_datasam.png"
        />
        <meta property="og:url" content="https://datasam.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DATASAM" />
      </Head>
      <h2 className="text-4xl md:text-5xl text-center font-semibold text-white mb-4">
        ¡Compartí el QR!
      </h2>
      <h4 className="text-lg md:text-xl text-center font-semibold text-white mb-10">
        Mostrá el QR a tus amigos para que se unan a la comunidad de DATASAM
      </h4>
      <div className="bg-white">
        <Image src="/images/qr_datasam.svg" alt="QR" width={500} height={500} />
      </div>
    </div>
  );
};

export default QRPage;
