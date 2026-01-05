import {
  BadgeCheck,
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  ChevronDown,
  CreditCard,
  FileText,
  Globe,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  Megaphone,
  Search,
  Settings,
  ShieldCheck,
  Tags,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

const baseClass = "h-4 w-4";

export function ForsatiDashboardIcon({ className }: IconProps) {
  return <LayoutDashboard className={cn(baseClass, className)} />;
}

export function ForsatiJobTitlesIcon({ className }: IconProps) {
  return <Briefcase className={cn(baseClass, className)} />;
}

export function ForsatiCountriesIcon({ className }: IconProps) {
  return <Globe className={cn(baseClass, className)} />;
}

export function ForsatiPricingIcon({ className }: IconProps) {
  return <Tags className={cn(baseClass, className)} />;
}

export function ForsatiUsersIcon({ className }: IconProps) {
  return <Users className={cn(baseClass, className)} />;
}

export function ForsatiPaymentsIcon({ className }: IconProps) {
  return <CreditCard className={cn(baseClass, className)} />;
}

export function ForsatiSupportIcon({ className }: IconProps) {
  return <LifeBuoy className={cn(baseClass, className)} />;
}

export function ForsatiReportIcon({ className }: IconProps) {
  return <BarChart3 className={cn(baseClass, className)} />;
}

export function ForsatiSettingsIcon({ className }: IconProps) {
  return <Settings className={cn(baseClass, className)} />;
}

export function ForsatiNotificationIcon({ className }: IconProps) {
  return <Bell className={cn(baseClass, className)} />;
}

export function ForsatiContentIcon({ className }: IconProps) {
  return <FileText className={cn(baseClass, className)} />;
}

export function ForsatiSecurityIcon({ className }: IconProps) {
  return <ShieldCheck className={cn(baseClass, className)} />;
}

export function ForsatiSearchIcon({ className }: IconProps) {
  return <Search className={cn(baseClass, className)} />;
}

export function ForsatiChevronIcon({ className }: IconProps) {
  return <ChevronDown className={cn(baseClass, className)} />;
}

export function ForsatiVerifyIcon({ className }: IconProps) {
  return <BadgeCheck className={cn(baseClass, className)} />;
}

export function ForsatiAnnouncementIcon({ className }: IconProps) {
  return <Megaphone className={cn(baseClass, className)} />;
}

export function ForsatiOrganizationIcon({ className }: IconProps) {
  return <Building2 className={cn(baseClass, className)} />;
}

export function ForsatiMailIcon({ className }: IconProps) {
  return <Mail className={cn(baseClass, className)} />;
}
