export function AdminToggleRow({
  title,
  description,
  enabledLabel,
  disabledLabel
}: {
  title: string;
  description: string;
  enabledLabel: string;
  disabledLabel: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-ink-100 py-4 last:border-none">
      <div className="text-sm font-semibold text-ink-900">{title}</div>
      <div className="text-xs text-ink-500">{description}</div>
      <div className="flex items-center gap-2">
        <button className="rounded-full bg-emerald-500 px-4 py-1 text-xs text-white">
          {enabledLabel}
        </button>
        <button className="rounded-full bg-rose-500 px-4 py-1 text-xs text-white">
          {disabledLabel}
        </button>
      </div>
    </div>
  );
}
