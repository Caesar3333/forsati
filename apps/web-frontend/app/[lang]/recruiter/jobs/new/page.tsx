import { Card } from "@/components/ui/card";
import { NewJobForm } from "@/components/recruiter/NewJobForm";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "recruiterNewJob",
    path: "/recruiter/jobs/new"
  });
}

export default function RecruiterNewJobPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "إنشاء فرصة جديدة" : "Post a new job"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "اكتب تفاصيل الفرصة لتصل لأفضل المرشحين."
            : "Provide details to reach the best candidates."}
        </p>
      </div>
      <Card className="p-6">
        <NewJobForm />
      </Card>
    </div>
  );
}
