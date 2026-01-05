"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { lang } = useLanguage();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query) {
      params.set("q", query);
    }
    router.push(`/${lang}/jobs?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
      <Search className="search-icon absolute top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={lang === "ar" ? "ابحث عن فرصة..." : "Search for a role..."}
        className="search-input"
      />
      <Button type="submit" className="sr-only">
        Search
      </Button>
    </form>
  );
}
