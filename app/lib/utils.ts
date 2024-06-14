import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serializeValue(value: any) {
  return btoa(JSON.stringify({ value }));
}

export function getCookie(cname: string, cookieHeader?: string) {
  const name = `${cname}=`;
  const ca = cookieHeader ? cookieHeader.split(";") : document.cookie.split(";");
  for (const c of ca) {
    let trimmedCookie = c.trim();
    if (trimmedCookie.indexOf(name) === 0) {
      return trimmedCookie.substring(name.length, trimmedCookie.length);
    }
  }
  return "";
}
