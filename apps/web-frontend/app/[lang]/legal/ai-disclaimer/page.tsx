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
    key: "legalAiDisclaimer",
    path: "/legal/ai-disclaimer"
  });
}

export default function LegalAiDisclaimerPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const content = legalContent.aiDisclaimer[params.lang];
  const title =
    params.lang === "ar" ? "إخلاء مسؤولية الذكاء الاصطناعي" : "AI Disclaimer";
  return <LegalPage title={title} intro={content.intro} sections={content.sections} />;
}
