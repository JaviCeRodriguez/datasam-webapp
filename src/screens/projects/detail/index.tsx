import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { stringToColor } from "@/lib/utils";
import { LoaderData } from "@/models/loader";
import { Project } from "@/models/projects";
import { LoaderCircle } from "lucide-react";
import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";

type LoaderResponse = {
  data: Project[] | null;
  error: object | null;
};

const cld = new Cloudinary({
  cloud: {
    cloudName: "datasam-webapp",
  },
});

export const loader = (async ({ params }) => {
  const { data: projectsData, error: projectsError }: LoaderResponse =
    await supabase.from("projects").select("*").eq("id", params.id);

  cld.image("projects/datasam.png").toURL();

  if (projectsError) {
    return { project: null, error: projectsError };
  }

  if (!projectsData || projectsData.length === 0) {
    return { project: null, error: null };
  }

  // const { data: bucketData, error: bucketError }: LoaderBucketResponse =
  //   await supabase.storage
  //     .from("datasam-imgs")
  //     .createSignedUrl("projects/datasam.png", 60 * 60 * 24);

  const project = projectsData[0];

  // if (!bucketError && bucketData) {
  //   project.signedUrl = bucketData.signedUrl;
  // }

  return { project, error: null };
}) satisfies LoaderFunction;

const ProjectDetailModal = () => {
  const navigate = useNavigate();
  const { project, error } = useLoaderData() as LoaderData<typeof loader>;

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-lg">
        {!project && !error && (
          <div className="flex items-center justify-center w-full h-40">
            <LoaderCircle className="w-16 h-16 text-gray-600 animate-spin" />
          </div>
        )}

        {error && (
          <>
            <DialogHeader>
              <DialogDescription>
                Un error ha ocurrido al cargar el proyecto, por favor intenta de
                nuevo más tarde.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cerrar
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}

        {project && !error && (
          <>
            <DialogHeader>
              <img
                src={project.signedUrl}
                alt="cover"
                className={`w-full h-32 object-cover ${
                  project.signedUrl
                    ? ""
                    : "bg-gradient-to-br from-blue-500 to-purple-500"
                }`}
              />
              <DialogTitle>{project.name}</DialogTitle>
              <DialogDescription>{project.description}</DialogDescription>
            </DialogHeader>
            <div>
              {project.tecnologies && (
                <div>
                  <h4 className="text-lg font-semibold">
                    Principales tecnologías
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.tecnologies.map((tech) => (
                      <span
                        key={tech}
                        style={{ backgroundColor: stringToColor(tech) }}
                        className="px-2 py-1 text-xs rounded-full drop-shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cerrar
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
