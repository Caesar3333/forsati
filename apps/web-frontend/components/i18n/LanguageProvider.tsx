"use client";

import React, { createContext, useContext } from "react";

type Dictionary = Record<string, unknown>;

type LanguageContextValue = {
  lang: "ar" | "en";
  dir: "rtl" | "ltr";
  dict: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ar",
  dir: "rtl",
  dict: {}
});

export function LanguageProvider({
  lang,
  dir,
  dict,
  children
}: {
  lang: "ar" | "en";
  dir: "rtl" | "ltr";
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <LanguageContext.Provider value={{ lang, dir, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslations() {
  const { dict } = useLanguage();
  return (key: string, fallback?: string) => {
    const parts = key.split(".");
    let value: unknown = dict;
    for (const part of parts) {
      if (typeof value === "object" && value && part in value) {
        value = (value as Record<string, unknown>)[part];
      } else {
        value = undefined;
        break;
      }
    }
    if (typeof value === "string") {
      return value;
    }
    return fallback || key;
  };
}
