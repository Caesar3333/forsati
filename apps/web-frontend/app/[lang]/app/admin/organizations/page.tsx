import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";

export default function AdminOrganizationsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const orgs = [
    { name: "Forsati Labs", status: "Verified" },
    { name: "Career Spark", status: "Pending" },
    { name: "Impact Hub", status: "Verified" }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "إدارة الجهات" : "Organizations"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "مراجعة الجهات والتحقق من بياناتها."
            : "Review organization profiles and status."}
        </p>
      </div>
      <div className="space-y-3">
        {orgs.map((org) => (
          <Card key={org.name} className="flex items-center justify-between p-5">
            <div className="text-sm font-semibold text-ink-900">{org.name}</div>
            <Badge variant={org.status === "Verified" ? "success" : "warning"}>
              {org.status}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
