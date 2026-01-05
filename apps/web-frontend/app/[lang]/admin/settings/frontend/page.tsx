import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "adminSettings",
    path: "/admin/settings/frontend"
  });
}

export default function AdminFrontendContentPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const items = [
    isAr ? "البانر الرئيسي" : "Banner section",
    isAr ? "قسم المدونة" : "Blog section",
    isAr ? "قسم المميزات" : "Feature section",
    isAr ? "قسم الأسئلة الشائعة" : "FAQ section",
    isAr ? "قسم الشركاء" : "Partner section",
    isAr ? "قسم التسعير" : "Pricing section",
    isAr ? "قسم الشهادات" : "Testimonials",
    isAr ? "محتوى التذييل" : "Footer content"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "إدارة محتوى الواجهة" : "Manage frontend content"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "تحكم في أقسام المحتوى للصفحات العامة."
            : "Control public-facing content sections."}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Card key={item} className="flex items-center justify-between p-4">
            <div className="text-sm font-medium text-ink-800">{item}</div>
            <span className="rounded-full bg-ink-100 px-3 py-1 text-xs text-ink-500">
              {isAr ? "إعداد" : "Configure"}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
