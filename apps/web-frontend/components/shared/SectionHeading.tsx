export function SectionHeading({
  title,
  subtitle
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-ink-900 lg:text-3xl">
        {title}
      </h2>
      {subtitle ? <p className="text-sm text-ink-500">{subtitle}</p> : null}
    </div>
  );
}
