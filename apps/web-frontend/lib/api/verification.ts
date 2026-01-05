import { apiPost } from "@/lib/api/client";

export async function uploadVerificationDocument(payload: {
  type: string;
  fileName: string;
}) {
  return apiPost("/verify/upload", payload, () => ({
    ok: true
  }));
}
