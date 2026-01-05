import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "adminSettings",
    path: "/admin/settings/notifications"
  });
}

export default function AdminNotificationsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const templates = [
    {
      name: isAr ? "إشعار عام" : "Default template",
      subject: "{{subject}}"
    },
    {
      name: isAr ? "استعادة كلمة المرور" : "Password reset",
      subject: isAr ? "رمز إعادة التعيين" : "Reset code"
    },
    {
      name: isAr ? "تأكيد الدفع" : "Payment success",
      subject: isAr ? "تم الدفع" : "Payment completed"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "إعدادات التنبيه" : "Notification settings"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "إدارة قوالب البريد والرسائل."
            : "Manage email and SMS templates."}
        </p>
      </div>
      <Card className="p-6">
        <div className="flex flex-wrap gap-2">
          {[
            isAr ? "قالب البريد" : "Email templates",
            isAr ? "قالب الرسائل" : "SMS templates",
            isAr ? "قالب الإشعارات" : "Push templates"
          ].map((item, index) => (
            <Button key={item} variant={index === 0 ? "primary" : "outline"} size="sm">
              {item}
            </Button>
          ))}
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-ink-100">
          <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-indigo-500/90 px-4 py-3 text-xs font-semibold text-white">
            <div>{isAr ? "الاسم" : "Name"}</div>
            <div>{isAr ? "الموضوع" : "Subject"}</div>
            <div className="text-end">{isAr ? "القنوات" : "Channels"}</div>
          </div>
          {templates.map((template) => (
            <div
              key={template.name}
              className="grid grid-cols-[1.5fr_1fr_1fr] items-center border-t border-ink-100 px-4 py-3 text-sm"
            >
              <div>{template.name}</div>
              <div className="text-ink-500">{template.subject}</div>
              <div className="flex justify-end gap-2">
                <Badge variant="info">Email</Badge>
                <Badge variant="success">SMS</Badge>
                <Badge>Push</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
