import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { getDemoJobs } from "@/lib/api/demo-data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "saved",
    path: "/me/saved"
  });
}

export default function SavedJobsPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const saved = getDemoJobs(params.lang).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "الوظائف المحفوظة" : "Saved jobs"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "احفظ الفرص لتعود لها لاحقًا."
            : "Keep your favorite opportunities here."}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {saved.map((job) => (
          <Card key={job.id} className="p-5">
            <div className="text-sm text-ink-500">{job.company}</div>
            <div className="text-base font-semibold text-ink-900">
              {job.title}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge>{job.level}</Badge>
              <Badge variant="info">{job.salary}</Badge>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Link href={`/${params.lang}/jobs/${job.id}`}>
                <Button variant="outline" size="sm">
                  {isAr ? "عرض" : "View"}
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                {isAr ? "إزالة" : "Remove"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
