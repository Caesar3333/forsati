import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en"; id: string };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "recruiterApplications",
    path: `/recruiter/jobs/${params.id}/applications`
  });
}

export default function JobApplicationsPage({
  params
}: {
  params: { lang: "ar" | "en"; id: string };
}) {
  const isAr = params.lang === "ar";
  const stages = [
    {
      label: isAr ? "تقديم" : "Applied",
      items: [
        { name: "ليان الزهراني", role: "مصممة UI/UX" },
        { name: "محمد العتيبي", role: "باحث تجربة" }
      ]
    },
    {
      label: isAr ? "فرز" : "Screening",
      items: [{ name: "سارة علي", role: "مصممة منتجات" }]
    },
    {
      label: isAr ? "مقابلة" : "Interview",
      items: [{ name: "عمر القحطاني", role: "مهندس Frontend" }]
    },
    {
      label: isAr ? "عرض" : "Offer",
      items: [{ name: "ليلى محمد", role: "مصممة UI" }]
    }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "طلبات المتقدمين" : "Applicants pipeline"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "تابع مراحل التوظيف لكل مرشح."
            : "Track hiring stages for each candidate."}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        {stages.map((stage) => (
          <Card key={stage.label} className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-ink-900">
                {stage.label}
              </div>
              <Badge variant="info">{stage.items.length}</Badge>
            </div>
            <div className="mt-3 space-y-3">
              {stage.items.map((candidate) => (
                <div
                  key={candidate.name}
                  className="rounded-xl border border-ink-100 bg-white px-3 py-2"
                >
                  <div className="text-sm font-semibold text-ink-900">
                    {candidate.name}
                  </div>
                  <div className="text-xs text-ink-500">
                    {candidate.role}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
