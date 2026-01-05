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
    path: "/admin/settings/branding"
  });
}

export default function AdminBrandingPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "الشعار والأيقونة" : "Logo and favicon"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "قم برفع شعار المنصة والأيقونة."
            : "Upload platform logo and favicon."}
        </p>
      </div>
      <Card className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-ink-900">
              {isAr ? "الشعار" : "Logo"}
            </div>
            <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50">
              {isAr ? "اسحب الشعار هنا" : "Drop logo here"}
            </div>
            <div className="text-xs text-ink-400">
              PNG, JPG, SVG
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-sm font-semibold text-ink-900">
              {isAr ? "الأيقونة" : "Favicon"}
            </div>
            <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50">
              {isAr ? "اسحب الأيقونة هنا" : "Drop favicon here"}
            </div>
            <div className="text-xs text-ink-400">
              PNG, JPG, ICO
            </div>
          </div>
        </div>
        <Button className="mt-6">{isAr ? "حفظ" : "Save changes"}</Button>
      </Card>
    </div>
  );
}
