import Link from "next/link";
import { MailCheck } from "lucide-react";
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
    key: "checkEmail",
    path: "/check-email"
  });
}

export default function CheckEmailPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-4 py-10 lg:px-8">
      <Card className="mx-auto w-full max-w-md p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <MailCheck className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-ink-900">
          {isAr ? "تحقق من بريدك" : "Check your inbox"}
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          {isAr
            ? "أرسلنا لك رسالة تحقق أو استعادة، يرجى متابعة التعليمات."
            : "We sent you an email with next steps."}
        </p>
        <Link href={`/${params.lang}/login`} className="mt-5 inline-block">
          <Button variant="outline">
            {isAr ? "العودة لتسجيل الدخول" : "Back to sign in"}
          </Button>
        </Link>
      </Card>
    </div>
  );
}
