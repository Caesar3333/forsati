import Link from "next/link";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { getDemoJobs } from "@/lib/api/demo-data";
import { formatJobType } from "@/lib/api/format";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "recruiterJobs",
    path: "/recruiter/jobs"
  });
}

export default function RecruiterJobsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const jobs = getDemoJobs(params.lang);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">
            {isAr ? "فرص الجهة" : "Company jobs"}
          </h1>
          <p className="text-sm text-ink-500">
            {isAr
              ? "إدارة الفرص المنشورة وتحديثها."
              : "Manage and update posted roles."}
          </p>
        </div>
        <Link href={`/${params.lang}/recruiter/jobs/new`}>
          <Button>
            <Plus className="h-4 w-4" />
            {isAr ? "إنشاء فرصة" : "Post a job"}
          </Button>
        </Link>
      </div>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm text-ink-500">{job.company}</div>
                <div className="text-base font-semibold text-ink-900">
                  {job.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge>{job.level}</Badge>
                  <Badge variant="info">
                    {formatJobType(job.type, params.lang)}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/${params.lang}/recruiter/jobs/${job.id}/applications`}>
                  <Button variant="outline" size="sm">
                    {isAr ? "طلبات المتقدمين" : "Applicants"}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  {isAr ? "تعديل" : "Edit"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
