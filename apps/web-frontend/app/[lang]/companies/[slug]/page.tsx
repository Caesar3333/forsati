import Link from "next/link";
import { Building2, MapPin, Users, Globe } from "lucide-react";
import { getCompany } from "@/lib/api/companies";
import { getDemoJobs } from "@/lib/api/demo-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en"; slug: string };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "company",
    path: `/companies/${params.slug}`
  });
}

export default async function CompanyProfile({
  params
}: {
  params: { lang: "ar" | "en"; slug: string };
}) {
  const { company, demo } = await getCompany(params.lang, params.slug);
  const isAr = params.lang === "ar";
  if (!company) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
        <Card className="p-6">
          <h1 className="text-xl font-semibold text-ink-900">
            {isAr ? "الجهة غير موجودة" : "Company not found"}
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            {isAr
              ? "تحقق من الرابط أو جرّب جهة أخرى."
              : "Check the link or try another company."}
          </p>
        </Card>
      </div>
    );
  }

  const jobs = getDemoJobs(params.lang).filter(
    (job) => job.company === company.name
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 lg:px-8">
      <DemoModeBanner show={demo} />
      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm text-ink-500">{company.industry}</div>
            <h1 className="text-2xl font-semibold text-ink-900">
              {company.name}
            </h1>
            <p className="mt-2 text-sm text-ink-500">{company.about}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-ink-600">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-brand-500" />
              {company.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4 text-brand-500" />
              {company.size}
            </span>
            <a
              href={company.website}
              className="flex items-center gap-1 text-brand-600"
            >
              <Globe className="h-4 w-4" />
              {isAr ? "الموقع الرسمي" : "Website"}
            </a>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-ink-900">
          {isAr ? "الفرص المفتوحة" : "Open roles"}
        </h2>
        {jobs.length === 0 ? (
          <Card className="p-6 text-sm text-ink-500">
            {isAr
              ? "لا توجد فرص حالية، جرّب لاحقًا."
              : "No open roles right now."}
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <Card key={job.id} className="p-5">
                <div className="text-sm text-ink-500">{job.company}</div>
                <div className="text-base font-semibold text-ink-900">
                  {job.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge>{job.level}</Badge>
                  <Badge variant="info">{job.salary}</Badge>
                </div>
                <Link
                  href={`/${params.lang}/jobs/${job.id}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-brand-600"
                >
                  {isAr ? "عرض التفاصيل" : "View details"}
                  <Building2 className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

