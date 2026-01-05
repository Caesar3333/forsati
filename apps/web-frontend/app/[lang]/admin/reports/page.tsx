type PageProps = {
  params: { lang: string };
};

export default function ReportsPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "إدارة البلاغات",
        subtitle: "راجِع البلاغات واتخذ الإجراءات المناسبة.",
        search: "ابحث عن بلاغ",
        item: "المحتوى",
        reporter: "المُبلغ",
        reason: "السبب",
        status: "الحالة",
        actions: "الإجراءات",
        open: "مفتوح",
        reviewing: "قيد المراجعة",
        resolved: "محلول",
        review: "مراجعة",
        resolve: "حل",
      }
    : {
        title: "Reports",
        subtitle: "Review reports and take action.",
        search: "Search report",
        item: "Content",
        reporter: "Reporter",
        reason: "Reason",
        status: "Status",
        actions: "Actions",
        open: "Open",
        reviewing: "Reviewing",
        resolved: "Resolved",
        review: "Review",
        resolve: "Resolve",
      };

  const rows = isArabic
    ? [
        { item: "فرصة تدريب - جامعة", reporter: "user-102", reason: "معلومات مضللة", status: t.open },
        { item: "ملف مزود خدمة", reporter: "user-288", reason: "محتوى غير لائق", status: t.reviewing },
        { item: "فرصة تطوع", reporter: "user-501", reason: "سبام", status: t.resolved },
      ]
    : [
        { item: "Internship Opportunity", reporter: "user-102", reason: "Misleading info", status: t.open },
        { item: "Provider Profile", reporter: "user-288", reason: "Inappropriate content", status: t.reviewing },
        { item: "Volunteer Opportunity", reporter: "user-501", reason: "Spam", status: t.resolved },
      ];

  const align = isArabic ? "text-right" : "text-left";

  const badgeClass = (status: string) => {
    if (status === t.open) return "bg-rose-50 text-rose-600";
    if (status === t.reviewing) return "bg-amber-50 text-amber-700";
    return "bg-emerald-50 text-emerald-700";
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="space-y-6">
      <header className={`space-y-2 ${align}`}>
        <h1 className="text-2xl font-semibold text-slate-900">{t.title}</h1>
        <p className="text-sm text-slate-600">{t.subtitle}</p>
      </header>

      <input
        type="search"
        placeholder={t.search}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-amber-400"
      />

      <div className="rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className={`px-4 py-3 ${align}`}>{t.item}</th>
              <th className={`px-4 py-3 ${align}`}>{t.reporter}</th>
              <th className={`px-4 py-3 ${align}`}>{t.reason}</th>
              <th className={`px-4 py-3 ${align}`}>{t.status}</th>
              <th className={`px-4 py-3 ${align}`}>{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${row.item}-${index}`}>
                <td className={`px-4 py-3 font-medium text-slate-900 ${align}`}>{row.item}</td>
                <td className={`px-4 py-3 text-slate-600 ${align}`}>{row.reporter}</td>
                <td className={`px-4 py-3 text-slate-600 ${align}`}>{row.reason}</td>
                <td className={`px-4 py-3 ${align}`}>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${badgeClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className={`px-4 py-3 ${align}`}>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-300">
                      {t.review}
                    </button>
                    <button className="rounded-lg border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 hover:border-emerald-300">
                      {t.resolve}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
