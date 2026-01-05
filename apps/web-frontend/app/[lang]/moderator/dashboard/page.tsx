type PageProps = {
  params: { lang: string };
};

export default function ModeratorDashboardPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "لوحة المشرف",
        subtitle: "مراجعة المحتوى والبلاغات وسجل الإجراءات.",
        pending: "محتوى بانتظار المراجعة",
        reports: "بلاغات اليوم",
        actions: "إجراءات اليوم",
        contentQueue: "قائمة المراجعة",
        reported: "عناصر مبلّغ عنها",
        history: "سجل الإجراءات",
        status: "الحالة",
        review: "مراجعة",
        resolve: "حل",
      }
    : {
        title: "Moderator Dashboard",
        subtitle: "Review content, reports, and action history.",
        pending: "Pending Content",
        reports: "Reports Today",
        actions: "Actions Today",
        contentQueue: "Review Queue",
        reported: "Reported Items",
        history: "Action History",
        status: "Status",
        review: "Review",
        resolve: "Resolve",
      };

  const align = isArabic ? "text-right" : "text-left";

  const stats = [
    { label: t.pending, value: "14" },
    { label: t.reports, value: "7" },
    { label: t.actions, value: "22" },
  ];

  const queue = isArabic
    ? [
        { title: "فرصة تطوع - فريق الميدان", status: "جديد" },
        { title: "برنامج تدريبي - بيانات", status: "محدث" },
        { title: "مزود خدمة - مراجعة", status: "جديد" },
      ]
    : [
        { title: "Volunteer Opportunity - Field Team", status: "New" },
        { title: "Training Program - Data", status: "Updated" },
        { title: "Service Provider - Review", status: "New" },
      ];

  const reports = isArabic
    ? [
        { item: "فرصة عمل - تصميم", reason: "محتوى مكرر" },
        { item: "ملف مستخدم", reason: "انتحال شخصية" },
      ]
    : [
        { item: "Job Opportunity - Design", reason: "Duplicate content" },
        { item: "User Profile", reason: "Impersonation" },
      ];

  const history = isArabic
    ? [
        "تمت الموافقة على مزود خدمة جديد",
        "تم إغلاق بلاغ محتوى",
        "تم حظر فرصة مخالفة",
      ]
    : [
        "Approved a new provider profile",
        "Closed a content report",
        "Suspended a violating opportunity",
      ];

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="space-y-6">
      <header className={`space-y-2 ${align}`}>
        <h1 className="text-2xl font-semibold text-slate-900">{t.title}</h1>
        <p className="text-sm text-slate-600">{t.subtitle}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm text-slate-500">{stat.label}</div>
            <div className="text-2xl font-semibold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{t.contentQueue}</div>
          <div className="space-y-3">
            {queue.map((item, index) => (
              <div key={`${item.title}-${index}`} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className={`space-y-1 ${align}`}>
                  <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500">{t.status}: {item.status}</div>
                </div>
                <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-300">
                  {t.review}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{t.reported}</div>
          <div className="space-y-3">
            {reports.map((item, index) => (
              <div key={`${item.item}-${index}`} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className={`text-sm font-semibold text-slate-900 ${align}`}>{item.item}</div>
                <div className={`text-xs text-slate-500 ${align}`}>{item.reason}</div>
                <button className="mt-2 rounded-lg border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 hover:border-emerald-300">
                  {t.resolve}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{t.history}</div>
        <ul className={`space-y-2 text-sm text-slate-600 ${align}`}>
          {history.map((item, index) => (
            <li key={`${item}-${index}`} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
