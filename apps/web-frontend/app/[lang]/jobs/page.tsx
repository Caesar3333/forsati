import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { EmptyState } from "@/components/shared/EmptyState";
import { FilterSidebar } from "@/components/jobs/FilterSidebar";
import { JobCard } from "@/components/jobs/JobCard";
import { Pagination } from "@/components/ui/pagination";
import { searchOpportunities } from "@/lib/api/opportunities";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({ lang: params.lang, key: "jobs", path: "/jobs" });
}

type SearchParams = {
  q?: string;
  type?: string;
  level?: string;
  city?: string;
  category?: string;
  page?: string;
};

export default async function JobsPage({
  params,
  searchParams
}: {
  params: { lang: "ar" | "en" };
  searchParams: SearchParams;
}) {
  const page = Number(searchParams.page || "1");
  const { data, total, totalPages, demo } = await searchOpportunities(
    params.lang,
    {
      q: searchParams.q,
      type: searchParams.type,
      level: searchParams.level,
      city: searchParams.city,
      category: searchParams.category,
      page
    }
  );

  const queryParams = new URLSearchParams();
  if (searchParams.q) queryParams.set("q", searchParams.q);
  if (searchParams.type) queryParams.set("type", searchParams.type);
  if (searchParams.level) queryParams.set("level", searchParams.level);
  if (searchParams.city) queryParams.set("city", searchParams.city);
  if (searchParams.category) queryParams.set("category", searchParams.category);

  const buildHref = (nextPage: number) => {
    const paramsCopy = new URLSearchParams(queryParams);
    if (nextPage > 1) {
      paramsCopy.set("page", String(nextPage));
    }
    const query = paramsCopy.toString();
    return `/${params.lang}/jobs${query ? `?${query}` : ""}`;
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 lg:px-8">
      <DemoModeBanner show={demo} />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-72">
          <FilterSidebar />
        </div>
        <div className="flex-1 space-y-4">
          <div className="text-sm text-ink-500">
            {params.lang === "ar"
              ? `نتائج (${total})`
              : `Results (${total})`}
          </div>
          {data.length === 0 ? (
            <EmptyState
              title={params.lang === "ar" ? "لا توجد نتائج" : "No results"}
              description={
                params.lang === "ar"
                  ? "جرّب تعديل الكلمات المفتاحية أو الفلاتر."
                  : "Try adjusting your keywords or filters."
              }
            />
          ) : (
            data.map((job) => <JobCard key={job.id} job={job} />)
          )}
          <Pagination current={page} total={totalPages} hrefBuilder={buildHref} />
        </div>
      </div>
    </div>
  );
}
