import { apiGet } from "@/lib/api/client";
import { getDemoApplications } from "@/lib/api/demo-data";
import type { Application } from "@/lib/api/types";

export async function getMyApplications(lang: "ar" | "en") {
  return apiGet<Application[]>("/applications/my", () =>
    getDemoApplications(lang)
  );
}
