type PageProps = {
  params: { lang: string };
};

export default function SupportPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "إدارة الدعم الفني",
        subtitle: "تابع التذاكر والردود وأولوية الدعم.",
        search: "ابحث عن تذكرة",
        subject: "الموضوع",
        status: "الحالة",
        priority: "الأولوية",
        lastReply: "آخر رد",
        actions: "الإجراءات",
        open: "مفتوح",
        pending: "بانتظار رد",
        closed: "مغلق",
        high: "عالية",
        medium: "متوسطة",
        low: "منخفضة",
        view: "تفاصيل",
      }
    : {
        title: "Support Tickets",
        subtitle: "Track tickets, replies, and priority.",
        search: "Search ticket",
        subject: "Subject",
        status: "Status",
        priority: "Priority",
        lastReply: "Last Reply",
        actions: "Actions",
        open: "Open",
        pending: "Waiting",
        closed: "Closed",
        high: "High",
        medium: "Medium",
        low: "Low",
        view: "Details",
      };

  const rows = isArabic
    ? [
        { subject: "مشكلة تسجيل الدخول", status: t.open, priority: t.high, lastReply: "منذ 5 دقائق" },
        { subject: "طلب استرداد", status: t.pending, priority: t.medium, lastReply: "منذ ساعة" },
        { subject: "بلاغ إساءة", status: t.open, priority: t.high, lastReply: "اليوم" },
        { subject: "تحقق مزود خدمة", status: t.closed, priority: t.low, lastReply: "قبل أسبوع" },
      ]
    : [
        { subject: "Login issue", status: t.open, priority: t.high, lastReply: "5 minutes ago" },
        { subject: "Refund request", status: t.pending, priority: t.medium, lastReply: "1 hour ago" },
        { subject: "Abuse report", status: t.open, priority: t.high, lastReply: "Today" },
        { subject: "Provider verification", status: t.closed, priority: t.low, lastReply: "Last week" },
      ];

  const align = isArabic ? "text-right" : "text-left";

  const statusClass = (status: string) => {
    if (status === t.open) return "bg-emerald-50 text-emerald-700";
    if (status === t.pending) return "bg-amber-50 text-amber-700";
    return "bg-slate-100 text-slate-600";
  };

  const priorityClass = (priority: string) => {
    if (priority === t.high) return "bg-rose-50 text-rose-600";
    if (priority === t.medium) return "bg-amber-50 text-amber-700";
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
              <th className={`px-4 py-3 ${align}`}>{t.subject}</th>
              <th className={`px-4 py-3 ${align}`}>{t.status}</th>
              <th className={`px-4 py-3 ${align}`}>{t.priority}</th>
              <th className={`px-4 py-3 ${align}`}>{t.lastReply}</th>
              <th className={`px-4 py-3 ${align}`}>{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${row.subject}-${index}`}>
                <td className={`px-4 py-3 font-medium text-slate-900 ${align}`}>{row.subject}</td>
                <td className={`px-4 py-3 ${align}`}>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className={`px-4 py-3 ${align}`}>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${priorityClass(row.priority)}`}>
                    {row.priority}
                  </span>
                </td>
                <td className={`px-4 py-3 text-slate-500 ${align}`}>{row.lastReply}</td>
                <td className={`px-4 py-3 ${align}`}>
                  <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-300">
                    {t.view}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
