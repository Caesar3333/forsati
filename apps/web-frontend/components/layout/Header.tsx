"use client";

import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";
import { useLanguage, useTranslations } from "@/components/i18n/LanguageProvider";
import { Logo } from "@/components/shared/Logo";
import { SearchBar } from "@/components/shared/SearchBar";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { Button } from "@/components/ui/button";

export function Header() {
  const { lang } = useLanguage();
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Logo />
          <nav className="hidden items-center gap-4 text-sm text-ink-600 lg:flex">
            <Link href={`/${lang}/jobs`} className="hover:text-brand-600">
              {t("nav.jobs")}
            </Link>
            <Link
              href={`/${lang}/companies/demo`}
              className="hover:text-brand-600"
            >
              {t("nav.companies")}
            </Link>
            <Link href={`/${lang}/me/ai/cv-analyzer`} className="hover:text-brand-600">
              {t("nav.ai")}
            </Link>
            <Link
              href={`/${lang}/recruiter/dashboard`}
              className="flex items-center gap-1 text-ink-700 hover:text-brand-600"
            >
              <Sparkles className="h-4 w-4 text-brand-500" />
              {t("nav.recruiter")}
            </Link>
          </nav>
        </div>
        <div className="hidden flex-1 justify-center lg:flex">
          <SearchBar />
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <Link href={`/${lang}/login`}>
            <Button variant="ghost" size="sm">
              {t("nav.login")}
            </Button>
          </Link>
          <Link href={`/${lang}/register`} className="hidden sm:block">
            <Button size="sm">{t("nav.register")}</Button>
          </Link>
          <button className="rounded-full border border-ink-200 p-2 text-ink-600 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
