import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  helper,
  accent = "bg-brand-500"
}: {
  label: string;
  value: string;
  helper?: string;
  accent?: string;
}) {
  return (
    <Card className="p-5">
      <div className={cn("h-2 w-10 rounded-full", accent)} />
      <div className="mt-4 text-sm text-ink-500">{label}</div>
      <div className="text-2xl font-semibold text-ink-900">{value}</div>
      {helper ? <div className="text-xs text-ink-400">{helper}</div> : null}
    </Card>
  );
}
