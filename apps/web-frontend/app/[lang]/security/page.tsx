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
    key: "security",
    path: "/security"
  });
}

export default function SecurityPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const content = legalContent.security[params.lang];
  const title = params.lang === "ar" ? "الأمن" : "Security";
  return <LegalPage title={title} intro={content.intro} sections={content.sections} />;
}
