import Head from "next/head";
import CorrelativasTree from "./components/Tree";

const CorrelativasPage = () => {
  return (
    <>
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
      <div className="min-h-screen relative py-8">
        <h1>Correlativas</h1>
        <CorrelativasTree />
      </div>
    </>
  );
};

export default CorrelativasPage;
