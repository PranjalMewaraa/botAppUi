import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function compactNumber(number: number) {
  const options = {
    notation: "compact" as const,
    compactDisplay: "short" as const,
  };
  const usformatter = Intl.NumberFormat("en-US", options);
  return usformatter.format(number);
}
// export function compactNumber(num: number) {

//   return num.toLocaleString(undefined, {
//     maximumFractionDigits: 2,
//     notation: "compact",
//   });
// }

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
