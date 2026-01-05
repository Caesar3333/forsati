"use client";

import Link from "next/link";
import { MapPin, Briefcase, Banknote, ArrowRight } from "lucide-react";
import type { Job } from "@/lib/api/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function JobCard({ job }: { job: Job }) {
  const { lang } = useLanguage();

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="text-lg font-semibold text-ink-900">{job.title}</div>
          <div className="text-sm text-ink-500">{job.company}</div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-brand-500" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-brand-500" />
              {job.level}
            </span>
            <span className="flex items-center gap-1">
              <Banknote className="h-4 w-4 text-brand-500" />
              {job.salary}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <Badge variant="info">{job.postedAt}</Badge>
          <Link href={`/${lang}/jobs/${job.id}`}>
            <Button variant="outline" size="sm">
              {lang === "ar" ? "تفاصيل الفرصة" : "View details"}
              <ArrowRight className="h-4 w-4 flip-rtl" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
