import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { getDemoApplications } from "@/lib/api/demo-data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "applications",
    path: "/me/applications"
  });
}

const statusMap: Record<
  string,
  { ar: string; en: string; variant: "info" | "success" | "warning" }
> = {
  new: { ar: "جديد", en: "New", variant: "info" },
  review: { ar: "قيد المراجعة", en: "In review", variant: "warning" },
  interview: { ar: "مقابلة", en: "Interview", variant: "success" },
  offer: { ar: "عرض", en: "Offer", variant: "success" },
  rejected: { ar: "مرفوض", en: "Rejected", variant: "warning" }
};

export default function ApplicationsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const applications = getDemoApplications(params.lang);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "طلباتي" : "My applications"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "تابع حالة الطلبات الحالية بسهولة."
            : "Track the status of your applications."}
        </p>
      </div>
      <div className="grid gap-4">
        {applications.map((application) => {
          const status = statusMap[application.status];
          return (
            <Card key={application.id} className="p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm text-ink-500">
                    {application.company}
                  </div>
                  <div className="text-base font-semibold text-ink-900">
                    {application.jobTitle}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={status.variant}>
                    {isAr ? status.ar : status.en}
                  </Badge>
                  <span className="text-xs text-ink-400">
                    {application.date}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
