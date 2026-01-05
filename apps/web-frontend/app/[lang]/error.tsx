"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  const { lang } = useLanguage();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold text-ink-900">
        {lang === "ar" ? "حدث خطأ غير متوقع" : "Something went wrong"}
      </h1>
      <p className="text-sm text-ink-500">
        {lang === "ar"
          ? "حاول إعادة المحاولة أو العودة للصفحة الرئيسية."
          : "Try again or return to the homepage."}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={reset}>
          {lang === "ar" ? "إعادة المحاولة" : "Try again"}
        </Button>
        <Link href={`/${lang}`}>
          <Button variant="ghost">
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
