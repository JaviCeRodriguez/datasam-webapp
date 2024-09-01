import { Card, CardContent } from "@/components/ui/card";
import { allLinks } from "@/lib/links-home";
import { Link } from "react-router-dom";
import LogoH from "@/assets/images/logo_h_claro_sombra_final.svg";

const LinksScreen = () => {
  return (
    <div className="p-4 md:10">
      <img
        src={LogoH}
        alt="Logo"
        className="mt-12 mb-20 mx-auto w-5/6 md:w-3/4 max-w-[800px] drop-shadow-md"
        loading="lazy"
        sizes="(max-width: 800px) 100vw, 800px"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allLinks.map((card, idx) => (
          <Link
            to={card.link}
            target="_blank"
            key={`link-${idx + 1}`}
            rel="noopener noreferrer"
          >
            <Card>
              <CardContent className="flex items-center p-2 xl:p-4">
                <img src={card.image} alt={card.name} className="w-12 h-12" />
                <div className="flex flex-col ml-4">
                  <h3 className="font-semibold">{card.name}</h3>
                  <p className="text-sm">{card.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LinksScreen;
