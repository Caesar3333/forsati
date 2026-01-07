"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";

export function LanguageSwitch() {
  const { lang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nextLang = lang === "ar" ? "en" : "ar";

  const handleSwitch = () => {
    const hasLocale = /^\/(ar|en)(\/|$)/.test(pathname);
    const nextPath = hasLocale
      ? pathname.replace(/^\/(ar|en)/, `/${nextLang}`)
      : `/${nextLang}${pathname}`;
    const query = searchParams.toString();
    const withQuery = query ? `${nextPath}?${query}` : nextPath;
    router.push(withQuery.startsWith("/") ? withQuery : `/${nextLang}`);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleSwitch}>
      {lang === "ar" ? "EN" : "عربي"}
    </Button>
  );
}
