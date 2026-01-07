"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { verifyEmail, verifyMobile } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const schema = z.object({
  code: z.string().min(4)
});

type FormValues = z.infer<typeof schema>;

export function VerificationCodeForm({
  mode
}: {
  mode: "email" | "mobile";
}) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const result =
        mode === "email"
          ? await verifyEmail(values)
          : await verifyMobile(values);
      if (result.demo) {
        toast.info(isAr ? "تم التحقق في وضع العرض." : "Verified in demo mode.");
      } else {
        toast.success(isAr ? "تم التحقق بنجاح." : "Verified successfully.");
      }
    } catch (error) {
      toast.error(isAr ? "تعذر التحقق." : "Unable to verify.");
    } finally {
      setLoading(false);
    }
  };

  const title =
    mode === "email"
      ? isAr
        ? "تأكيد البريد الإلكتروني"
        : "Verify email"
      : isAr
        ? "تأكيد رقم الجوال"
        : "Verify mobile";
  const subtitle =
    mode === "email"
      ? isAr
        ? "أدخل رمز التحقق المرسل إلى بريدك."
        : "Enter the code sent to your email."
      : isAr
        ? "أدخل رمز التحقق المرسل إلى جوالك."
        : "Enter the code sent to your phone.";

  return (
    <Card className="mx-auto w-full max-w-md p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-ink-900">{title}</h1>
        <p className="text-sm text-ink-500">{subtitle}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <Input
            placeholder={isAr ? "رمز التحقق" : "Verification code"}
            {...register("code")}
          />
          {errors.code ? (
            <p className="mt-1 text-xs text-red-600">
              {isAr ? "الرمز مطلوب" : "Code is required"}
            </p>
          ) : null}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? isAr
              ? "جارٍ التحقق..."
              : "Verifying..."
            : isAr
              ? "تأكيد الرمز"
              : "Confirm code"}
        </Button>
      </form>
    </Card>
  );
}
