"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { useLanguage, useTranslations } from "@/components/i18n/LanguageProvider";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  const { lang } = useLanguage();
  const t = useTranslations();

  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-ink-500">{t("footer.tagline")}</p>
        </div>
        <div className="space-y-2 text-sm text-ink-600">
          <div className="font-semibold text-ink-900">{t("footer.links")}</div>
          <Link href={`/${lang}/pricing`} className="block hover:text-brand-600">
            {t("footer.pricing")}
          </Link>
          <Link href={`/${lang}/faq`} className="block hover:text-brand-600">
            {t("footer.faq")}
          </Link>
          <Link href={`/${lang}/blog`} className="block hover:text-brand-600">
            {t("footer.blog")}
          </Link>
          <Link href={`/${lang}/contact`} className="block hover:text-brand-600">
            {t("footer.contact")}
          </Link>
        </div>
        <div className="space-y-4 text-sm text-ink-600">
          <div className="space-y-2">
            <div className="font-semibold text-ink-900">{t("footer.legal")}</div>
            <Link href={`/${lang}/legal/terms`} className="block hover:text-brand-600">
              {t("footer.terms")}
            </Link>
            <Link href={`/${lang}/legal/privacy`} className="block hover:text-brand-600">
              {t("footer.privacy")}
            </Link>
            <Link
              href={`/${lang}/legal/ai-disclaimer`}
              className="block hover:text-brand-600"
            >
              {t("footer.aiDisclaimer")}
            </Link>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-ink-900">{t("footer.contact")}</div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-500" />
              support@forsati.example
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-500" />
              +966 000 000 000
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-100 py-4 text-center text-xs text-ink-400">
        {t("footer.copyright")}
      </div>
    </footer>
  );
}
