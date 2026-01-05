"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ForsatiNotificationIcon, ForsatiSearchIcon } from "@/components/icons/forsati-icons";
import { Input } from "@/components/ui/input";

export function AdminTopbar() {
  const { lang } = useLanguage();

  return (
    <div className="flex items-center justify-between border-b border-ink-100 bg-white px-6 py-4">
      <div className="relative w-full max-w-md">
        <ForsatiSearchIcon className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <Input
          placeholder={lang === "ar" ? "بحث سريع..." : "Search..."}
          className="ps-10"
        />
      </div>
      <div className="flex items-center gap-3 text-ink-500">
        <button className="rounded-full border border-ink-100 p-2">
          <ForsatiNotificationIcon className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-ink-100 px-3 py-1 text-sm">
          <span className="h-7 w-7 rounded-full bg-ink-100" />
          <span>{lang === "ar" ? "المدير" : "Admin"}</span>
        </div>
      </div>
    </div>
  );
}
