import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "adminSettings",
    path: "/admin/settings/languages"
  });
}

export default function AdminLanguagesPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const languages = [
    { name: "English", code: "en", default: true },
    { name: "Arabic", code: "ar", default: false },
    { name: "French", code: "fr", default: false }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">
            {isAr ? "إدارة اللغات" : "Language manager"}
          </h1>
          <p className="text-sm text-ink-500">
            {isAr
              ? "إضافة لغات وترجمات جديدة."
              : "Add languages and translation keys."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            {isAr ? "إضافة لغة" : "Add new"}
          </Button>
          <Button size="sm">{isAr ? "الكلمات المفتاحية" : "Keywords"}</Button>
        </div>
      </div>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-indigo-500/90 px-4 py-3 text-xs font-semibold text-white">
          <div>{isAr ? "اللغة" : "Language"}</div>
          <div>{isAr ? "الرمز" : "Code"}</div>
          <div className="text-end">{isAr ? "الإجراء" : "Actions"}</div>
        </div>
        {languages.map((language) => (
          <div
            key={language.code}
            className="grid grid-cols-[1.5fr_1fr_1fr] items-center border-t border-ink-100 px-4 py-3 text-sm"
          >
            <div className="flex items-center gap-2">
              <span>{language.name}</span>
              {language.default ? (
                <Badge variant="success">{isAr ? "افتراضي" : "Default"}</Badge>
              ) : null}
            </div>
            <div className="text-ink-500">{language.code}</div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                {isAr ? "ترجمة" : "Translate"}
              </Button>
              <Button variant="ghost" size="sm">
                {isAr ? "تعديل" : "Edit"}
              </Button>
              <Button variant="ghost" size="sm">
                {isAr ? "حذف" : "Remove"}
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
