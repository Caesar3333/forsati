import { apiGet } from "@/lib/api/client";
import { getDemoCompanies } from "@/lib/api/demo-data";
import type { Company } from "@/lib/api/types";

export async function getCompany(lang: "ar" | "en", slug: string) {
  const fallback = () =>
    getDemoCompanies(lang).find((company) => company.slug === slug);
  const result = await apiGet<Company | undefined>(
    `/companies/${slug}`,
    fallback
  );
  return { company: result.data, demo: result.demo };
}
