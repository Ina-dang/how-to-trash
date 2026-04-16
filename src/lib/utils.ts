import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge conditional classes and resolve conflicting Tailwind utilities safely.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
