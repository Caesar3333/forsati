"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const schema = z.object({
  name: z.string().min(2),
  title: z.string().min(2),
  summary: z.string().min(20)
});

type FormValues = z.infer<typeof schema>;

export function CvBuilderForm() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: isAr ? "ليان الزهراني" : "Layan Alzahrani",
      title: isAr ? "مصممة تجربة مستخدم" : "UX Designer",
      summary: isAr
        ? "مصممة تجربة مستخدم بخبرة في بناء منتجات رقمية تركّز على المستخدم."
        : "UX designer with experience in building human-centered digital products."
    }
  });

  const onSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      toast.success(isAr ? "تم حفظ السيرة." : "CV saved.");
      setLoading(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder={isAr ? "الاسم الكامل" : "Full name"} {...register("name")} />
        {errors.name ? (
          <p className="mt-1 text-xs text-red-600">
            {isAr ? "الاسم مطلوب" : "Name is required"}
          </p>
        ) : null}
      </div>
      <div>
        <Input placeholder={isAr ? "المسمى الوظيفي" : "Professional title"} {...register("title")} />
        {errors.title ? (
          <p className="mt-1 text-xs text-red-600">
            {isAr ? "المسمى مطلوب" : "Title is required"}
          </p>
        ) : null}
      </div>
      <div>
        <Textarea
          placeholder={isAr ? "نبذة مختصرة" : "Short summary"}
          {...register("summary")}
        />
        {errors.summary ? (
          <p className="mt-1 text-xs text-red-600">
            {isAr ? "أدخل نبذة مفصلة" : "Summary is required"}
          </p>
        ) : null}
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-700">
          {isAr ? "رفع ملف السيرة" : "Upload CV file"}
        </label>
        <input
          type="file"
          className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? (isAr ? "جارٍ الحفظ..." : "Saving...") : isAr ? "حفظ السيرة" : "Save CV"}
      </Button>
    </form>
  );
}
