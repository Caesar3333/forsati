type PageProps = {
  params: { lang: string };
};

export default function ApprovalsPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "الموافقات المعلقة",
        subtitle: "طلبات الموافقة على الفرص والمزودين والبرامج.",
        type: "النوع",
        name: "الاسم",
        requestedBy: "المُقدّم",
        status: "الحالة",
        actions: "الإجراءات",
        pending: "بانتظار المراجعة",
        approve: "موافقة",
        reject: "رفض",
      }
    : {
        title: "Pending Approvals",
        subtitle: "Review approvals for opportunities, providers, and programs.",
        type: "Type",
        name: "Name",
        requestedBy: "Requested By",
        status: "Status",
        actions: "Actions",
        pending: "Pending",
        approve: "Approve",
        reject: "Reject",
      };

  const rows = isArabic
    ? [
        { type: "فرصة عمل", name: "مصمم تجربة مستخدم", by: "شركة أفق", status: t.pending },
        { type: "مزود خدمة", name: "سارة القحطاني", by: "تسجيل جديد", status: t.pending },
        { type: "برنامج تدريبي", name: "معسكر بيانات", by: "مركز إثراء", status: t.pending },
      ]
    : [
        { type: "Job Opportunity", name: "UX Designer", by: "Horizon Co.", status: t.pending },
        { type: "Service Provider", name: "Sarah Al-Qahtani", by: "New signup", status: t.pending },
        { type: "Training Program", name: "Data Bootcamp", by: "Ithra Center", status: t.pending },
      ];

  const align = isArabic ? "text-right" : "text-left";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="space-y-6">
      <header className={`space-y-2 ${align}`}>
        <h1 className="text-2xl font-semibold text-slate-900">{t.title}</h1>
        <p className="text-sm text-slate-600">{t.subtitle}</p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className={`px-4 py-3 ${align}`}>{t.type}</th>
              <th className={`px-4 py-3 ${align}`}>{t.name}</th>
              <th className={`px-4 py-3 ${align}`}>{t.requestedBy}</th>
              <th className={`px-4 py-3 ${align}`}>{t.status}</th>
              <th className={`px-4 py-3 ${align}`}>{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${row.name}-${index}`}>
                <td className={`px-4 py-3 font-medium text-slate-900 ${align}`}>{row.type}</td>
                <td className={`px-4 py-3 ${align}`}>{row.name}</td>
                <td className={`px-4 py-3 text-slate-600 ${align}`}>{row.by}</td>
                <td className={`px-4 py-3 ${align}`}>
                  <span className="inline-flex rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                    {row.status}
                  </span>
                </td>
                <td className={`px-4 py-3 ${align}`}>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-lg border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 hover:border-emerald-300">
                      {t.approve}
                    </button>
                    <button className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 hover:border-rose-300">
                      {t.reject}
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
