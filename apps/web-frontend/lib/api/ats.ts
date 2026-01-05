import { apiPost } from "@/lib/api/client";

export async function scoreAts(payload: { text: string }) {
  return apiPost("/ats/score", payload, () => ({
    score: 78,
    tips: [
      "أضف كلمات مفتاحية مرتبطة بالمسمى الوظيفي.",
      "احرص على تنسيق واضح ومتسق.",
      "اذكر التقنيات والأدوات بشكل صريح."
    ]
  }));
}
