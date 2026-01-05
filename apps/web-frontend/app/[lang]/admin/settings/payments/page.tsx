import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "adminPayments",
    path: "/admin/settings/payments"
  });
}

export default function AdminPaymentsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const gateways = [
    { name: "PayTabs", currencies: 3, status: "enabled" },
    { name: "Stripe", currencies: 18, status: "enabled" },
    { name: "PayPal", currencies: 25, status: "disabled" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">
            {isAr ? "بوابات الدفع" : "Payment gateways"}
          </h1>
          <p className="text-sm text-ink-500">
            {isAr
              ? "تفعيل أو تعطيل بوابات الدفع."
              : "Enable or disable payment gateways."}
          </p>
        </div>
        <Button variant="outline" size="sm">
          {isAr ? "إضافة بوابة" : "Add gateway"}
        </Button>
      </div>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-indigo-500/90 px-4 py-3 text-xs font-semibold text-white">
          <div>{isAr ? "البوابة" : "Gateway"}</div>
          <div>{isAr ? "العملات" : "Currencies"}</div>
          <div>{isAr ? "الحالة" : "Status"}</div>
          <div className="text-end">{isAr ? "إجراء" : "Action"}</div>
        </div>
        {gateways.map((gateway) => (
          <div
            key={gateway.name}
            className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-t border-ink-100 px-4 py-3 text-sm"
          >
            <div>{gateway.name}</div>
            <div className="text-ink-500">{gateway.currencies}</div>
            <div>
              <Badge variant={gateway.status === "enabled" ? "success" : "warning"}>
                {gateway.status === "enabled"
                  ? isAr
                    ? "مفعل"
                    : "Enabled"
                  : isAr
                    ? "معطل"
                    : "Disabled"}
              </Badge>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                {isAr ? "تعديل" : "Edit"}
              </Button>
              <Button variant="ghost" size="sm">
                {gateway.status === "enabled"
                  ? isAr
                    ? "تعطيل"
                    : "Disable"
                  : isAr
                    ? "تفعيل"
                    : "Enable"}
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
