import { Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({ lang: params.lang, key: "contact", path: "/contact" });
}

export default function ContactPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 lg:px-8">
      <SectionHeading
        title={isAr ? "تواصل معنا" : "Contact Forsati"}
        subtitle={
          isAr
            ? "فريق فرصتي جاهز للإجابة عن استفساراتك."
            : "We are here to help you and your team."
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card className="space-y-4 p-6">
          <div className="flex items-center gap-3 text-sm text-ink-600">
            <Phone className="h-4 w-4 text-brand-500" />
            +966 000 000 000
          </div>
          <div className="flex items-center gap-3 text-sm text-ink-600">
            <Mail className="h-4 w-4 text-brand-500" />
            support@forsati.example
          </div>
          <div className="flex items-center gap-3 text-sm text-ink-600">
            <MapPin className="h-4 w-4 text-brand-500" />
            {isAr ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}
          </div>
          <p className="text-sm text-ink-500">
            {isAr
              ? "يمكنك التواصل معنا بخصوص الدعم الفني أو الشراكات."
              : "Reach us for support, partnerships, or enterprise plans."}
          </p>
        </Card>
        <Card className="space-y-4 p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder={isAr ? "الاسم الكامل" : "Full name"} />
            <Input placeholder={isAr ? "البريد الإلكتروني" : "Email"} />
          </div>
          <Input placeholder={isAr ? "موضوع الرسالة" : "Subject"} />
          <Textarea
            rows={5}
            placeholder={isAr ? "اكتب رسالتك هنا" : "Write your message"}
          />
          <Button>{isAr ? "إرسال الرسالة" : "Send message"}</Button>
        </Card>
      </div>
    </div>
  );
}
