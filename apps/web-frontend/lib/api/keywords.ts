import { apiGet } from "@/lib/api/client";

export async function suggestKeywords(query: string) {
  return apiGet<string[]>(
    `/keywords/suggest?q=${encodeURIComponent(query)}`,
    () => ["UI/UX", "Product Design", "React", "Remote"]
  );
}
