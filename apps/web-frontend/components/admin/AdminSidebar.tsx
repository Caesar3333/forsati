"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  ForsatiAnnouncementIcon,
  ForsatiCountriesIcon,
  ForsatiDashboardIcon,
  ForsatiJobTitlesIcon,
  ForsatiPaymentsIcon,
  ForsatiPricingIcon,
  ForsatiReportIcon,
  ForsatiSettingsIcon,
  ForsatiSupportIcon,
  ForsatiUsersIcon
} from "@/components/icons/forsati-icons";
import { cn } from "@/lib/utils";

type NavItem = {
  key: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: { ar: string; en: string };
};

const navItems: NavItem[] = [
  {
    key: "dashboard",
    href: "/admin",
    icon: ForsatiDashboardIcon,
    label: { ar: "لوحة التحكم", en: "Dashboard" }
  },
  {
    key: "job_titles",
    href: "/admin/job-titles",
    icon: ForsatiJobTitlesIcon,
    label: { ar: "المسميات الوظيفية", en: "Job Titles" }
  },
  {
    key: "countries",
    href: "/admin/countries",
    icon: ForsatiCountriesIcon,
    label: { ar: "الدول", en: "Countries" }
  },
  {
    key: "pricing",
    href: "/admin/pricing-plans",
    icon: ForsatiPricingIcon,
    label: { ar: "خطط التسعير", en: "Pricing Plans" }
  },
  {
    key: "users",
    href: "/admin/users",
    icon: ForsatiUsersIcon,
    label: { ar: "إدارة المستخدمين", en: "Manage Users" }
  },
  {
    key: "payments",
    href: "/admin/payments",
    icon: ForsatiPaymentsIcon,
    label: { ar: "المدفوعات", en: "Payments" }
  },
  {
    key: "support",
    href: "/admin/support-tickets",
    icon: ForsatiSupportIcon,
    label: { ar: "تذاكر الدعم", en: "Support Tickets" }
  },
  {
    key: "reports",
    href: "/admin/reports",
    icon: ForsatiReportIcon,
    label: { ar: "التقارير", en: "Reports" }
  },
  {
    key: "notifications",
    href: "/admin/notifications/send",
    icon: ForsatiAnnouncementIcon,
    label: { ar: "إرسال إشعار", en: "Send Notification" }
  },
  {
    key: "settings",
    href: "/admin/settings",
    icon: ForsatiSettingsIcon,
    label: { ar: "إعدادات النظام", en: "System Settings" }
  }
];

export function AdminSidebar() {
  const { lang } = useLanguage();
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col bg-[#0B1B55] text-white">
      <div className="px-6 py-6 text-lg font-semibold">
        {lang === "ar" ? "لوحة فرصتي" : "Forsati Admin"}
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const href = `/${lang}${item.href}`;
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={item.key}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                active
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label[lang]}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 text-xs text-white/50">
        Forsati v1.0
      </div>
    </aside>
  );
}
