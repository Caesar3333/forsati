import type { JobType } from "@/lib/api/types";

const typeLabels: Record<JobType, { ar: string; en: string }> = {
  "full-time": { ar: "دوام كامل", en: "Full-time" },
  "part-time": { ar: "دوام جزئي", en: "Part-time" },
  contract: { ar: "تعاقد", en: "Contract" },
  remote: { ar: "عن بعد", en: "Remote" }
};

export function formatJobType(type: JobType, lang: "ar" | "en") {
  const label = typeLabels[type];
  return lang === "ar" ? label.ar : label.en;
}
