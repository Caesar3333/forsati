import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";
import { getDemoCandidates } from "@/lib/api/demo-data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "recruiterCandidates",
    path: "/recruiter/candidates/search"
  });
}

export default function CandidateSearchPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";
  const candidates = getDemoCandidates(params.lang);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 lg:px-8">
      <DemoModeBanner show />
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "بحث المرشحين" : "Candidate search"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "اعثر على المرشحين الأنسب بحسب المهارات."
            : "Find the right candidates by skills."}
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-2xl border border-ink-200 bg-white px-3 py-2">
        <Search className="h-4 w-4 text-ink-400" />
        <Input
          placeholder={isAr ? "بحث بالمهارات أو المسمى" : "Search by skills or role"}
          className="border-none focus:ring-0"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-ink-900">
                  {candidate.name}
                </div>
                <div className="text-xs text-ink-500">{candidate.role}</div>
              </div>
              <Badge variant="success">{candidate.score}%</Badge>
            </div>
            <div className="mt-3 text-xs text-ink-500">
              {candidate.location} • {candidate.availability}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
