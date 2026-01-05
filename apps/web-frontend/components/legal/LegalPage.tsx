import { Card } from "@/components/ui/card";

type Section = { title: string; body: string };

export function LegalPage({
  title,
  intro,
  sections
}: {
  title: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">{title}</h1>
        <p className="text-sm text-ink-500">{intro}</p>
      </div>
      <div className="grid gap-4">
        {sections.map((section) => (
          <Card key={section.title} className="p-6">
            <h2 className="text-base font-semibold text-ink-900">
              {section.title}
            </h2>
            <p className="mt-2 text-sm text-ink-600">{section.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
