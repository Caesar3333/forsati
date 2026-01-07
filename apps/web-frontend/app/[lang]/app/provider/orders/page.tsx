import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";

export default function ProviderOrdersPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const orders = [
    { id: "#1042", service: "CV Review", status: "Requested" },
    { id: "#1040", service: "Interview Prep", status: "In progress" },
    { id: "#1033", service: "CV Review", status: "Completed" }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "طلبات الخدمات" : "Service orders"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "تابع الطلبات الواردة وحدث الحالة."
            : "Track incoming requests and update status."}
        </p>
      </div>
      <div className="space-y-3">
        {orders.map((order) => (
          <Card key={order.id} className="flex items-center justify-between p-5">
            <div>
              <div className="text-sm font-semibold text-ink-900">
                {order.id} · {order.service}
              </div>
              <div className="text-xs text-ink-500">
                {isAr ? "عميل جديد" : "New requester"}
              </div>
            </div>
            <Badge variant="info">{order.status}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
