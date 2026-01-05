import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
    path: "/admin/settings/general"
  });
}

export default function AdminGeneralSettingsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "الإعدادات العامة" : "General settings"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "بيانات الموقع الأساسية والعملات."
            : "Core site information and currency settings."}
        </p>
      </div>
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs text-ink-500">
              {isAr ? "اسم الموقع" : "Site title"}
            </label>
            <Input defaultValue="Forsati" />
          </div>
          <div>
            <label className="text-xs text-ink-500">
              {isAr ? "العملة" : "Currency"}
            </label>
            <Input defaultValue="SAR" />
          </div>
          <div>
            <label className="text-xs text-ink-500">
              {isAr ? "رمز العملة" : "Currency symbol"}
            </label>
            <Input defaultValue="ر.س" />
          </div>
          <div>
            <label className="text-xs text-ink-500">
              {isAr ? "المنطقة الزمنية" : "Timezone"}
            </label>
            <Input defaultValue="Asia/Riyadh" />
          </div>
        </div>
        <Button className="mt-6">{isAr ? "حفظ" : "Save"}</Button>
      </Card>
    </div>
  );
}
