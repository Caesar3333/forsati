import { PackageOpen } from "lucide-react";

export function EmptyState({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-200 bg-white/70 px-6 py-10 text-center">
      <div className="rounded-full bg-ink-100 p-3 text-ink-500">
        <PackageOpen className="h-5 w-5" />
      </div>
      <div className="text-base font-semibold text-ink-900">{title}</div>
      <p className="text-sm text-ink-500">{description}</p>
      {action}
    </div>
  );
}
