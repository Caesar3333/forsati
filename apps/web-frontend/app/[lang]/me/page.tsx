import Link from "next/link";
import { FileText, Sparkles, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/StatCard";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({ lang: params.lang, key: "profile", path: "/me" });
}

export default function ProfilePage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm text-ink-500">
              {isAr ? "مرحبا، ليان" : "Welcome, Layan"}
            </div>
            <h1 className="text-2xl font-semibold text-ink-900">
              {isAr ? "ملفي الشخصي" : "My profile"}
            </h1>
            <p className="mt-2 text-sm text-ink-500">
              {isAr
                ? "حدّث بياناتك وتابع تقدمك الوظيفي."
                : "Keep your profile updated and track your progress."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/${params.lang}/me/cv`}>
              <Button variant="outline" size="sm">
                {isAr ? "تحديث السيرة" : "Update CV"}
              </Button>
            </Link>
            <Link href={`/${params.lang}/me/ai/cv-analyzer`}>
              <Button size="sm">
                {isAr ? "تحليل السيرة" : "Analyze CV"}
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label={isAr ? "طلبات قيد المراجعة" : "Applications in review"}
          value="4"
          helper={isAr ? "هذا الشهر" : "This month"}
        />
        <StatCard
          label={isAr ? "فرص محفوظة" : "Saved roles"}
          value="9"
          helper={isAr ? "للمتابعة" : "To revisit"}
          accent="bg-ink-900"
        />
        <StatCard
          label={isAr ? "نسبة اكتمال الملف" : "Profile completion"}
          value="72%"
          helper={isAr ? "أكمل باقي الأقسام" : "Complete remaining sections"}
          accent="bg-emerald-500"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-ink-900">
            {isAr ? "إرشادات سريعة" : "Quick tips"}
          </h2>
          <div className="mt-4 space-y-4">
            {[
              {
                title: isAr ? "ارفع وثائق التحقق" : "Upload verification docs",
                icon: ShieldCheck
              },
              {
                title: isAr ? "تدرّب على المقابلة" : "Practice interviews",
                icon: Sparkles
              },
              {
                title: isAr ? "حدّث ملخصك" : "Refresh your summary",
                icon: FileText
              }
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-2 text-sm text-ink-700">
                  <item.icon className="h-4 w-4 text-brand-500" />
                  {item.title}
                </div>
                <Badge variant="info">
                  {isAr ? "مستحسن" : "Recommended"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-ink-900">
            {isAr ? "ملخص المهارات" : "Skill summary"}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Figma", "UX Research", "React", "Analytics", "Leadership"].map(
              (skill) => (
                <Badge key={skill}>{skill}</Badge>
              )
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
