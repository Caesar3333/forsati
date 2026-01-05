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
    key: "terms",
    path: "/terms"
  });
}

export default function TermsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const content = legalContent.terms[params.lang];
  const title = params.lang === "ar" ? "الشروط والأحكام" : "Terms of service";
  return <LegalPage title={title} intro={content.intro} sections={content.sections} />;
}
