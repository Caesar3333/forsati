import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    path: "/admin/settings/seo"
  });
}

export default function AdminSeoSettingsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "تهيئة SEO" : "SEO configuration"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "تحسين العناوين والوصف للموقع."
            : "Manage site metadata and indexing."}
        </p>
      </div>
      <Card className="p-6 space-y-4">
        <div>
          <label className="text-xs text-ink-500">
            {isAr ? "عنوان الموقع" : "Site title"}
          </label>
          <Input defaultValue="Forsati | فرصتي" />
        </div>
        <div>
          <label className="text-xs text-ink-500">
            {isAr ? "الوصف" : "Description"}
          </label>
          <Textarea defaultValue="Career and opportunity platform for the Arabic market." />
        </div>
        <div>
          <label className="text-xs text-ink-500">
            {isAr ? "الكلمات المفتاحية" : "Keywords"}
          </label>
          <Input defaultValue="jobs, internships, scholarships, volunteering" />
        </div>
        <Button>{isAr ? "حفظ" : "Save"}</Button>
      </Card>
    </div>
  );
}
