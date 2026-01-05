"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { forgotPassword } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const schema = z.object({
  email: z.string().email()
});

type FormValues = z.infer<typeof schema>;

export function ForgotPasswordForm() {
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
      const result = await forgotPassword(values);
      if (result.demo) {
        toast.info(isAr ? "تم الإرسال بوضع تجريبي." : "Sent in demo mode.");
      } else {
        toast.success(
          isAr ? "أرسلنا لك رابط الاستعادة." : "Recovery link sent."
        );
      }
    } catch (error) {
      toast.error(isAr ? "تعذر الإرسال." : "Unable to send.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "استعادة كلمة المرور" : "Reset password"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "أدخل بريدك لنرسل لك رابط الاستعادة."
            : "Enter your email to receive a reset link."}
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
              {isAr ? "بريد غير صالح" : "Invalid email"}
            </p>
          ) : null}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? isAr
              ? "جارٍ الإرسال..."
              : "Sending..."
            : isAr
              ? "إرسال الرابط"
              : "Send link"}
        </Button>
      </form>
    </Card>
  );
}
