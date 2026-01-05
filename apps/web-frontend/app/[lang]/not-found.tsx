"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function NotFound() {
  const { lang } = useLanguage();
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold text-ink-900">
        {lang === "ar" ? "الصفحة غير موجودة" : "Page not found"}
      </h1>
      <p className="text-sm text-ink-500">
        {lang === "ar"
          ? "لم نتمكن من العثور على الصفحة التي تبحث عنها."
          : "We could not find the page you are looking for."}
      </p>
      <Link href={`/${lang}`}>
        <Button>{lang === "ar" ? "العودة للرئيسية" : "Back to home"}</Button>
      </Link>
    </div>
  );
}
