"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage, useTranslations } from "@/components/i18n/LanguageProvider";

export function Logo() {
  const { lang } = useLanguage();
  const t = useTranslations();
  const src = lang === "ar" ? "/brand/forsati/logo-ar.png" : "/brand/forsati/logo-en.png";
  const primary = lang === "ar" ? t("brand.nameAr") : t("brand.nameEn");
  const secondary = lang === "ar" ? t("brand.nameEn") : t("brand.nameAr");

  return (
    <Link href={`/${lang}`} className="flex items-center gap-3">
      <Image
        src={src}
        alt={t("brand.logoAlt")}
        width={120}
        height={40}
        className="h-10 w-auto"
        priority
      />
      <div className="leading-tight">
        <span className="block text-xs text-ink-500">{secondary}</span>
        <span className="block text-base font-semibold text-ink-900">
          {primary}
        </span>
      </div>
    </Link>
  );
}
