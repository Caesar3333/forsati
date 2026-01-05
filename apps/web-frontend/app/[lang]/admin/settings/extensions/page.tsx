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
    key: "adminSettings",
    path: "/admin/settings/extensions"
  });
}

export default function AdminExtensionsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const extensions = [
    { name: "Custom Captcha", status: "enabled" },
    { name: "Google Analytics", status: "disabled" },
    { name: "Recaptcha v2", status: "disabled" },
    { name: "Live Chat", status: "disabled" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">
            {isAr ? "الملحقات" : "Extensions"}
          </h1>
          <p className="text-sm text-ink-500">
            {isAr
              ? "إدارة الإضافات والميزات الإضافية."
              : "Manage add-ons and integrations."}
          </p>
        </div>
        <Button variant="outline" size="sm">
          {isAr ? "إضافة ملحق" : "Add extension"}
        </Button>
      </div>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-indigo-500/90 px-4 py-3 text-xs font-semibold text-white">
          <div>{isAr ? "الملحق" : "Extension"}</div>
          <div>{isAr ? "الحالة" : "Status"}</div>
          <div className="text-end">{isAr ? "الإجراء" : "Action"}</div>
        </div>
        {extensions.map((extension) => (
          <div
            key={extension.name}
            className="grid grid-cols-[1.5fr_1fr_1fr] items-center border-t border-ink-100 px-4 py-3 text-sm"
          >
            <div>{extension.name}</div>
            <div>
              <Badge variant={extension.status === "enabled" ? "success" : "warning"}>
                {extension.status === "enabled"
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
                {isAr ? "تهيئة" : "Configure"}
              </Button>
              <Button variant="ghost" size="sm">
                {extension.status === "enabled"
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
