import { Card, CardContent } from "@/components/ui/card";
import { linksCards } from "@/lib/links-home";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo_web.png";

const HomeScreen = () => {
  return (
    <div>
      <img
        src={Logo}
        alt="Logo"
        className="w-full py-12 mx-auto md:w-3/4 max-w-[800px]"
        loading="lazy"
        sizes="(max-width: 800px) 100vw, 800px"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {linksCards.map((card, idx) => (
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

export default HomeScreen;
