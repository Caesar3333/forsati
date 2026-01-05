import { aiPost } from "@/lib/api/client";

export async function analyzeCv(text: string) {
  return aiPost("/cv/analyze", { text }, () => ({
    score: 82,
    strengths: ["تنظيم جيد", "خبرة واضحة", "مهارات تقنية قوية"],
    improvements: [
      "أضف أمثلة رقمية للإنجازات",
      "اختصر القسم التعريفي",
      "رتب المهارات حسب الأولوية"
    ]
  }));
}

export async function getInterviewQuestions(role: string) {
  return aiPost("/interview/questions", { role }, () => ({
    questions: [
      "احكِ لنا عن مشروع تفتخر به ولماذا؟",
      "كيف تتعامل مع ضغط المواعيد النهائية؟",
      "ما هي أهم معايير الجودة لديك أثناء العمل؟"
    ]
  }));
}
