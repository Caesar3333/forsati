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
    key: "cookies",
    path: "/cookies"
  });
}

export default function CookiesPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const content = legalContent.cookies[params.lang];
  const title = params.lang === "ar" ? "ملفات الارتباط" : "Cookie policy";
  return <LegalPage title={title} intro={content.intro} sections={content.sections} />;
}
