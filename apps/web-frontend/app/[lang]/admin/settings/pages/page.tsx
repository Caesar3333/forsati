import { Card } from "@/components/ui/card";
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
    path: "/admin/settings/pages"
  });
}

export default function AdminPagesPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const pages = [
    { name: "Home", slug: "/" },
    { name: "Blog", slug: "blog" },
    { name: "Contact", slug: "contact" },
    { name: "Pricing", slug: "pricing" },
    { name: "FAQ", slug: "faq" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">
            {isAr ? "إدارة الصفحات" : "Manage pages"}
          </h1>
          <p className="text-sm text-ink-500">
            {isAr
              ? "تحرير الصفحات الثابتة وإعدادات SEO."
              : "Edit static pages and SEO settings."}
          </p>
        </div>
        <Button variant="outline" size="sm">
          {isAr ? "إضافة صفحة" : "Add new"}
        </Button>
      </div>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-indigo-500/90 px-4 py-3 text-xs font-semibold text-white">
          <div>{isAr ? "الاسم" : "Name"}</div>
          <div>{isAr ? "المسار" : "Slug"}</div>
          <div className="text-end">{isAr ? "الإجراء" : "Action"}</div>
        </div>
        {pages.map((page) => (
          <div
            key={page.slug}
            className="grid grid-cols-[1.5fr_1fr_1fr] items-center border-t border-ink-100 px-4 py-3 text-sm"
          >
            <div>{page.name}</div>
            <div className="text-ink-500">{page.slug}</div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                {isAr ? "تهيئة SEO" : "SEO"}
              </Button>
              <Button variant="ghost" size="sm">
                {isAr ? "تعديل" : "Edit"}
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
