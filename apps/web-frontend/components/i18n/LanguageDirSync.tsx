"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function LanguageDirSync() {
  const pathname = usePathname();

  useEffect(() => {
    const parts = pathname.split("/");
    const lang = parts[1] === "en" ? "en" : "ar";
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [pathname]);

  return null;
}
