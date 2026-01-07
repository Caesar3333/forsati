"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { resetPassword } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const schema = z
  .object({
    email: z.string().email(),
    code: z.string().min(4),
    password: z.string().min(8),
    confirm: z.string().min(8)
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match"
  });

type FormValues = z.infer<typeof schema>;

export function ResetPasswordForm() {
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
      const result = await resetPassword({
        email: values.email,
        code: values.code,
        password: values.password
      });
      if (result.demo) {
        toast.info(isAr ? "تمت العملية في وضع العرض." : "Reset in demo mode.");
      } else {
        toast.success(isAr ? "تم تحديث كلمة المرور." : "Password updated.");
      }
    } catch (error) {
      toast.error(isAr ? "تعذر تحديث كلمة المرور." : "Unable to reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "تعيين كلمة مرور جديدة" : "Set a new password"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "استخدم رمز التحقق لإكمال العملية."
            : "Use the verification code to complete the reset."}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <Input
            type="email"
            placeholder={isAr ? "البريد الإلكتروني" : "Email"}
            {...register("email")}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-600">
              {isAr ? "البريد غير صحيح" : "Invalid email"}
            </p>
          ) : null}
        </div>
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
        <div>
          <Input
            type="password"
            placeholder={isAr ? "كلمة المرور الجديدة" : "New password"}
            {...register("password")}
          />
          {errors.password ? (
            <p className="mt-1 text-xs text-red-600">
              {isAr ? "كلمة المرور مطلوبة" : "Password is required"}
            </p>
          ) : null}
        </div>
        <div>
          <Input
            type="password"
            placeholder={isAr ? "تأكيد كلمة المرور" : "Confirm password"}
            {...register("confirm")}
          />
          {errors.confirm ? (
            <p className="mt-1 text-xs text-red-600">
              {isAr ? "كلمتا المرور غير متطابقتين" : "Passwords do not match"}
            </p>
          ) : null}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? isAr
              ? "جارٍ التحديث..."
              : "Updating..."
            : isAr
              ? "تحديث كلمة المرور"
              : "Update password"}
        </Button>
      </form>
    </Card>
  );
}
