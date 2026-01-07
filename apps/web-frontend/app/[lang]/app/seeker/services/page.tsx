import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";

export default function SeekerServicesPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const services = [
    {
      title: isAr ? "مراجعة السيرة الذاتية" : "CV Review",
      provider: isAr ? "مدرب مهني" : "Career Coach",
      status: isAr ? "متاح" : "Available",
      price: "25"
    },
    {
      title: isAr ? "تحضير للمقابلة" : "Interview Prep",
      provider: isAr ? "خبير موارد بشرية" : "HR Expert",
      status: isAr ? "متاح" : "Available",
      price: "40"
    },
    {
      title: isAr ? "استراتيجية البحث عن عمل" : "Job Search Strategy",
      provider: isAr ? "مستشار توظيف" : "Hiring Advisor",
      status: isAr ? "جديد" : "New",
      price: "35"
    }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "خدمات السوق" : "Marketplace services"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "اطلب خدمة من خبراء فرصتي لتحسين فرصك."
            : "Request services from vetted Forsati providers."}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-semibold text-ink-900">
                  {service.title}
                </div>
                <div className="text-xs text-ink-500">{service.provider}</div>
              </div>
              <Badge variant="info">{service.status}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-ink-600">
              <span>{isAr ? "السعر" : "Price"}</span>
              <span className="font-semibold text-ink-900">${service.price}</span>
            </div>
            <Button className="w-full">
              {isAr ? "طلب الخدمة" : "Request service"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
