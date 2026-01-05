import { apiGet, apiPost } from "@/lib/api/client";
import type { Job } from "@/lib/api/types";
import { getDemoJobs } from "@/lib/api/demo-data";

type SearchParams = {
  q?: string;
  type?: string;
  level?: string;
  city?: string;
  category?: string;
  page?: number;
};

const PAGE_SIZE = 5;

export async function searchOpportunities(
  lang: "ar" | "en",
  params: SearchParams
) {
  const fallback = () => getDemoJobs(lang);
  const result = await apiGet<Job[]>("/opportunities/search", fallback);
  const query = (params.q || "").toLowerCase();
  const type = params.type?.toLowerCase();
  const level = params.level?.toLowerCase();
  const city = params.city?.toLowerCase();
  const category = params.category?.toLowerCase();

  const filtered = result.data.filter((job) => {
    const matchesQuery =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query);
    const matchesType = !type || job.type === type;
    const matchesLevel =
      !level || job.level.toLowerCase().includes(level);
    const matchesCity =
      !city || job.location.toLowerCase().includes(city);
    const matchesCategory =
      !category || job.category.toLowerCase().includes(category);
    return (
      matchesQuery && matchesType && matchesLevel && matchesCity && matchesCategory
    );
  });

  const currentPage = params.page || 1;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  return {
    data: pageItems,
    total: filtered.length,
    totalPages,
    page: currentPage,
    demo: result.demo
  };
}

export async function getOpportunity(lang: "ar" | "en", id: string) {
  const fallback = () => getDemoJobs(lang).find((job) => job.id === id);
  const result = await apiGet<Job | undefined>(`/opportunities/${id}`, fallback);
  return { job: result.data, demo: result.demo };
}

export async function applyToOpportunity(id: string, body: unknown) {
  return apiPost(`/opportunities/${id}/apply`, body, () => ({
    ok: true
  }));
}
