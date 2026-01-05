"use client";

import { useState } from "react";
import { getInterviewQuestions } from "@/lib/api/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { toast } from "sonner";
import { DemoModeBanner } from "@/components/shared/DemoModeBanner";

export function MockInterview() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [demo, setDemo] = useState(false);

  const handleStart = async () => {
    if (!role.trim()) {
      toast.error(isAr ? "أدخل المسمى الوظيفي." : "Enter a role.");
      return;
    }
    setLoading(true);
    try {
      const response = await getInterviewQuestions(role);
      setDemo(response.demo);
      setQuestions(response.data.questions);
    } catch (error) {
      toast.error(isAr ? "تعذر تحميل الأسئلة." : "Unable to load questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <DemoModeBanner show={demo} />
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium text-ink-700">
              {isAr ? "المسمى الوظيفي" : "Role title"}
            </label>
            <Input
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder={isAr ? "مثال: مصمم UI/UX" : "e.g. UX Designer"}
            />
          </div>
          <Button onClick={handleStart} disabled={loading}>
            {loading
              ? isAr
                ? "جارٍ التحميل..."
                : "Loading..."
              : isAr
                ? "ابدأ المقابلة"
                : "Start interview"}
          </Button>
        </div>
      </Card>
      {questions.length > 0 ? (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <Card key={question} className="p-5">
              <div className="text-sm font-semibold text-ink-900">
                {isAr ? `السؤال ${index + 1}` : `Question ${index + 1}`}
              </div>
              <p className="mt-2 text-sm text-ink-600">{question}</p>
              <Textarea
                className="mt-4"
                placeholder={isAr ? "اكتب إجابتك..." : "Type your answer..."}
              />
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
