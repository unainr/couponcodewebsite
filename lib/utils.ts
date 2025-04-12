import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const correctOne = (correct: string) => { 
  return correct.replace(/\//g, " "); // Replaces all slashes with spaces
};