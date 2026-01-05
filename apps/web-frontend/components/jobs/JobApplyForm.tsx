"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { applyToOpportunity } from "@/lib/api/opportunities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

type FormValues = z.infer<typeof schema>;

export function JobApplyForm({ jobId }: { jobId: string }) {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const result = await applyToOpportunity(jobId, values);
      if (result.demo) {
        toast.info(
          lang === "ar"
            ? "تم التقديم في وضع تجريبي."
            : "Applied in demo mode."
        );
      } else {
        toast.success(
          lang === "ar" ? "تم إرسال طلبك بنجاح." : "Application submitted."
        );
      }
    } catch (error) {
      toast.error(
        lang === "ar" ? "حدث خطأ أثناء التقديم." : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Input
          placeholder={lang === "ar" ? "الاسم الكامل" : "Full name"}
          {...register("name")}
        />
        {errors.name ? (
          <p className="mt-1 text-xs text-red-600">
            {lang === "ar" ? "الاسم مطلوب" : "Name is required"}
          </p>
        ) : null}
      </div>
      <div>
        <Input
          type="email"
          placeholder={lang === "ar" ? "البريد الإلكتروني" : "Email"}
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-1 text-xs text-red-600">
            {lang === "ar" ? "بريد غير صالح" : "Invalid email"}
          </p>
        ) : null}
      </div>
      <div>
        <Textarea
          placeholder={lang === "ar" ? "رسالة مختصرة" : "Short message"}
          {...register("message")}
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-red-600">
            {lang === "ar" ? "أدخل رسالة مختصرة" : "Message is required"}
          </p>
        ) : null}
      </div>
      <Button type="submit" disabled={loading}>
        {loading
          ? lang === "ar"
            ? "جارٍ الإرسال..."
            : "Submitting..."
          : lang === "ar"
            ? "قدّم الآن"
            : "Apply now"}
      </Button>
    </form>
  );
}
