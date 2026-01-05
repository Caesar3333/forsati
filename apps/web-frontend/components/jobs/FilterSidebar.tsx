"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function FilterSidebar() {
  const params = useSearchParams();
  const router = useRouter();
  const { lang } = useLanguage();
  const [query, setQuery] = useState(params.get("q") || "");
  const [type, setType] = useState(params.get("type") || "");
  const [level, setLevel] = useState(params.get("level") || "");
  const [city, setCity] = useState(params.get("city") || "");
  const [category, setCategory] = useState(params.get("category") || "");

  const applyFilters = () => {
    const nextParams = new URLSearchParams();
    if (query) nextParams.set("q", query);
    if (type) nextParams.set("type", type);
    if (level) nextParams.set("level", level);
    if (city) nextParams.set("city", city);
    if (category) nextParams.set("category", category);
    router.push(`/${lang}/jobs?${nextParams.toString()}`);
  };

  const clearFilters = () => {
    setQuery("");
    setType("");
    setLevel("");
    setCity("");
    setCategory("");
    router.push(`/${lang}/jobs`);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-ink-100 bg-white/80 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
        <SlidersHorizontal className="h-4 w-4 text-brand-500" />
        {lang === "ar" ? "تصفية النتائج" : "Filter results"}
      </div>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={lang === "ar" ? "كلمة مفتاحية" : "Keyword"}
      />
      <select
        value={type}
        onChange={(event) => setType(event.target.value)}
        className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-700"
      >
        <option value="">{lang === "ar" ? "نوع العمل" : "Job type"}</option>
        <option value="full-time">{lang === "ar" ? "دوام كامل" : "Full-time"}</option>
        <option value="part-time">{lang === "ar" ? "جزئي" : "Part-time"}</option>
        <option value="remote">{lang === "ar" ? "عن بعد" : "Remote"}</option>
        <option value="contract">{lang === "ar" ? "تعاقد" : "Contract"}</option>
      </select>
      <select
        value={level}
        onChange={(event) => setLevel(event.target.value)}
        className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-700"
      >
        <option value="">{lang === "ar" ? "المستوى" : "Level"}</option>
        {lang === "ar" ? (
          <>
            <option value="مبتدئ">مبتدئ</option>
            <option value="متوسط">متوسط</option>
            <option value="متقدم">متقدم</option>
          </>
        ) : (
          <>
            <option value="entry">Entry</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </>
        )}
      </select>
      <Input
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder={lang === "ar" ? "المدينة" : "City"}
      />
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-700"
      >
        <option value="">
          {lang === "ar" ? "المجال" : "Category"}
        </option>
        {lang === "ar" ? (
          <>
            <option value="وظائف">وظائف</option>
            <option value="تدريب">تدريب</option>
            <option value="تطوع">تطوع</option>
            <option value="أعمال حرة">أعمال حرة</option>
          </>
        ) : (
          <>
            <option value="Jobs">Jobs</option>
            <option value="Training">Training</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Freelance">Freelance</option>
          </>
        )}
      </select>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={applyFilters}>
          {lang === "ar" ? "تطبيق" : "Apply"}
        </Button>
        <Button size="sm" variant="ghost" onClick={clearFilters}>
          {lang === "ar" ? "مسح" : "Clear"}
        </Button>
      </div>
    </div>
  );
}
