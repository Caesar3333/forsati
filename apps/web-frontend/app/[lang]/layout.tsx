import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { getDictionary, locales } from "@/lib/i18n/dictionaries";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: "ar" | "en" };
}) {
  const { lang } = params;
  if (!locales.includes(lang)) {
    notFound();
  }
  const dict = await getDictionary(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageProvider lang={lang} dir={dir} dict={dict}>
      <div lang={lang} dir={dir} className="min-h-screen bg-sand text-ink-900">
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
