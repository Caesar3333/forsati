import { Card } from "@/components/ui/card";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";

export default function AdminContentPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const sections = [
    isAr ? "الصفحة الرئيسية" : "Home page",
    isAr ? "المدونة" : "Blog",
    isAr ? "الأسئلة الشائعة" : "FAQ",
    isAr ? "الصفحات القانونية" : "Legal pages",
    isAr ? "صفحة التواصل" : "Contact page"
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "إدارة المحتوى" : "Content management"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "عدّل الأقسام الرئيسية في واجهة فرصتي."
            : "Update the main content sections for Forsati."}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section} className="p-5">
            <div className="text-sm font-semibold text-ink-900">{section}</div>
            <div className="text-xs text-ink-500">
              {isAr ? "تحديث المحتوى والنصوص." : "Edit copy and settings."}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
