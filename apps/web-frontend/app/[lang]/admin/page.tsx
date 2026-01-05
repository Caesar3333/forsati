import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "adminDashboard",
    path: "/admin"
  });
}

export default function AdminDashboardPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">
            {isAr ? "لوحة تحكم الإدارة" : "Admin dashboard"}
          </h1>
          <p className="text-sm text-ink-500">
            {isAr
              ? "نظرة شاملة على النظام والإجراءات العاجلة."
              : "Overview of system health and urgent actions."}
          </p>
        </div>
        <Badge variant="info">
          {isAr ? "آخر تحديث: اليوم" : "Updated: today"}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title={isAr ? "إجمالي المستخدمين" : "Total users"}
          value="22"
          accent="bg-indigo-500"
        />
        <AdminStatCard
          title={isAr ? "المؤسسات النشطة" : "Active orgs"}
          value="14"
          accent="bg-emerald-500"
        />
        <AdminStatCard
          title={isAr ? "مزودو الخدمات" : "Marketplace providers"}
          value="8"
          accent="bg-amber-500"
        />
        <AdminStatCard
          title={isAr ? "الإيرادات الشهرية" : "Monthly revenue"}
          value="$33.9k"
          accent="bg-rose-500"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <div className="text-sm font-semibold text-ink-900">
            {isAr ? "تقارير المدفوعات" : "Payment reports"}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { label: isAr ? "إجمالي المدفوعات" : "Total payments", value: "$2.5M" },
              { label: isAr ? "قيد الانتظار" : "Pending", value: "12" },
              { label: isAr ? "المرفوضة" : "Rejected", value: "3" }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-ink-100 bg-white p-4">
                <div className="text-xs text-ink-500">{item.label}</div>
                <div className="text-lg font-semibold text-ink-900">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex h-40 items-end gap-2">
            {[20, 45, 30, 55, 22, 38, 70].map((height, index) => (
              <div
                key={`${height}-${index}`}
                className="flex-1 rounded-full bg-indigo-500/80"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-sm font-semibold text-ink-900">
            {isAr ? "الاشتراكات" : "Subscriptions"}
          </div>
          <div className="mt-6 flex items-center justify-center">
            <div className="relative h-36 w-36 rounded-full bg-ink-100">
              <div className="absolute inset-4 rounded-full bg-white" />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-ink-700">
                68%
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs text-ink-500">
            <div className="flex items-center justify-between">
              <span>{isAr ? "Pro" : "Pro"}</span>
              <span>18</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{isAr ? "Elite" : "Elite"}</span>
              <span>6</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="p-5">
          <div className="text-sm font-semibold text-ink-900">
            {isAr ? "الموافقات المعلقة" : "Pending approvals"}
          </div>
          <div className="mt-4 space-y-3">
            {[
              isAr ? "فرص تدريب جديدة" : "New training programs",
              isAr ? "مزودو خدمات بانتظار المراجعة" : "Providers awaiting review",
              isAr ? "منح تحتاج تدقيق" : "Scholarships pending"
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white px-4 py-3"
              >
                <span className="text-sm text-ink-700">{item}</span>
                <Badge variant="warning">{isAr ? "معلق" : "Pending"}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-sm font-semibold text-ink-900">
            {isAr ? "سجل التدقيق" : "Audit log"}
          </div>
          <div className="mt-4 space-y-3 text-sm text-ink-500">
            {[
              isAr ? "تم تحديث صلاحيات دور HR Manager" : "HR Manager role updated",
              isAr ? "تمت الموافقة على مزود خدمة" : "Provider approved",
              isAr ? "تعديل إعدادات البريد" : "Email settings updated"
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-ink-100 bg-white px-4 py-3">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
