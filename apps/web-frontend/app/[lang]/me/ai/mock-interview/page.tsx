import { Card } from "@/components/ui/card";
import { MockInterview } from "@/components/me/MockInterview";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "mockInterview",
    path: "/me/ai/mock-interview"
  });
}

export default function MockInterviewPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "مقابلة تجريبية بالذكاء الاصطناعي" : "AI Mock Interview"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "تمرّن على الأسئلة وتلقّ تغذية راجعة."
            : "Practice questions and get feedback."}
        </p>
      </div>
      <Card className="p-6">
        <MockInterview />
      </Card>
    </div>
  );
}
