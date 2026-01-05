type PageProps = {
  params: { lang: string };
};

export default function JobTitlesPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "إدارة المسميات الوظيفية",
        subtitle: "أضف وعدّل المسميات المعتمدة للفرص.",
        search: "ابحث عن مسمى وظيفي",
        add: "إضافة مسمى",
        name: "المسمى",
        status: "الحالة",
        actions: "الإجراءات",
        active: "نشط",
        disabled: "موقوف",
        edit: "تعديل",
        disable: "إيقاف",
      }
      
    : {
        title: "Job Title Management",
        subtitle: "Add and update approved job titles.",
        search: "Search job title",
        add: "Add Title",
        name: "Title",
        status: "Status",
        actions: "Actions",
        active: "Active",
        disabled: "Disabled",
        edit: "Edit",
        disable: "Disable",
      };

  const rows = isArabic
    ? [
        { name: "منسق أكاديمي", status: t.active },
        { name: "محلل أعمال", status: t.active },
        { name: "مصمم واجهات", status: t.active },
        { name: "محاسب", status: t.disabled },
      ]
    : [
        { name: "Academic Coordinator", status: t.active },
        { name: "Business Analyst", status: t.active },
        { name: "UI/UX Designer", status: t.active },
        { name: "Accountant", status: t.disabled },
      ];

  const align = isArabic ? "text-right" : "text-left";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="space-y-6">
      <header className={`space-y-2 ${align}`}>
        <h1 className="text-2xl font-semibold text-slate-900">{t.title}</h1>
        <p className="text-sm text-slate-600">{t.subtitle}</p>
      </header>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="search"
          placeholder={t.search}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-amber-400"
        />
        <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600">
          {t.add}
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className={`px-4 py-3 ${align}`}>{t.name}</th>
              <th className={`px-4 py-3 ${align}`}>{t.status}</th>
              <th className={`px-4 py-3 ${align}`}>{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${row.name}-${index}`}>
                <td className={`px-4 py-3 font-medium text-slate-900 ${align}`}>
                  {row.name}
                </td>
                <td className={`px-4 py-3 ${align}`}>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                      row.status === t.active
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className={`px-4 py-3 ${align}`}>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-300">
                      {t.edit}
                    </button>
                    <button className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 hover:border-rose-300">
                      {t.disable}
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
