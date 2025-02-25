"use client";

import { useRootStore } from "@/store/root-store";

const allowedDomains = [
  "@unsam-bue.edu.ar",
  "@unsam.edu.ar",
  "@estudiantes.unsam.edu.ar",
  "@iib.unsam.edu.ar",
];

export const useSession = () => {
  const session = useRootStore((state) => state.session);

  const isEmailUNSAM = () => {
    if (!session) return false;

    const email = session.user?.email || "";
    return allowedDomains.some((domain) => email.endsWith(domain));
  };

  return { session, isEmailUNSAM };
};
