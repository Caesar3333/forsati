import { Card } from "@/components/ui/card";
import { AdminToggleRow } from "@/components/admin/AdminToggleRow";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "adminSettings",
    path: "/admin/settings/system"
  });
}

export default function AdminSystemSettingsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "تهيئة النظام" : "System configuration"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "تحكم في الوحدات الأساسية للنظام."
            : "Control core system modules."}
        </p>
      </div>
      <Card className="p-6">
        <AdminToggleRow
          title={isAr ? "تسجيل المستخدمين" : "User registration"}
          description={
            isAr
              ? "عند التعطيل لن يتمكن المستخدمون من التسجيل."
              : "Disable to prevent new registrations."
          }
          enabledLabel={isAr ? "تفعيل" : "Enable"}
          disabledLabel={isAr ? "تعطيل" : "Disable"}
        />
        <AdminToggleRow
          title={isAr ? "تفعيل SSL" : "Force SSL"}
          description={
            isAr
              ? "فرض الاتصال الآمن للزوار."
              : "Require secure connections."
          }
          enabledLabel={isAr ? "تفعيل" : "Enable"}
          disabledLabel={isAr ? "تعطيل" : "Disable"}
        />
        <AdminToggleRow
          title={isAr ? "التحقق بالبريد" : "Email verification"}
          description={
            isAr
              ? "إرسال رمز تحقق بالبريد الإلكتروني."
              : "Send email verification codes."
          }
          enabledLabel={isAr ? "تفعيل" : "Enable"}
          disabledLabel={isAr ? "تعطيل" : "Disable"}
        />
        <AdminToggleRow
          title={isAr ? "التحقق بالجوال" : "Mobile verification"}
          description={
            isAr
              ? "إرسال رمز تحقق عبر SMS."
              : "Send SMS verification codes."
          }
          enabledLabel={isAr ? "تفعيل" : "Enable"}
          disabledLabel={isAr ? "تعطيل" : "Disable"}
        />
        <AdminToggleRow
          title={isAr ? "تنبيهات النظام" : "System notifications"}
          description={
            isAr
              ? "تفعيل إرسال التنبيهات البريدية."
              : "Enable email notifications."
          }
          enabledLabel={isAr ? "تفعيل" : "Enable"}
          disabledLabel={isAr ? "تعطيل" : "Disable"}
        />
      </Card>
    </div>
  );
}
