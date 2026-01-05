import Link from "next/link";

type PageProps = {
  params: { lang: string };
};

export default function SeekerDashboardPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "لوحة الباحث عن فرص",
        subtitle: "ملخص سريع عن طلباتك وأدوات الذكاء الاصطناعي.",
        matches: "فرص مناسبة",
        applications: "طلبات التقديم",
        interviews: "مقابلات قادمة",
        saved: "محفوظات",
        aiUsage: "استخدام الذكاء الاصطناعي",
        cv: "تحليل السيرة",
        interview: "المقابلة التجريبية",
        plan: "خطة الاشتراك",
        quick: "إجراءات سريعة",
        buildCv: "أنشئ سيرتك",
        mock: "ابدأ مقابلة",
        verify: "ارفع وثائق التحقق",
        recommendations: "فرص موصى بها",
        apply: "قدّم الآن",
      }
    : {
        title: "Job Seeker Dashboard",
        subtitle: "Quick view of your applications and AI tools.",
        matches: "Smart Matches",
        applications: "Applications",
        interviews: "Upcoming Interviews",
        saved: "Saved",
        aiUsage: "AI Usage",
        cv: "CV Analysis",
        interview: "Mock Interview",
        plan: "Plan Overview",
        quick: "Quick Actions",
        buildCv: "Build Your CV",
        mock: "Start Interview",
        verify: "Upload Verification",
        recommendations: "Recommended Opportunities",
        apply: "Apply Now",
      };

  const align = isArabic ? "text-right" : "text-left";

  const stats = [
    { label: t.matches, value: "24" },
    { label: t.applications, value: "8" },
    { label: t.interviews, value: "2" },
    { label: t.saved, value: "12" },
  ];

  const recommendations = isArabic
    ? [
        { title: "مصمم واجهات - دوام كامل", org: "شركة المدار" },
        { title: "محلل بيانات - برنامج تدريبي", org: "مركز الابتكار" },
        { title: "منسق محتوى - عمل حر", org: "مبادرة الإبداع" },
      ]
    : [
        { title: "UI Designer - Full Time", org: "Orbit Co." },
        { title: "Data Analyst - Training Program", org: "Innovation Center" },
        { title: "Content Coordinator - Freelance", org: "Creative Hub" },
      ];

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="space-y-6">
      <header className={`space-y-2 ${align}`}>
        <h1 className="text-2xl font-semibold text-slate-900">{t.title}</h1>
        <p className="text-sm text-slate-600">{t.subtitle}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm text-slate-500">{stat.label}</div>
            <div className="text-2xl font-semibold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{t.aiUsage}</div>
          <div className="space-y-4">
            <div>
              <div className={`mb-2 flex items-center justify-between text-sm ${align}`}>
                <span>{t.cv}</span>
                <span className="text-slate-500">3/5</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-amber-500" style={{ width: "60%" }} />
              </div>
            </div>
            <div>
              <div className={`mb-2 flex items-center justify-between text-sm ${align}`}>
                <span>{t.interview}</span>
                <span className="text-slate-500">1/3</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-amber-500" style={{ width: "33%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{t.plan}</div>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>{isArabic ? "الخطة الحالية" : "Current Plan"}</span>
              <span className="font-semibold text-slate-900">{isArabic ? "مجاني" : "Free"}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>{isArabic ? "طلبات التقديم" : "Applications"}</span>
                <span>2/10</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: "20%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>{isArabic ? "السير الذاتية" : "Resumes"}</span>
                <span>1/1</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-rose-500" style={{ width: "100%" }} />
              </div>
            </div>
            <button className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300">
              {isArabic ? "ترقية الخطة" : "Upgrade Plan"}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{t.quick}</div>
        <div className="grid gap-3 md:grid-cols-3">
          <Link
            href={`/${params.lang}/me/cv`}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-amber-300"
          >
            {t.buildCv}
          </Link>
          <Link
            href={`/${params.lang}/me/ai/mock-interview`}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-amber-300"
          >
            {t.mock}
          </Link>
          <Link
            href={`/${params.lang}/me/verification`}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-amber-300"
          >
            {t.verify}
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        <div className={`text-sm font-semibold text-slate-700 ${align}`}>{t.recommendations}</div>
        <div className="grid gap-3 md:grid-cols-3">
          {recommendations.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className={`text-sm font-semibold text-slate-900 ${align}`}>{item.title}</div>
              <div className={`text-xs text-slate-500 ${align}`}>{item.org}</div>
              <button className="mt-3 w-full rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600">
                {t.apply}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
