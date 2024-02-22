import CardLink from "@/components/CardLink";
import { linksCards } from "@/utils/links";
import { Image, Link } from "@nextui-org/react";
import Head from "next/head";
import NextImage from "next/image";

export default function Page() {
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
      <div className="min-h-screen relative pb-36">
        <header className="flex justify-center items-center py-8 min-h-[300px]">
          <Image
            as={NextImage}
            src="/images/logo_web.png"
            alt="logo"
            width={600}
            height={230}
            className="h-auto"
          />
        </header>
        <section className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {linksCards.map((props) => (
            <CardLink key={props.name} {...props} />
          ))}
        </section>

        <footer className="flex justify-center items-center py-8 mt-24 absolute bottom-0 w-full">
          <small className="text-gray-100">
            Hecho con 🧉 por&nbsp;
            <Link
              href="https://javo.dev.ar/"
              color="warning"
              isExternal
              size="sm"
            >
              <b>Javier Rodriguez</b>
            </Link>
            , para <b className="text-green-500">DATASAM</b>
            &nbsp;-&nbsp;&copy;&nbsp;
            {new Date().getFullYear()}
          </small>
        </footer>
      </div>
    </>
  );
}
