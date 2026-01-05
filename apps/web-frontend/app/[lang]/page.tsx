import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({ lang: params.lang, key: "home", path: "" });
}

export default function LandingPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const { lang } = params;
  const isAr = lang === "ar";

  return (
    <div>
      <section className="bg-mesh px-4 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs text-brand-600 shadow-soft">
              <Sparkles className="h-4 w-4" />
              {isAr
                ? "ذكاء اصطناعي يساعدك في التوظيف"
                : "AI tools that support your career"}
            </span>
            <h1 className="text-3xl font-semibold leading-tight text-ink-900 lg:text-5xl">
              {isAr
                ? "اعثر على فرصتك في ثوانٍ"
                : "Find the opportunity that fits you"}
            </h1>
            <p className="text-base text-ink-600 lg:text-lg">
              {isAr
                ? "منصة عربية متكاملة للوظائف، التدريب، التطوع والمنح مع أدوات ذكاء اصطناعي لدعم سيرتك ومسارك."
                : "An Arabic-first platform for jobs, training, volunteering, and grants with AI-powered career tools."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${lang}/jobs`}>
                <Button size="lg">
                  {isAr ? "ابدأ البحث" : "Start searching"}
                  <ArrowRight className="h-4 w-4 flip-rtl" />
                </Button>
              </Link>
              <Link href={`/${lang}/me/ai/cv-analyzer`}>
                <Button size="lg" variant="outline">
                  {isAr ? "حلّل سيرتك بالذكاء الاصطناعي" : "Analyze your CV"}
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-ink-500">
              <div>
                <div className="text-xl font-semibold text-ink-900">1200+</div>
                {isAr ? "فرصة نشطة" : "Active roles"}
              </div>
              <div>
                <div className="text-xl font-semibold text-ink-900">400+</div>
                {isAr ? "جهة موثوقة" : "Trusted companies"}
              </div>
              <div>
                <div className="text-xl font-semibold text-ink-900">98%</div>
                {isAr ? "رضا المستخدمين" : "User satisfaction"}
              </div>
            </div>
          </div>
          <div className="glass-card rounded-3xl p-6 shadow-card">
            <div className="space-y-4">
              <div className="text-sm text-ink-500">
                {isAr ? "لوحة فرص مميزة" : "Featured opportunities"}
              </div>
              {[
                {
                  title: isAr ? "مصمم تجربة مستخدم" : "UX Designer",
                  company: isAr ? "ستوديو الإبداع" : "Creative Studio"
                },
                {
                  title: isAr ? "مهندس Frontend" : "Frontend Engineer",
                  company: isAr ? "منصة نمو" : "Growth Platform"
                },
                {
                  title: isAr ? "كاتب محتوى مستقل" : "Freelance Writer",
                  company: isAr ? "وكالة سطوع" : "Glow Agency"
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white px-4 py-3"
                >
                  <div>
                    <div className="text-sm font-semibold text-ink-900">
                      {item.title}
                    </div>
                    <div className="text-xs text-ink-500">{item.company}</div>
                  </div>
                  <Link href={`/${lang}/jobs`} className="text-sm text-brand-600">
                    {isAr ? "قدّم الآن" : "Apply"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-4 py-16 lg:px-8">
        <SectionHeading
          title={isAr ? "اختر المسار المناسب لك" : "Choose your path"}
          subtitle={
            isAr
              ? "وظائف، تدريب، تطوع، منح، وأعمال حرة في مكان واحد."
              : "Jobs, training, volunteering, grants, and freelance work."
          }
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 fade-grid">
          {[
            { label: isAr ? "وظائف" : "Jobs", icon: Briefcase },
            { label: isAr ? "تدريب" : "Training", icon: GraduationCap },
            { label: isAr ? "تطوع" : "Volunteer", icon: HeartHandshake },
            { label: isAr ? "منح" : "Grants", icon: ShieldCheck },
            { label: isAr ? "أعمال حرة" : "Freelance", icon: Users }
          ].map((item) => (
            <Card
              key={item.label}
              className="flex flex-col items-start gap-3 p-5"
            >
              <div className="rounded-full bg-brand-100 p-3 text-brand-600">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="text-base font-semibold text-ink-900">
                {item.label}
              </div>
              <p className="text-xs text-ink-500">
                {isAr
                  ? "فرص منتقاة ومحدثة باستمرار."
                  : "Curated opportunities updated weekly."}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <SectionHeading
              title={isAr ? "الذكاء الاصطناعي يساعدك" : "AI at your service"}
              subtitle={
                isAr
                  ? "حلّل سيرتك وتدرّب على المقابلات قبل التقديم."
                  : "Analyze your CV and practice interviews before applying."
              }
            />
            <p className="text-sm text-ink-500">
              {isAr
                ? "أدوات مصممة لتمنحك وضوحًا أكبر في نقاط القوة وفرص التحسين."
                : "Tools built to highlight strengths and improvement areas."}
            </p>
            <Link href={`/${lang}/me/ai/mock-interview`}>
              <Button variant="outline">
                {isAr ? "ابدأ مقابلة تجريبية" : "Start mock interview"}
              </Button>
            </Link>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: isAr ? "محلل السيرة الذاتية" : "CV Analyzer",
                desc: isAr
                  ? "تقييم فوري ونصائح عملية."
                  : "Instant score and improvements."
              },
              {
                title: isAr ? "محاكي المقابلات" : "Interview Coach",
                desc: isAr
                  ? "أسئلة ذكية وتغذية راجعة."
                  : "Smart questions and feedback."
              }
            ].map((card) => (
              <Card key={card.title} className="p-5">
                <div className="text-base font-semibold text-ink-900">
                  {card.title}
                </div>
                <p className="text-sm text-ink-500">{card.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-4 py-16 lg:px-8">
        <SectionHeading
          title={isAr ? "مميزات منصتنا" : "Platform highlights"}
          subtitle={
            isAr
              ? "تصميم واضح، لوحات احترافية، وتجربة عربية كاملة."
              : "Clear design, professional dashboards, and Arabic-first UX."
          }
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: isAr ? "لوحات تحكم واضحة" : "Clean dashboards",
              desc: isAr
                ? "إحصاءات وبيانات منظمة."
                : "Readable stats and insights."
            },
            {
              title: isAr ? "فلاتر قوية" : "Powerful filters",
              desc: isAr
                ? "تصفية ذكية للفرص."
                : "Smart filtering for every search."
            },
            {
              title: isAr ? "تجربة RTL احترافية" : "RTL-ready",
              desc: isAr
                ? "واجهة عربية مصقولة."
                : "Polished Arabic-first layouts."
            },
            {
              title: isAr ? "سرعة وأداء" : "Fast performance",
              desc: isAr
                ? "تحميل سريع وتحسين SEO."
                : "Speed and SEO-friendly."
            }
          ].map((item) => (
            <Card key={item.title} className="p-5">
              <div className="text-base font-semibold text-ink-900">
                {item.title}
              </div>
              <p className="text-sm text-ink-500">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-ink-900 px-4 py-16 text-white lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
              {isAr
                ? "هل تبحث عن أفضل المواهب؟"
                : "Looking for top talent?"}
            </h2>
            <p className="text-sm text-white/70">
              {isAr
                ? "أنشئ لوحة توظيف احترافية وتتبع المتقدمين بسهولة."
                : "Build a professional hiring dashboard and track applicants."}
            </p>
          </div>
          <Link href={`/${lang}/recruiter/dashboard`}>
            <Button variant="secondary" size="lg">
              {isAr ? "اذهب إلى لوحة التوظيف" : "Go to recruiter hub"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
