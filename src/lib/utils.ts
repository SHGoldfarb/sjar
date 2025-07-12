import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const memoize = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T
): T => {
  const cache: Record<string, ReturnType<T>> = {};
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  }) as T;
};
