import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  ForsatiContentIcon,
  ForsatiNotificationIcon,
  ForsatiPaymentsIcon,
  ForsatiSecurityIcon,
  ForsatiSettingsIcon
} from "@/components/icons/forsati-icons";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "adminSettings",
    path: "/admin/settings"
  });
}

export default function AdminSettingsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const cards = [
    {
      href: "/admin/settings/general",
      title: isAr ? "الإعدادات العامة" : "General settings",
      description: isAr
        ? "تحديث بيانات الموقع الأساسية."
        : "Update site fundamentals.",
      icon: ForsatiSettingsIcon
    },
    {
      href: "/admin/settings/branding",
      title: isAr ? "الشعار والأيقونة" : "Logo and favicon",
      description: isAr
        ? "رفع الشعار والأيقونة."
        : "Upload logo and favicon.",
      icon: ForsatiContentIcon
    },
    {
      href: "/admin/settings/system",
      title: isAr ? "تهيئة النظام" : "System configuration",
      description: isAr
        ? "تفعيل أو تعطيل الوحدات."
        : "Enable or disable modules.",
      icon: ForsatiSecurityIcon
    },
    {
      href: "/admin/settings/notifications",
      title: isAr ? "إعدادات التنبيه" : "Notification settings",
      description: isAr
        ? "قوالب البريد والرسائل."
        : "Email/SMS templates.",
      icon: ForsatiNotificationIcon
    },
    {
      href: "/admin/settings/payments",
      title: isAr ? "بوابات الدفع" : "Payment gateways",
      description: isAr
        ? "تفعيل بوابات الدفع."
        : "Manage gateway status.",
      icon: ForsatiPaymentsIcon
    },
    {
      href: "/admin/settings/seo",
      title: isAr ? "تهيئة SEO" : "SEO configuration",
      description: isAr
        ? "إدارة العناوين والوصف."
        : "Manage titles and meta.",
      icon: ForsatiContentIcon
    },
    {
      href: "/admin/settings/frontend",
      title: isAr ? "إدارة الواجهة" : "Manage frontend",
      description: isAr
        ? "تحديث أقسام المحتوى."
        : "Update content blocks.",
      icon: ForsatiContentIcon
    },
    {
      href: "/admin/settings/pages",
      title: isAr ? "إدارة الصفحات" : "Manage pages",
      description: isAr
        ? "تحرير الصفحات الثابتة."
        : "Edit static pages.",
      icon: ForsatiContentIcon
    },
    {
      href: "/admin/settings/languages",
      title: isAr ? "اللغات" : "Language manager",
      description: isAr
        ? "إضافة لغات وترجمات."
        : "Add languages and keys.",
      icon: ForsatiContentIcon
    },
    {
      href: "/admin/settings/extensions",
      title: isAr ? "الملحقات" : "Extensions",
      description: isAr
        ? "إدارة الإضافات."
        : "Enable extensions.",
      icon: ForsatiContentIcon
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "إعدادات النظام" : "System settings"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "اختصارات سريعة لإدارة إعدادات المنصة."
            : "Quick shortcuts for platform configuration."}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={`/${params.lang}${card.href}`}>
            <Card className="h-full border border-ink-100 p-5 transition hover:-translate-y-1 hover:shadow-card">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
                  <card.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink-900">
                    {card.title}
                  </div>
                  <div className="text-xs text-ink-500">{card.description}</div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
