import Link from "next/link";
import { cn } from "@/lib/utils";

type PaginationProps = {
  current: number;
  total: number;
  hrefBuilder: (page: number) => string;
};

export function Pagination({ current, total, hrefBuilder }: PaginationProps) {
  if (total <= 1) {
    return null;
  }

  const pages = Array.from({ length: total }, (_, i) => i + 1).slice(0, 6);

  return (
    <nav className="flex flex-wrap items-center gap-2">
      {pages.map((page) => (
        <Link
          key={page}
          href={hrefBuilder(page)}
          className={cn(
            "min-w-[2.5rem] rounded-full border px-3 py-2 text-center text-sm transition",
            page === current
              ? "border-brand-400 bg-brand-500 text-white"
              : "border-ink-200 text-ink-600 hover:border-brand-300 hover:text-brand-700"
          )}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
