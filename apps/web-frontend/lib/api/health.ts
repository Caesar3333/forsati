import { apiGet } from "@/lib/api/client";

export async function getHealth() {
  return apiGet("/health", () => ({ status: "ok" }));
}
