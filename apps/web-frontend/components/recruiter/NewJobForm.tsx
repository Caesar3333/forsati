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
  title: z.string().min(2),
  location: z.string().min(2),
  salary: z.string().min(2),
  description: z.string().min(20)
});

type FormValues = z.infer<typeof schema>;

export function NewJobForm() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      toast.success(isAr ? "تم إنشاء الفرصة." : "Job posted.");
      setLoading(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder={isAr ? "المسمى الوظيفي" : "Job title"}
          {...register("title")}
        />
        {errors.title ? (
          <p className="mt-1 text-xs text-red-600">
            {isAr ? "المسمى مطلوب" : "Title is required"}
          </p>
        ) : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Input
            placeholder={isAr ? "الموقع" : "Location"}
            {...register("location")}
          />
          {errors.location ? (
            <p className="mt-1 text-xs text-red-600">
              {isAr ? "الموقع مطلوب" : "Location is required"}
            </p>
          ) : null}
        </div>
        <div>
          <Input
            placeholder={isAr ? "نطاق الراتب" : "Salary range"}
            {...register("salary")}
          />
          {errors.salary ? (
            <p className="mt-1 text-xs text-red-600">
              {isAr ? "الراتب مطلوب" : "Salary is required"}
            </p>
          ) : null}
        </div>
      </div>
      <div>
        <Textarea
          placeholder={isAr ? "وصف الوظيفة" : "Job description"}
          {...register("description")}
        />
        {errors.description ? (
          <p className="mt-1 text-xs text-red-600">
            {isAr ? "الوصف مطلوب" : "Description is required"}
          </p>
        ) : null}
      </div>
      <Button type="submit" disabled={loading}>
        {loading
          ? isAr
            ? "جارٍ النشر..."
            : "Publishing..."
          : isAr
            ? "نشر الفرصة"
            : "Post job"}
      </Button>
    </form>
  );
}
