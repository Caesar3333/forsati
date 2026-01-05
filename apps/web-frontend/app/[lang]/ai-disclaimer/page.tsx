import { LegalPage } from "@/components/legal/LegalPage";
import { legalContent } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "aiDisclaimer",
    path: "/ai-disclaimer"
  });
}

export default function AiDisclaimerPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const content = legalContent.aiDisclaimer[params.lang];
  const title = params.lang === "ar" ? "تنبيه الذكاء الاصطناعي" : "AI disclaimer";
  return <LegalPage title={title} intro={content.intro} sections={content.sections} />;
}
