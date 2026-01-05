import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Building2, Briefcase } from "lucide-react";
import { getOpportunity } from "@/lib/api/opportunities";
import { getDemoJobs } from "@/lib/api/demo-data";
import { formatJobType } from "@/lib/api/format";
import { JobApplyForm } from "@/components/jobs/JobApplyForm";
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
    key: "jobDetails",
    path: `/jobs/${params.id}`
  });
}

export default async function JobDetailsPage({
  params
}: {
  params: { lang: "ar" | "en"; id: string };
}) {
  const { job, demo } = await getOpportunity(params.lang, params.id);
  if (!job) {
    notFound();
  }
  const isAr = params.lang === "ar";
  const related = getDemoJobs(params.lang).filter((item) => item.id !== job.id);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 lg:px-8">
      <DemoModeBanner show={demo} />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div>
            <div className="text-sm text-ink-500">{job.company}</div>
            <h1 className="text-3xl font-semibold text-ink-900">{job.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-brand-500" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-brand-500" />
                {job.level}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4 text-brand-500" />
                {formatJobType(job.type, params.lang)}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-ink-900">
              {isAr ? "وصف الوظيفة" : "Job description"}
            </h2>
            <p className="mt-2 text-sm text-ink-600">{job.description}</p>
            <h3 className="mt-5 text-base font-semibold text-ink-900">
              {isAr ? "المتطلبات" : "Requirements"}
            </h3>
            <ul className="list-pad mt-2 list-disc space-y-1 text-sm text-ink-600">
              {job.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="mt-5 text-base font-semibold text-ink-900">
              {isAr ? "المزايا" : "Benefits"}
            </h3>
            <ul className="list-pad mt-2 list-disc space-y-1 text-sm text-ink-600">
              {job.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <div className="text-sm text-ink-500">
              {isAr ? "الراتب المتوقع" : "Expected salary"}
            </div>
            <div className="text-xl font-semibold text-ink-900">
              {job.salary}
            </div>
            <div className="mt-4 text-sm text-ink-500">
              {isAr ? "آخر تحديث" : "Last update"}: {job.postedAt}
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-ink-900">
              {isAr ? "قدّم على الفرصة" : "Apply to this job"}
            </h2>
            <p className="mt-2 text-xs text-ink-500">
              {isAr
                ? "لن تتم مشاركة بياناتك إلا بعد موافقتك."
                : "Your data is shared only with your approval."}
            </p>
            <div className="mt-4">
              <JobApplyForm jobId={job.id} />
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-ink-900">
          {isAr ? "فرص مشابهة" : "Similar opportunities"}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {related.slice(0, 2).map((item) => (
            <Card key={item.id} className="p-5">
              <div className="text-sm text-ink-500">{item.company}</div>
              <div className="text-base font-semibold text-ink-900">
                {item.title}
              </div>
              <Link
                href={`/${params.lang}/jobs/${item.id}`}
                className="mt-3 inline-flex items-center gap-1 text-sm text-brand-600"
              >
                {isAr ? "عرض التفاصيل" : "View details"}
                <ArrowRight className="h-4 w-4 flip-rtl" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
