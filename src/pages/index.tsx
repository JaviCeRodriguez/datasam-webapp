import CardLink from "@/components/CardLink";
import Image from "next/image";

const linksCards = [
  {
    name: "CODIGO DE CONDUCTA",
    link: "https://datasam.notion.site/C-DIGO-DE-CONDUCTA-ff93040740cf43ccb4e7286faa3a3eff",
  },
  {
    name: "Discord",
    link: "https://discord.gg/b58Rhb63W6",
  },
  {
    name: "Whatsapp",
    link: "https://chat.whatsapp.com/GZYwzwIY8FZJH8qF1ooUpj",
  },
  {
    name: "Telegram",
    link: "https://t.me/+_GO5j1XQmpdkMGNh",
  },
  {
    name: "Notion",
    link: "https://datasam.notion.site/DATA-SAM-1e9dc7b00cd6444897be928a234e2e32",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/datasamok/",
  },
  {
    name: "GitHub",
    link: "https://github.com/DATA-SAM-LCD",
  },
  {
    name: "IG: LCD",
    link: "https://www.instagram.com/lcd_unsam/",
  },
  {
    name: "IG: UNSAM",
    link: "https://www.instagram.com/unsamoficial/",
  },
  {
    name: "IG: ECyT",
    link: "https://instagram.com/ecyt.unsam",
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
        {linksCards.map(({ name, link }) => (
          <CardLink key={name} name={name} link={link} />
        ))}
      </section>
    </div>
  );
}
