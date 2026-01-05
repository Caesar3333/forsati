type PageProps = {
  params: { lang: string };
};

export default function RolesPermissionsPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "الأدوار والصلاحيات",
        subtitle: "حدّد الصلاحيات لكل دور ونطاق الوصول.",
        roles: "الأدوار",
        permissions: "الصلاحيات",
        scopes: "النطاقات",
        platform: "المنصة",
        organization: "المنظمة",
        provider: "مزود الخدمة",
        self: "ذاتي",
      }
    : {
        title: "Roles & Permissions",
        subtitle: "Assign permissions per role and access scope.",
        roles: "Roles",
        permissions: "Permissions",
        scopes: "Scopes",
        platform: "Platform",
        organization: "Organization",
        provider: "Provider",
        self: "Self",
      };

  const roles = isArabic
    ? [
        "مالك النظام",
        "مشرف عام",
        "مشرف محتوى",
        "مدير مالي",
        "دعم فني",
        "مزود خدمة",
        "مالك منظمة",
        "مدير موارد بشرية",
        "باحث عن عمل",
      ]
    : [
        "Admin Owner",
        "Super Admin",
        "Moderator",
        "Finance Admin",
        "Support Agent",
        "Marketplace Provider",
        "Organization Owner",
        "HR Manager",
        "Job Seeker",
      ];

  const permissionGroups = isArabic
    ? [
        {
          title: "المستخدمون",
          items: ["user.read", "user.update", "user.suspend", "user.verify"],
        },
        {
          title: "الأدوار",
          items: ["role.create", "role.update", "role.assign", "permission.update"],
        },
        {
          title: "الفرص",
          items: ["opp.create", "opp.update", "opp.publish", "opp.delete", "opp.moderate"],
        },
        {
          title: "الطلبات",
          items: ["app.read", "app.export", "app.move_stage", "app.reject", "app.accept"],
        },
        {
          title: "المتجر",
          items: ["service.create", "provider.approve", "order.read", "payout.manage"],
        },
        {
          title: "الفوترة",
          items: ["plan.manage", "subscription.manage", "invoice.read", "refund.manage"],
        },
      ]
    : [
        {
          title: "Users",
          items: ["user.read", "user.update", "user.suspend", "user.verify"],
        },
        {
          title: "Roles",
          items: ["role.create", "role.update", "role.assign", "permission.update"],
        },
        {
          title: "Opportunities",
          items: ["opp.create", "opp.update", "opp.publish", "opp.delete", "opp.moderate"],
        },
        {
          title: "Applications",
          items: ["app.read", "app.export", "app.move_stage", "app.reject", "app.accept"],
        },
        {
          title: "Marketplace",
          items: ["service.create", "provider.approve", "order.read", "payout.manage"],
        },
        {
          title: "Billing",
          items: ["plan.manage", "subscription.manage", "invoice.read", "refund.manage"],
        },
      ];

  const align = isArabic ? "text-right" : "text-left";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="space-y-6">
      <header className={`space-y-2 ${align}`}>
        <h1 className="text-2xl font-semibold text-slate-900">{t.title}</h1>
        <p className="text-sm text-slate-600">{t.subtitle}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className={`text-sm font-semibold text-slate-700 ${align}`}>{t.roles}</h2>
          <ul className="space-y-2 text-sm">
            {roles.map((role) => (
              <li
                key={role}
                className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-slate-700"
              >
                {role}
              </li>
            ))}
          </ul>
          <div className="space-y-2 pt-2">
            <div className={`text-xs font-semibold text-slate-500 ${align}`}>{t.scopes}</div>
            <div className="flex flex-wrap gap-2">
              {[t.platform, t.organization, t.provider, t.self].map((scope) => (
                <span
                  key={scope}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {scope}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <section className="space-y-4">
          <h2 className={`text-sm font-semibold text-slate-700 ${align}`}>{t.permissions}</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {permissionGroups.map((group) => (
              <div key={group.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className={`mb-3 text-sm font-semibold text-slate-800 ${align}`}>{group.title}</h3>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <label key={item} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs">
                      <span className="font-medium text-slate-700">{item}</span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 accent-amber-500"
                        aria-label={item}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
