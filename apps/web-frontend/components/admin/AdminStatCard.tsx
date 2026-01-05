import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function AdminStatCard({
  title,
  value,
  accent = "bg-brand-500"
}: {
  title: string;
  value: string;
  accent?: string;
}) {
  return (
    <Card className="flex items-center justify-between p-5">
      <div>
        <div className="text-xs text-ink-500">{title}</div>
        <div className="text-2xl font-semibold text-ink-900">{value}</div>
      </div>
      <span className={cn("h-3 w-10 rounded-full", accent)} />
    </Card>
  );
}
