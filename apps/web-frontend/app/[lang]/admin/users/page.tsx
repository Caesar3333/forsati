type PageProps = {
  params: { lang: string };
};

export default function UsersPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "إدارة المستخدمين",
        subtitle: "تحكم في الحسابات والأدوار والتحقق.",
        search: "ابحث عن مستخدم",
        status: "الحالة",
        role: "الدور",
        actions: "الإجراءات",
        active: "نشط",
        pending: "قيد التحقق",
        banned: "محظور",
        view: "عرض",
        suspend: "تعليق",
        verify: "تحقق",
      }
    : {
        title: "Manage Users",
        subtitle: "Control accounts, roles, and verification.",
        search: "Search users",
        status: "Status",
        role: "Role",
        actions: "Actions",
        active: "Active",
        pending: "Pending",
        banned: "Banned",
        view: "View",
        suspend: "Suspend",
        verify: "Verify",
      };

  const rows = isArabic
    ? [
        { name: "ليلى حسن", email: "leila@forsati.sa", role: "باحثة عن عمل", status: t.active },
        { name: "محمود علي", email: "m.ali@org.com", role: "مدير موارد بشرية", status: t.pending },
        { name: "ندى سالم", email: "nada@provider.com", role: "مراجعة سيرة ذاتية", status: t.active },
        { name: "يوسف عمر", email: "yousef@forsati.sa", role: "مشرف", status: t.banned },
      ]
    : [
        { name: "Leila Hassan", email: "leila@forsati.sa", role: "Job Seeker", status: t.active },
        { name: "Mahmoud Ali", email: "m.ali@org.com", role: "HR Manager", status: t.pending },
        { name: "Nada Salem", email: "nada@provider.com", role: "Resume Reviewer", status: t.active },
        { name: "Yousef Omar", email: "yousef@forsati.sa", role: "Moderator", status: t.banned },
      ];

  const align = isArabic ? "text-right" : "text-left";

  const badgeClass = (status: string) => {
    if (status === t.active) return "bg-emerald-50 text-emerald-700";
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
              <th className={`px-4 py-3 ${align}`}>{isArabic ? "المستخدم" : "User"}</th>
              <th className={`px-4 py-3 ${align}`}>{t.role}</th>
              <th className={`px-4 py-3 ${align}`}>{t.status}</th>
              <th className={`px-4 py-3 ${align}`}>{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${row.email}-${index}`}>
                <td className={`px-4 py-3 ${align}`}>
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900">{row.name}</div>
                    <div className="text-xs text-slate-500">{row.email}</div>
                  </div>
                </td>
                <td className={`px-4 py-3 text-slate-600 ${align}`}>{row.role}</td>
                <td className={`px-4 py-3 ${align}`}>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${badgeClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className={`px-4 py-3 ${align}`}>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-300">
                      {t.view}
                    </button>
                    <button className="rounded-lg border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700 hover:border-amber-300">
                      {t.verify}
                    </button>
                    <button className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 hover:border-rose-300">
                      {t.suspend}
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
