import { ArrowRight, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/shared/StatCard";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "recruiterDashboard",
    path: "/recruiter/dashboard"
  });
}

export default function RecruiterDashboard({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const chartBars = [72, 55, 38, 60, 45, 80];

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "لوحة التوظيف" : "Recruiter dashboard"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "نظرة سريعة على أداء التوظيف."
            : "Quick overview of hiring performance."}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label={isAr ? "إجمالي الفرص" : "Total jobs"}
          value="24"
          helper={isAr ? "نشطة حاليًا" : "Currently active"}
        />
        <StatCard
          label={isAr ? "طلبات هذا الأسبوع" : "Weekly applications"}
          value="182"
          helper={isAr ? "زيادة 12%" : "+12% this week"}
          accent="bg-emerald-500"
        />
        <StatCard
          label={isAr ? "معدل القبول" : "Offer rate"}
          value="18%"
          helper={isAr ? "خلال 30 يومًا" : "Last 30 days"}
          accent="bg-ink-900"
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-ink-900">
              {isAr ? "تحليل النشاط" : "Activity analytics"}
            </div>
            <BarChart3 className="h-4 w-4 text-brand-500" />
          </div>
          <div className="mt-6 flex items-end gap-3">
            {chartBars.map((bar, index) => (
              <div key={`${bar}-${index}`} className="flex-1">
                <div
                  className="rounded-full bg-brand-500"
                  style={{ height: `${bar}px` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-ink-400">
            {isAr ? "آخر 6 أسابيع" : "Last 6 weeks"}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-semibold text-ink-900">
            {isAr ? "قائمة مختصرة" : "Shortlisted candidates"}
          </div>
          <div className="mt-4 space-y-3">
            {[
              { name: "ليان الزهراني", role: "مصممة UI/UX" },
              { name: "عمر القحطاني", role: "مهندس Frontend" },
              { name: "سارة علي", role: "محللة بيانات" }
            ].map((candidate) => (
              <div
                key={candidate.name}
                className="flex items-center justify-between rounded-2xl border border-ink-100 px-4 py-3"
              >
                <div>
                  <div className="text-sm font-semibold text-ink-900">
                    {candidate.name}
                  </div>
                  <div className="text-xs text-ink-500">
                    {candidate.role}
                  </div>
                </div>
                <Badge variant="success">
                  {isAr ? "مطابق" : "Match"}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-brand-600">
            {isAr ? "عرض الكل" : "View all"}{" "}
            <ArrowRight className="inline h-3 w-3 flip-rtl" />
          </div>
        </Card>
      </div>
    </div>
  );
}
