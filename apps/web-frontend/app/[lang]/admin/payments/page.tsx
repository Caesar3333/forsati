type PageProps = {
  params: { lang: string };
};

export default function PaymentsPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "إدارة المدفوعات",
        subtitle: "تابع العمليات المالية وطرق الدفع.",
        search: "ابحث عن عملية",
        amount: "المبلغ",
        status: "الحالة",
        method: "الطريقة",
        date: "التاريخ",
        actions: "الإجراءات",
        success: "مكتمل",
        pending: "معلق",
        failed: "مرفوض",
        view: "عرض",
        refund: "استرداد",
      }
    : {
        title: "Payments",
        subtitle: "Track transactions and payment methods.",
        search: "Search transaction",
        amount: "Amount",
        status: "Status",
        method: "Method",
        date: "Date",
        actions: "Actions",
        success: "Completed",
        pending: "Pending",
        failed: "Failed",
        view: "View",
        refund: "Refund",
      };

  const rows = isArabic
    ? [
        { id: "TX-1089", amount: "$249", method: "بطاقة", status: t.success, date: "اليوم" },
        { id: "TX-1088", amount: "$79", method: "تحويل", status: t.pending, date: "أمس" },
        { id: "TX-1087", amount: "$29", method: "بطاقة", status: t.failed, date: "قبل 3 أيام" },
      ]
    : [
        { id: "TX-1089", amount: "$249", method: "Card", status: t.success, date: "Today" },
        { id: "TX-1088", amount: "$79", method: "Bank Transfer", status: t.pending, date: "Yesterday" },
        { id: "TX-1087", amount: "$29", method: "Card", status: t.failed, date: "3 days ago" },
      ];

  const align = isArabic ? "text-right" : "text-left";

  const badgeClass = (status: string) => {
    if (status === t.success) return "bg-emerald-50 text-emerald-700";
    if (status === t.pending) return "bg-amber-50 text-amber-700";
    return "bg-rose-50 text-rose-600";
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
              <th className={`px-4 py-3 ${align}`}>{isArabic ? "العملية" : "Transaction"}</th>
              <th className={`px-4 py-3 ${align}`}>{t.amount}</th>
              <th className={`px-4 py-3 ${align}`}>{t.method}</th>
              <th className={`px-4 py-3 ${align}`}>{t.status}</th>
              <th className={`px-4 py-3 ${align}`}>{t.date}</th>
              <th className={`px-4 py-3 ${align}`}>{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className={`px-4 py-3 font-medium text-slate-900 ${align}`}>{row.id}</td>
                <td className={`px-4 py-3 ${align}`}>{row.amount}</td>
                <td className={`px-4 py-3 text-slate-600 ${align}`}>{row.method}</td>
                <td className={`px-4 py-3 ${align}`}>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${badgeClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className={`px-4 py-3 text-slate-500 ${align}`}>{row.date}</td>
                <td className={`px-4 py-3 ${align}`}>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-300">
                      {t.view}
                    </button>
                    <button className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 hover:border-rose-300">
                      {t.refund}
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
