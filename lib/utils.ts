import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const allowedDomains = [
  "@unsam-bue.edu.ar",
  "@unsam.edu.ar",
  "@estudiantes.unsam.edu.ar",
  "@iib.unsam.edu.ar",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmailUNSAM(email: string) {
  return allowedDomains.some((domain) => email.endsWith(domain));
}
