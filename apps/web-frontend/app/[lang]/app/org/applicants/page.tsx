import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";

export default function OrgApplicantsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const applicants = [
    { name: "Rana Khalil", role: isAr ? "مصممة واجهات" : "UI Designer", stage: "Screening" },
    { name: "Omar Saad", role: isAr ? "محلل بيانات" : "Data Analyst", stage: "Interview" },
    { name: "Lina Hassan", role: isAr ? "مهندس برمجيات" : "Software Engineer", stage: "Offer" }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "قائمة المتقدمين" : "Applicants overview"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "راجع حالة المتقدمين عبر المراحل المختلفة."
            : "Review applicants across hiring stages."}
        </p>
      </div>
      <div className="space-y-3">
        {applicants.map((applicant) => (
          <Card key={applicant.name} className="flex items-center justify-between p-5">
            <div>
              <div className="text-sm font-semibold text-ink-900">
                {applicant.name}
              </div>
              <div className="text-xs text-ink-500">{applicant.role}</div>
            </div>
            <Badge variant="info">{applicant.stage}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
