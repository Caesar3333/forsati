import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";

export default function AdminProvidersPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const providers = [
    { name: "Rania Coach", status: "Pending" },
    { name: "HR Reviewers", status: "Approved" },
    { name: "Career Training Lab", status: "Pending" }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "اعتماد مقدمي الخدمات" : "Provider approvals"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "راجع الطلبات الجديدة واعتمد مقدمي الخدمات."
            : "Review provider requests and approvals."}
        </p>
      </div>
      <div className="space-y-3">
        {providers.map((provider) => (
          <Card key={provider.name} className="flex items-center justify-between p-5">
            <div className="text-sm font-semibold text-ink-900">
              {provider.name}
            </div>
            <Badge variant={provider.status === "Approved" ? "success" : "warning"}>
              {provider.status}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
