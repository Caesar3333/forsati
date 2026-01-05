import { Card } from "@/components/ui/card";
import { CvAnalyzer } from "@/components/me/CvAnalyzer";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "cvAnalyzer",
    path: "/me/ai/cv-analyzer"
  });
}

export default function CvAnalyzerPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "تحليل السيرة بالذكاء الاصطناعي" : "AI CV Analyzer"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "احصل على تقييم سريع ونصائح عملية."
            : "Get a quick score and actionable feedback."}
        </p>
      </div>
      <Card className="p-6">
        <CvAnalyzer />
      </Card>
    </div>
  );
}
