import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 py-12 text-center">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-ink-400">
          {"Forsati / \u0641\u0631\u0635\u062a\u064a"}
        </p>
        <h1 className="text-3xl font-semibold text-ink-900 lg:text-4xl">
          Choose your language
        </h1>
        <p className="text-sm text-ink-500">
          {"\u0627\u062e\u062a\u0631 \u0644\u063a\u062a\u0643 \u0644\u0644\u0645\u062a\u0627\u0628\u0639\u0629"}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/ar"
          className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-soft"
        >
          {"\u0627\u0644\u0639\u0631\u0628\u064a\u0629"}
        </Link>
        <Link
          href="/en"
          className="rounded-full border border-ink-200 px-5 py-2 text-sm font-semibold text-ink-700 hover:border-brand-200"
        >
          English
        </Link>
      </div>
    </div>
  );
}
