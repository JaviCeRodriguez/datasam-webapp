import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToColor(str: string): string {
  // Hash the string to a number
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate a random color based on the hash
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;

  // Mix the color with white to get a pastel color
  const pastelR = Math.floor((r + 255) / 2);
  const pastelG = Math.floor((g + 255) / 2);
  const pastelB = Math.floor((b + 255) / 2);

  // Convert the pastel color to a hex string
  const pastelColor = `#${((1 << 24) + (pastelR << 16) + (pastelG << 8) + pastelB).toString(16).slice(1).toUpperCase()}`;

  return pastelColor;
}
