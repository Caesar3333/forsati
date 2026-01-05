type PageProps = {
  params: { lang: string };
};

export default function PricingPlansPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "إدارة الخطط والأسعار",
        subtitle: "راقب حدود الاستخدام وأنشئ خطط جديدة.",
        add: "إضافة خطة",
        current: "الحالية",
        monthly: "شهري",
        yearly: "سنوي",
        limits: "حدود الخطة",
        jobs: "طلبات التقديم",
        resumes: "السير الذاتية",
        ai: "طلبات الذكاء",
        storage: "التخزين",
      }
    : {
        title: "Pricing Plans",
        subtitle: "Monitor usage limits and create new plans.",
        add: "Add Plan",
        current: "Current",
        monthly: "Monthly",
        yearly: "Yearly",
        limits: "Plan Limits",
        jobs: "Job Applications",
        resumes: "Resumes",
        ai: "AI Requests",
        storage: "Storage",
      };

  const plans = isArabic
    ? [
        {
          name: "مجاني",
          price: "0",
          cadence: t.monthly,
          badge: t.current,
          limits: ["10 " + t.jobs, "1 " + t.resumes, "5 " + t.ai, "5MB " + t.storage],
        },
        {
          name: "احترافي",
          price: "79",
          cadence: t.monthly,
          badge: "",
          limits: ["100 " + t.jobs, "10 " + t.resumes, "80 " + t.ai, "2GB " + t.storage],
        },
        {
          name: "مؤسسي",
          price: "249",
          cadence: t.yearly,
          badge: "",
          limits: ["غير محدود " + t.jobs, "غير محدود " + t.resumes, "غير محدود " + t.ai, "20GB " + t.storage],
        },
      ]
    : [
        {
          name: "Free",
          price: "0",
          cadence: t.monthly,
          badge: t.current,
          limits: ["10 " + t.jobs, "1 " + t.resumes, "5 " + t.ai, "5MB " + t.storage],
        },
        {
          name: "Pro",
          price: "79",
          cadence: t.monthly,
          badge: "",
          limits: ["100 " + t.jobs, "10 " + t.resumes, "80 " + t.ai, "2GB " + t.storage],
        },
        {
          name: "Enterprise",
          price: "249",
          cadence: t.yearly,
          badge: "",
          limits: ["Unlimited " + t.jobs, "Unlimited " + t.resumes, "Unlimited " + t.ai, "20GB " + t.storage],
        },
      ];

  const align = isArabic ? "text-right" : "text-left";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="space-y-6">
      <header className={`space-y-2 ${align}`}>
        <h1 className="text-2xl font-semibold text-slate-900">{t.title}</h1>
        <p className="text-sm text-slate-600">{t.subtitle}</p>
      </header>

      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">{t.limits}</span>
        <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600">
          {t.add}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            {plan.badge ? (
              <span className="absolute -top-3 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                {plan.badge}
              </span>
            ) : null}
            <div className="space-y-3">
              <div className={`space-y-1 ${align}`}>
                <h2 className="text-lg font-semibold text-slate-900">{plan.name}</h2>
                <p className="text-sm text-slate-500">
                  <span className="text-2xl font-semibold text-slate-900">${plan.price}</span> /{" "}
                  {plan.cadence}
                </p>
              </div>
              <ul className={`space-y-2 text-sm text-slate-600 ${align}`}>
                {plan.limits.map((limit, index) => (
                  <li key={`${plan.name}-${index}`} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span>{limit}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300">
                {isArabic ? "تعديل الخطة" : "Edit Plan"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
