type PageProps = {
  params: { lang: string };
};

export default function CountriesPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "إدارة الدول",
        subtitle: "تحكم في الدول المتاحة والرموز.",
        search: "ابحث عن دولة",
        add: "إضافة دولة",
        name: "الدولة",
        code: "الرمز",
        status: "الحالة",
        actions: "الإجراءات",
        active: "نشط",
        edit: "تعديل",
        disable: "إيقاف",
      }
    : {
        title: "Countries Management",
        subtitle: "Manage available countries and codes.",
        search: "Search country",
        add: "Add Country",
        name: "Country",
        code: "Code",
        status: "Status",
        actions: "Actions",
        active: "Active",
        edit: "Edit",
        disable: "Disable",
      };

  const rows = isArabic
    ? [
        { name: "المملكة العربية السعودية", code: "SA", status: t.active },
        { name: "الإمارات العربية المتحدة", code: "AE", status: t.active },
        { name: "مصر", code: "EG", status: t.active },
        { name: "المغرب", code: "MA", status: t.active },
      ]
    : [
        { name: "Saudi Arabia", code: "SA", status: t.active },
        { name: "United Arab Emirates", code: "AE", status: t.active },
        { name: "Egypt", code: "EG", status: t.active },
        { name: "Morocco", code: "MA", status: t.active },
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
              <th className={`px-4 py-3 ${align}`}>{t.code}</th>
              <th className={`px-4 py-3 ${align}`}>{t.status}</th>
              <th className={`px-4 py-3 ${align}`}>{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${row.code}-${index}`}>
                <td className={`px-4 py-3 font-medium text-slate-900 ${align}`}>
                  {row.name}
                </td>
                <td className={`px-4 py-3 text-slate-500 ${align}`}>{row.code}</td>
                <td className={`px-4 py-3 ${align}`}>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
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
