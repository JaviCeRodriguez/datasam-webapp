import CardLink from "@/components/CardLink";
import Image from "next/image";

const linksCards = [
  {
    name: "CODIGO DE CONDUCTA",
    link: "https://datasam.notion.site/C-DIGO-DE-CONDUCTA-ff93040740cf43ccb4e7286faa3a3eff",
    image: "/logos/notion.png",
    description: "Reglas de convivencia, o hay tabla",
  },
  {
    name: "Discord",
    link: "https://discord.gg/b58Rhb63W6",
    image: "/logos/discord.png",
    description: "Servidor de discord",
  },
  {
    name: "Whatsapp",
    link: "https://chat.whatsapp.com/GZYwzwIY8FZJH8qF1ooUpj",
    image: "/logos/whatsapp.png",
    description: "Comunidad de whatsapp",
  },
  {
    name: "Telegram",
    link: "https://t.me/+_GO5j1XQmpdkMGNh",
    image: "/logos/telegram.png",
    description: "Comunidad de telegram",
  },
  {
    name: "Notion",
    link: "https://datasam.notion.site/DATA-SAM-1e9dc7b00cd6444897be928a234e2e32",
    image: "/logos/notion.png",
    description: "Nuestro repositorio de apuntes principal",
  },
  {
    name: "Instagram: DATASAM",
    link: "https://www.instagram.com/datasamok/",
    image: "/logos/instagram.webp",
    description: "Nuestro medio audiovisual",
  },
  {
    name: "GitHub",
    link: "https://github.com/DATA-SAM-LCD",
    image: "/logos/github.png",
    description: "Nuestros proyectos en GitHub",
  },
  {
    name: "Instagram: LCD",
    link: "https://www.instagram.com/lcd_unsam/",
    image: "/logos/instagram.webp",
    description: "Instagram de la carrera",
  },
  {
    name: "Instagram: UNSAM",
    link: "https://www.instagram.com/unsamoficial/",
    image: "/logos/instagram.webp",
    description: "Instagram de la universidad",
  },
  {
    name: "Instagram: ECyT",
    link: "https://instagram.com/ecyt.unsam",
    image: "/logos/instagram.webp",
    description: "Instagram de la escuela",
  },
];

export default function Page() {
  return (
    <div>
      <header className="py-8">
        <div className="relative w-full h-72">
          <Image
            src="/images/logo_web.png"
            alt="logo"
            fill
            className=" object-contain"
          />
        </div>
      </header>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {linksCards.map((props) => (
          <CardLink key={props.name} {...props} />
        ))}
      </section>
    </div>
  );
}
