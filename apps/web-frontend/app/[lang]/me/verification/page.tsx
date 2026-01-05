import { ShieldCheck, FileUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "verification",
    path: "/me/verification"
  });
}

export default function VerificationPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const docs = [
    {
      title: isAr ? "الهوية الوطنية" : "National ID",
      status: isAr ? "قيد المراجعة" : "In review",
      variant: "warning" as const
    },
    {
      title: isAr ? "خطاب تعريف" : "Employment letter",
      status: isAr ? "مطلوب" : "Required",
      variant: "info" as const
    },
    {
      title: isAr ? "شهادات" : "Certificates",
      status: isAr ? "مكتمل" : "Completed",
      variant: "success" as const
    }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "رفع وثائق التحقق" : "Verification upload"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "ارفع المستندات المطلوبة لإكمال التحقق."
            : "Upload required documents to complete verification."}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {docs.map((doc) => (
          <Card key={doc.title} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                <ShieldCheck className="h-4 w-4 text-brand-500" />
                {doc.title}
              </div>
              <Badge variant={doc.variant}>{doc.status}</Badge>
            </div>
            <div className="mt-4">
              <label className="flex items-center gap-2 text-sm text-ink-600">
                <FileUp className="h-4 w-4" />
                {isAr ? "اختر ملفًا" : "Choose a file"}
              </label>
              <input
                type="file"
                className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
