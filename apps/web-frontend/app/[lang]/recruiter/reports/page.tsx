import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "recruiterReports",
    path: "/recruiter/reports"
  });
}

export default function RecruiterReportsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const reports = [
    {
      id: "rep-1",
      title: isAr ? "بلاغ محتوى غير مناسب" : "Inappropriate content",
      status: isAr ? "قيد المراجعة" : "In review",
      variant: "warning" as const
    },
    {
      id: "rep-2",
      title: isAr ? "طلب احتيالي" : "Fraudulent application",
      status: isAr ? "تم الحل" : "Resolved",
      variant: "success" as const
    }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "البلاغات والتقارير" : "Reports"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "راجع البلاغات واتخذ الإجراءات اللازمة."
            : "Review reports and take action."}
        </p>
      </div>
      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                <AlertTriangle className="h-4 w-4 text-brand-500" />
                {report.title}
              </div>
              <Badge variant={report.variant}>{report.status}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
