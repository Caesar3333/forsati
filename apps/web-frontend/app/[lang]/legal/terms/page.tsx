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
    key: "legalTerms",
    path: "/legal/terms"
  });
}

export default function LegalTermsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const content = legalContent.terms[params.lang];
  const title = params.lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions";
  return <LegalPage title={title} intro={content.intro} sections={content.sections} />;
}
