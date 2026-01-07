"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { login } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
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
      const result = await login(values);
      if (result.demo) {
        toast.info(isAr ? "تم الدخول بوضع تجريبي." : "Signed in (demo).");
      } else {
        toast.success(isAr ? "مرحبًا بك مجددًا." : "Welcome back.");
      }
    } catch (error) {
      toast.error(isAr ? "تعذر تسجيل الدخول." : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "تسجيل الدخول" : "Sign in"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "ادخل إلى حسابك لمتابعة الفرص."
            : "Access your account to track opportunities."}
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
        <div>
          <Input
            type="password"
            placeholder={isAr ? "كلمة المرور" : "Password"}
            {...register("password")}
          />
          {errors.password ? (
            <p className="mt-1 text-xs text-red-600">
              {isAr ? "كلمة المرور مطلوبة" : "Password is required"}
            </p>
          ) : null}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? isAr
              ? "جارٍ الدخول..."
              : "Signing in..."
            : isAr
              ? "تسجيل الدخول"
              : "Sign in"}
        </Button>
      </form>
      <div className="mt-4 flex items-center justify-between text-sm text-ink-500">
        <Link href={`/${lang}/auth/forgot-password`} className="text-brand-600">
          {isAr ? "نسيت كلمة المرور؟" : "Forgot password?"}
        </Link>
        <Link href={`/${lang}/auth/register`} className="text-brand-600">
          {isAr ? "إنشاء حساب" : "Create account"}
        </Link>
      </div>
    </Card>
  );
}
