import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const teamMembers = [
  {
    name: "Joaquín Saposnik",
    role: "Admin y Community Manager",
    description:
      "Conllevo la difícil tarea de laburar el resto de mi vida como Joaco. También soy Bárbaro/Fighter nivel 12",
    image: "/joaco.webp",
    badges: ["DATA", "Nivel 12"],
    badgeColor: "bg-primary",
  },
  {
    name: "Javier Rodriguez",
    role: "Desarrollador Web",
    description:
      "Líder técnico en Incubator, Cebo mates amargos y soy de River. Si me quiero poner serio, hago ruido de mate al terminar una frase. *ruido de mate* 🧉",
    image: "/javo.jpg",
    badges: ["Web Dev", "River Plate", "F1"],
    badgeColor: "bg-secondary",
  },
  {
    name: "¿Serás vos?",
    role: "Community Manager",
    description:
      "Estamos buscando un nuevo Community Manager para DATA SAM. Si te apasiona construir comunidades y conectar con estudiantes, ¡queremos conocerte!",
    image: null,
    badges: [],
    badgeColor: "bg-accent",
  },
];

export const TeamSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-poppins mb-4">
            Nuestro Equipo
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conoce a los estudiantes que hacen posible esta comunidad
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="text-8xl">🤔</div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge className={member.badgeColor}>
                    {member.role.split(" ")[0]}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {member.description}
                </p>
                {member.badges.length > 0 && (
                  <div className="flex gap-2">
                    {member.badges.map((badge, badgeIndex) => (
                      <Badge
                        key={badgeIndex}
                        variant={badgeIndex === 0 ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
