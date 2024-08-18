import { ProjectCard } from "@/components/shared/cards/project";
import { supabase } from "@/lib/supabaseClient";
import { LoaderData } from "@/models/loader";
import { Project } from "@/models/projects";
import { useLoaderData, LoaderFunction } from "react-router-dom";

type LoaderResponse = {
  data: Project[] | null;
  error: object | null;
};

export const loader = (async () => {
  const { data, error }: LoaderResponse = await supabase
    .from("projects")
    .select("");
  return { data, error };
}) satisfies LoaderFunction;

const ProjectsScreen = () => {
  const { data, error } = useLoaderData() as LoaderData<typeof loader>;
  console.log(data, error);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 md:10">
      <h2 className="text-2xl font-semibold">
        Proyectos de la comunidad, para la comunidad 🚀
      </h2>
      <p className="mt-2 text-gray-500">
        Aquí encontrarás proyectos de la comunidad de DATASAM. Estos proyectos
        pueden ser individuales o grupales, estrictamente sobre ciencia de datos
        o integrar otras áreas de conocimiento, pero lo que importa es aprender.
      </p>
      <p className="mt-2 text-gray-500">
        ¿Quieres agregar el tuyo? ¡Pronto podrás subirlo y obtener más
        información!
      </p>
      <div className="grid grid-cols-1 mt-6 xl:grid-cols-2">
        {(data as Project[]).map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsScreen;
