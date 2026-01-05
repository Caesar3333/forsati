"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function Logo() {
  const { lang } = useLanguage();
  return (
    <Link href={`/${lang}`} className="flex items-center gap-2 font-semibold">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm text-white">
        ف
      </span>
      <span className="text-lg text-ink-900">
        <span className="block text-sm text-ink-500">Forsati</span>
        فرصتي
      </span>
    </Link>
  );
}
