import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "@/screens/home";
import QRScreen from "@/screens/qr";
import { RootLayout } from "@/components/layouts/root.tsx";
import ProjectsScreen, { loader as projectsLoader } from "@/screens/projects";
import JobsScreen from "@/screens/jobs";
import SubjectsScreen from "@/screens/subjects";
import ProjectDetailModal, {
  loader as projectModalLoader,
} from "@/screens/projects/detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomeScreen />,
      },
      {
        path: "projects",
        element: <ProjectsScreen />,
        loader: projectsLoader,
        children: [
          {
            path: ":id",
            element: <ProjectDetailModal />,
            loader: projectModalLoader,
          },
        ],
      },
      {
        path: "jobs",
        element: <JobsScreen />,
      },
      {
        path: "subjects",
        element: <SubjectsScreen />,
      },
      {
        path: "qr",
        element: <QRScreen />,
      },
    ],
  },
]);
