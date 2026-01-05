"use client";

import { useState } from "react";
import { analyzeCv } from "@/lib/api/ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { toast } from "sonner";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";

export function CvAnalyzer() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [demo, setDemo] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    strengths: string[];
    improvements: string[];
  }>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error(isAr ? "أدخل نص السيرة أولاً." : "Paste your CV first.");
      return;
    }
    setLoading(true);
    try {
      const response = await analyzeCv(text);
      setDemo(response.demo);
      setResult(response.data);
    } catch (error) {
      toast.error(isAr ? "تعذر التحليل." : "Unable to analyze.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <DemoModeBanner show={demo} />
      <Card className="p-6">
        <Textarea
          placeholder={
            isAr
              ? "الصق نص السيرة الذاتية هنا..."
              : "Paste your CV content here..."
          }
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleAnalyze} disabled={loading}>
            {loading
              ? isAr
                ? "جارٍ التحليل..."
                : "Analyzing..."
              : isAr
                ? "حلّل السيرة"
                : "Analyze CV"}
          </Button>
        </div>
      </Card>
      {result ? (
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink-900">
              {isAr ? "النتيجة" : "Result"}
            </h2>
            <Badge variant="success">{result.score}%</Badge>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div>
              <div className="text-sm font-semibold text-ink-900">
                {isAr ? "نقاط القوة" : "Strengths"}
              </div>
              <ul className="list-pad mt-2 list-disc space-y-1 text-sm text-ink-500">
                {result.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-ink-900">
                {isAr ? "مجالات التحسين" : "Improvements"}
              </div>
              <ul className="list-pad mt-2 list-disc space-y-1 text-sm text-ink-500">
                {result.improvements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
