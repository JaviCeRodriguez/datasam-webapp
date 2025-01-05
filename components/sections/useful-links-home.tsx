import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { linksHome } from "@/lib/links-home";

export const UsefulLinksHome = () => {
  return (
    <section className="mt-20">
      <h4 className="mb-4 text-4xl font-semibold text-center">Links útiles</h4>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {linksHome.map((card, idx) => (
          <Link
            href={card.link}
            target="_blank"
            key={`link-${idx + 1}`}
            rel="noopener noreferrer"
          >
            <Card>
              <CardContent className="flex items-center p-2 xl:p-4">
                <Image
                  src={card.image}
                  alt={card.name}
                  className="w-12 h-12"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col ml-4">
                  <h3 className="font-semibold">{card.name}</h3>
                  <p className="text-sm">{card.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
