import { LegalPage } from "@/components/legal/LegalPage";
import { legalContent } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({ lang: params.lang, key: "about", path: "/about" });
}

export default function AboutPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const content = legalContent.about[params.lang];
  const title = params.lang === "ar" ? "عن فرصتي" : "About Forsati";
  return <LegalPage title={title} intro={content.intro} sections={content.sections} />;
}
