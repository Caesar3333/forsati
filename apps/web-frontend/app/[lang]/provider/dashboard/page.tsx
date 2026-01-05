type PageProps = {
  params: { lang: string };
};

export default function ProviderDashboardPage({ params }: PageProps) {
  const isArabic = params.lang === "ar";
  const t = isArabic
    ? {
        title: "لوحة مزود الخدمة",
        subtitle: "تابع خدماتك، الحجوزات، والتحقق.",
        services: "الخدمات",
        orders: "الطلبات",
        rating: "التقييم",
        earnings: "الأرباح",
        verification: "حالة التحقق",
        pending: "بانتظار المراجعة",
        upload: "رفع المستندات",
        recentOrders: "آخر الطلبات",
        status: "الحالة",
        total: "الإجمالي",
        payout: "الدفعة القادمة",
        reviews: "المراجعات",
      }
    : {
        title: "Marketplace Provider Dashboard",
        subtitle: "Track services, bookings, and verification.",
        services: "Services",
        orders: "Orders",
        rating: "Rating",
        earnings: "Earnings",
        verification: "Verification Status",
        pending: "Pending Review",
        upload: "Upload Documents",
        recentOrders: "Recent Orders",
        status: "Status",
        total: "Total",
        payout: "Next Payout",
        reviews: "Reviews",
      };

  const align = isArabic ? "text-right" : "text-left";

  const stats = [
    { label: t.services, value: "6" },
    { label: t.orders, value: "18" },
    { label: t.rating, value: "4.8" },
    { label: t.earnings, value: "$1,240" },
  ];

  const orders = isArabic
    ? [
        { title: "مراجعة سيرة ذاتية", status: "قيد التنفيذ", total: "$49" },
        { title: "تحضير مقابلة", status: "مكتمل", total: "$79" },
        { title: "جلسة إرشاد", status: "قيد التنفيذ", total: "$35" },
      ]
    : [
        { title: "Resume Review", status: "In Progress", total: "$49" },
        { title: "Interview Prep", status: "Completed", total: "$79" },
        { title: "Coaching Session", status: "In Progress", total: "$35" },
      ];

  const reviews = isArabic
    ? [
        { name: "ريم", note: "جلسة ممتازة ونصائح واضحة." },
        { name: "سامي", note: "تحليل السيرة مفيد جدًا." },
      ]
    : [
        { name: "Reem", note: "Excellent session and clear guidance." },
        { name: "Sam", note: "The CV analysis was super helpful." },
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
          <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{t.recentOrders}</div>
          <div className="space-y-3">
            {orders.map((order, index) => (
              <div key={`${order.title}-${index}`} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className={`space-y-1 ${align}`}>
                  <div className="text-sm font-semibold text-slate-900">{order.title}</div>
                  <div className="text-xs text-slate-500">
                    {t.status}: {order.status}
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-900">{order.total}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className={`mb-2 text-sm font-semibold text-slate-700 ${align}`}>{t.verification}</div>
            <div className="flex items-center justify-between">
              <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                {t.pending}
              </span>
              <button className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600">
                {t.upload}
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className={`mb-2 text-sm font-semibold text-slate-700 ${align}`}>{t.payout}</div>
            <div className="text-sm text-slate-600">{isArabic ? "12 أكتوبر 2025" : "Oct 12, 2025"}</div>
            <div className="mt-3 text-2xl font-semibold text-slate-900">$420</div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className={`mb-4 text-sm font-semibold text-slate-700 ${align}`}>{t.reviews}</div>
        <div className="grid gap-3 md:grid-cols-2">
          {reviews.map((review, index) => (
            <div key={`${review.name}-${index}`} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className={`text-sm font-semibold text-slate-900 ${align}`}>{review.name}</div>
              <p className={`text-xs text-slate-600 ${align}`}>{review.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
