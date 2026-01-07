"use client";

import { TriangleAlert } from "lucide-react";
import { useTranslations } from "@/components/i18n/LanguageProvider";

export function DemoModeBanner({ show }: { show: boolean }) {
  const t = useTranslations();
  const isDev = process.env.NODE_ENV === "development";
  if (!show || !isDev) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <div className="flex items-center gap-2 font-semibold">
        <TriangleAlert className="h-4 w-4" />
        {t("common.demoMode")}
      </div>
      <div className="text-xs text-amber-700">{t("common.demoModeDesc")}</div>
    </div>
  );
}
