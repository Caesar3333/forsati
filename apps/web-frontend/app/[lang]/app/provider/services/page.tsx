import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";

export default function ProviderServicesPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const services = [
    {
      title: isAr ? "مراجعة السيرة الذاتية" : "CV Review",
      status: isAr ? "منشور" : "Published",
      price: "$25"
    },
    {
      title: isAr ? "تحضير للمقابلة" : "Interview Prep",
      status: isAr ? "مسودة" : "Draft",
      price: "$40"
    }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">
            {isAr ? "خدماتي" : "My services"}
          </h1>
          <p className="text-sm text-ink-500">
            {isAr
              ? "أضف أو حدّث خدماتك في السوق."
              : "Manage your marketplace offerings."}
          </p>
        </div>
        <Button>{isAr ? "إضافة خدمة" : "Add service"}</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="space-y-3 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-ink-900">
                {service.title}
              </div>
              <Badge variant="info">{service.status}</Badge>
            </div>
            <div className="text-sm text-ink-600">{service.price}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                {isAr ? "تعديل" : "Edit"}
              </Button>
              <Button variant="ghost" size="sm">
                {isAr ? "إيقاف" : "Pause"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
