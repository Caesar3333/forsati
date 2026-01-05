type PageProps = {
  params: { lang: string };
};

export default function OrganizationDashboardPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "لوحة المنظمة",
        subtitle: "إدارة الفرص وفريق التوظيف والمشتركين.",
        opportunities: "فرص نشطة",
        applicants: "متقدمون",
        interviews: "مقابلات",
        team: "أعضاء الفريق",
        pipeline: "مراحل التقديم",
        usage: "استخدام الاشتراك",
        actions: "إجراءات سريعة",
        createOpp: "إنشاء فرصة",
        invite: "دعوة عضو",
        export: "تصدير المتقدمين",
      }
    : {
        title: "Organization Dashboard",
        subtitle: "Manage opportunities, hiring team, and subscriptions.",
        opportunities: "Active Opportunities",
        applicants: "Applicants",
        interviews: "Interviews",
        team: "Team Members",
        pipeline: "Application Pipeline",
        usage: "Subscription Usage",
        actions: "Quick Actions",
        createOpp: "Create Opportunity",
        invite: "Invite Member",
        export: "Export Applicants",
      };

  const align = isArabic ? "text-right" : "text-left";

  const stats = [
    { label: t.opportunities, value: "12" },
    { label: t.applicants, value: "148" },
    { label: t.interviews, value: "9" },
    { label: t.team, value: "6" },
  ];

  const pipeline = isArabic
    ? [
        { label: "تقديم", count: "80" },
        { label: "قائمة قصيرة", count: "36" },
        { label: "مقابلة", count: "18" },
        { label: "عرض", count: "6" },
      ]
    : [
        { label: "Applied", count: "80" },
        { label: "Shortlisted", count: "36" },
        { label: "Interview", count: "18" },
        { label: "Offer", count: "6" },
      ];

  const team = isArabic
    ? [
        { name: "هند يوسف", role: "مالك منظمة" },
        { name: "أحمد سالم", role: "مدير توظيف" },
        { name: "ليلى محمد", role: "مسؤول فرص" },
      ]
    : [
        { name: "Hind Youssef", role: "Organization Owner" },
        { name: "Ahmed Salem", role: "HR Manager" },
        { name: "Leila Mohammed", role: "Opportunity Manager" },
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
          <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{t.pipeline}</div>
          <div className="grid gap-3 md:grid-cols-2">
            {pipeline.map((step) => (
              <div key={step.label} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="text-sm text-slate-500">{step.label}</div>
                <div className="text-xl font-semibold text-slate-900">{step.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{t.usage}</div>
          <div className="space-y-3 text-sm text-slate-600">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span>{isArabic ? "نشر الفرص" : "Jobs posted"}</span>
                <span>12/20</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-amber-500" style={{ width: "60%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs">
                <span>{isArabic ? "حدود الذكاء" : "AI Usage"}</span>
                <span>18/30</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: "60%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs">
                <span>{isArabic ? "التخزين" : "Storage"}</span>
                <span>6GB/10GB</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-slate-700" style={{ width: "60%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{isArabic ? "الفريق والأدوار" : "Team & Roles"}</div>
          <div className="space-y-3">
            {team.map((member) => (
              <div key={member.name} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className={`space-y-1 ${align}`}>
                  <div className="text-sm font-semibold text-slate-900">{member.name}</div>
                  <div className="text-xs text-slate-500">{member.role}</div>
                </div>
                <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-300">
                  {isArabic ? "إدارة" : "Manage"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{t.actions}</div>
          <div className="grid gap-3">
            <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600">
              {t.createOpp}
            </button>
            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300">
              {t.invite}
            </button>
            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300">
              {t.export}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
