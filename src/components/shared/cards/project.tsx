import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { stringToColor } from "@/lib/utils";
import { Project } from "@/models/projects";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <Card className="relative overflow-hidden grid grid-cols-1 md:grid-cols-2 drop-shadow-md">
      <CardContent className="p-4 flex flex-col justify-between gap-4 order-2 md:order-1">
        <CardHeader className="p-0">
          <h3 className="text-2xl font-bold">{project.name}</h3>
          {
            <p className="text-gray-500">
              {project.description && project.description.length > 30
                ? project.description.slice(0, 30) + "..."
                : project.description}
            </p>
          }
          {project.tecnologies && (
            <div>
              <h4 className="text-lg font-semibold">Principales tecnologías</h4>
              <div className="flex gap-1 flex-wrap">
                {project.tecnologies.map((tech) => (
                  <span
                    key={tech}
                    style={{ backgroundColor: stringToColor(tech) }}
                    className="text-xs px-2 py-1 rounded-full drop-shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardHeader>
        {/*<CardFooter className="p-0">
          <Button>Ver detalles</Button>
        </CardFooter> */}
      </CardContent>
      <img
        src={project.cover || undefined}
        alt="cover"
        className={`w-full h-40 md:h-full object-cover order-1 md:order-2 ${project.cover ? "" : "bg-gradient-to-br from-blue-500 to-purple-500"}`}
      />
      <div className="absolute right-0 rounded-bl-lg overflow-hidden">
        {project.is_active ? (
          <span className="bg-green-400 text-black py-1 px-2 text-sm">
            Activo
          </span>
        ) : (
          <span className="bg-red-500 text-white py-1 px-2 text-sm">
            Inactivo
          </span>
        )}
      </div>
    </Card>
  );
};
