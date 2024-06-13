import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "@/screens/home";
import QRScreen from "@/screens/qr";
import { RootLayout } from "@/components/layouts/root.tsx";
import ProfilesScreen from "@/screens/profiles";
import JobsScreen from "@/screens/jobs";

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
        path: "profiles",
        element: <ProfilesScreen />,
      },
      {
        path: "jobs",
        element: <JobsScreen />,
      },
      {
        path: "qr",
        element: <QRScreen />,
      },
    ],
  },
]);
