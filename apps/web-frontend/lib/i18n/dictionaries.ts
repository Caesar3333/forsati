import "server-only";

export type Locale = "ar" | "en";

const dictionaries = {
  ar: () => import("@/messages/ar.json").then((module) => module.default),
  en: () => import("@/messages/en.json").then((module) => module.default)
};

export const locales: Locale[] = ["ar", "en"];

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
