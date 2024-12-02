import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine et fusionne les classes CSS conditionnellement
 * @param inputs - Classes CSS
 * @returns Une chaîne de classes CSS combinées
 */
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}
