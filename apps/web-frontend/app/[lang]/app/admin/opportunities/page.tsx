import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";

export default function AdminOpportunitiesPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const opportunities = [
    { title: "Frontend Engineer", status: "Pending" },
    { title: "STEM Scholarship", status: "Approved" },
    { title: "Community Volunteer", status: "Pending" }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "إدارة الفرص" : "Opportunities"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "اعتمد الفرص أو اطلب تعديلات قبل النشر."
            : "Approve or request changes before publishing."}
        </p>
      </div>
      <div className="space-y-3">
        {opportunities.map((opp) => (
          <Card key={opp.title} className="flex items-center justify-between p-5">
            <div className="text-sm font-semibold text-ink-900">{opp.title}</div>
            <Badge variant={opp.status === "Approved" ? "success" : "warning"}>
              {opp.status}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
