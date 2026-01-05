import { FileUp, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CvBuilderForm } from "@/components/me/CvBuilderForm";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({ lang: params.lang, key: "cv", path: "/me/cv" });
}

export default function CvPage({ params }: { params: { lang: "ar" | "en" } }) {
  const isAr = params.lang === "ar";

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "بناء السيرة الذاتية" : "Resume builder"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "أنشئ سيرتك أو ارفع ملفًا جاهزًا."
            : "Create your CV or upload an existing file."}
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <CvBuilderForm />
        </Card>
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
              <Sparkles className="h-4 w-4 text-brand-500" />
              {isAr ? "اقتراحات تحسين" : "Smart suggestions"}
            </div>
            <ul className="mt-3 space-y-2 text-sm text-ink-500">
              <li>{isAr ? "أضف نتائج رقمية لخبراتك." : "Add metrics to your achievements."}</li>
              <li>{isAr ? "اختصر النبذة إلى 3 أسطر." : "Keep summary to 3 lines."}</li>
              <li>{isAr ? "رتّب المهارات حسب الأهمية." : "Order skills by priority."}</li>
            </ul>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
              <FileUp className="h-4 w-4 text-brand-500" />
              {isAr ? "حالة الملف" : "File status"}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="info">{isAr ? "آخر تحديث: اليوم" : "Updated: today"}</Badge>
              <Badge variant="success">{isAr ? "جاهز للتقديم" : "Ready to apply"}</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
