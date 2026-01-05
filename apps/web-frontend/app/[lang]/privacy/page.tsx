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
    key: "privacy",
    path: "/privacy"
  });
}

export default function PrivacyPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const content = legalContent.privacy[params.lang];
  const title = params.lang === "ar" ? "سياسة الخصوصية" : "Privacy policy";
  return <LegalPage title={title} intro={content.intro} sections={content.sections} />;
}
