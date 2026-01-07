import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({ lang: params.lang, key: "faq", path: "/faq" });
}

export default function FaqPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const faqs = [
    {
      q: isAr ? "كيف يعمل التقديم على الفرص؟" : "How does applying work?",
      a: isAr
        ? "اختَر الفرصة المناسبة، أرفق سيرتك، ثم تابع حالة الطلب من لوحة المتقدم."
        : "Pick an opportunity, submit your CV, and track status from your dashboard."
    },
    {
      q: isAr ? "هل أدوات الذكاء الاصطناعي مجانية؟" : "Are AI tools included?",
      a: isAr
        ? "تتوفر حصص مجانية محدودة ويمكنك الترقية لخطة أعلى عند الحاجة."
        : "Free monthly credits are included, with upgrades available anytime."
    },
    {
      q: isAr ? "كيف يتم اعتماد مقدمي الخدمات؟" : "How are providers verified?",
      a: isAr
        ? "تتم مراجعة الملفات يدويا قبل تفعيل الحسابات في سوق الخدمات."
        : "Provider profiles are reviewed manually before approval."
    },
    {
      q: isAr ? "هل يدعم النظام الشركات والفرق؟" : "Can teams use Forsati?",
      a: isAr
        ? "نعم، توجد لوحات للتوظيف وإدارة الفريق مع صلاحيات أساسية."
        : "Yes, recruiting dashboards and basic team roles are available."
    }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 lg:px-8">
      <SectionHeading
        title={isAr ? "الأسئلة الشائعة" : "Frequently asked questions"}
        subtitle={
          isAr
            ? "إجابات سريعة لأهم الاستفسارات."
            : "Quick answers to common questions."
        }
      />
      <div className="space-y-4">
        {faqs.map((item) => (
          <Card key={item.q} className="p-5">
            <h2 className="text-base font-semibold text-ink-900">{item.q}</h2>
            <p className="mt-2 text-sm text-ink-600">{item.a}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
