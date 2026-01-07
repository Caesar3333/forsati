import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({ lang: params.lang, key: "pricing", path: "/pricing" });
}

export default function PricingPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const plans = [
    {
      name: isAr ? "مجاني" : "Free",
      price: isAr ? "0" : "0",
      period: isAr ? "شهريا" : "monthly",
      badge: isAr ? "البداية" : "Starter",
      cta: isAr ? "ابدأ مجانا" : "Start free",
      features: isAr
        ? ["10 فرص شهريا", "سيرة ذاتية واحدة", "5 طلبات AI"]
        : ["10 opportunities / month", "1 resume", "5 AI requests"]
    },
    {
      name: isAr ? "الانطلاقة" : "Growth",
      price: "29",
      period: isAr ? "شهريا" : "monthly",
      badge: isAr ? "الأكثر طلبا" : "Most popular",
      cta: isAr ? "اشترك الآن" : "Subscribe",
      features: isAr
        ? ["50 فرصة شهريا", "5 سير ذاتية", "50 طلب AI", "تواصل مع المدربين"]
        : ["50 opportunities / month", "5 resumes", "50 AI requests", "Coach access"]
    },
    {
      name: isAr ? "الاحتراف" : "Elite",
      price: "99",
      period: isAr ? "شهريا" : "monthly",
      badge: isAr ? "للشركات" : "Teams",
      cta: isAr ? "تواصل معنا" : "Contact sales",
      features: isAr
        ? ["فرص غير محدودة", "سير متعددة", "دعم أولوية", "لوحة فرق"]
        : ["Unlimited opportunities", "Multiple resumes", "Priority support", "Team dashboard"]
    }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 lg:px-8">
      <SectionHeading
        title={isAr ? "خطط مرنة تناسب احتياجاتك" : "Plans that fit your needs"}
        subtitle={
          isAr
            ? "اختر الخطة المناسبة لمسارك المهني أو لفريق التوظيف."
            : "Choose a plan for your career journey or hiring team."
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="space-y-5 p-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-ink-900">{plan.name}</div>
              <Badge variant="info">{plan.badge}</Badge>
            </div>
            <div className="text-3xl font-semibold text-ink-900">
              {plan.price}
              <span className="text-sm text-ink-500"> / {plan.period}</span>
            </div>
            <ul className="space-y-2 text-sm text-ink-600 list-pad">
              {plan.features.map((feature) => (
                <li key={feature} className="list-disc">
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full" variant={plan.name === "Elite" ? "outline" : "default"}>
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm text-ink-500">
              {isAr ? "الاستخدام الشهري الحالي" : "Current monthly usage"}
            </div>
            <div className="text-2xl font-semibold text-ink-900">Free</div>
          </div>
          <Link
            href={`/${params.lang}/app/seeker/dashboard`}
            className="text-sm font-semibold text-brand-600"
          >
            {isAr ? "عرض لوحة الاستخدام" : "View usage dashboard"}
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { label: isAr ? "طلبات التقديم" : "Applications", value: "2/10" },
            { label: isAr ? "السير الذاتية" : "Resumes", value: "1/1" },
            { label: isAr ? "طلبات AI" : "AI Requests", value: "1/5" }
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-ink-100 bg-white p-4">
              <div className="text-sm text-ink-500">{stat.label}</div>
              <div className="text-xl font-semibold text-ink-900">{stat.value}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
