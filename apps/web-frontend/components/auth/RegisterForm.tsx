"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { register as registerUser } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

type FormValues = z.infer<typeof schema>;

export function RegisterForm() {
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
      const result = await registerUser(values);
      if (result.demo) {
        toast.info(isAr ? "تم إنشاء الحساب تجريبيًا." : "Account created (demo).");
      } else {
        toast.success(isAr ? "مرحبًا بك في فرصتي." : "Welcome to Forsati.");
      }
    } catch (error) {
      toast.error(isAr ? "تعذر إنشاء الحساب." : "Unable to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-ink-900">
          {isAr ? "إنشاء حساب" : "Create account"}
        </h1>
        <p className="text-sm text-ink-500">
          {isAr
            ? "ابدأ رحلتك المهنية مع فرصتي."
            : "Start your career journey with Forsati."}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <Input
            placeholder={isAr ? "الاسم الكامل" : "Full name"}
            {...register("name")}
          />
          {errors.name ? (
            <p className="mt-1 text-xs text-red-600">
              {isAr ? "الاسم مطلوب" : "Name is required"}
            </p>
          ) : null}
        </div>
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
              ? "جارٍ الإنشاء..."
              : "Creating..."
            : isAr
              ? "إنشاء حساب"
              : "Create account"}
        </Button>
      </form>
      <div className="mt-4 text-sm text-ink-500">
        {isAr ? "لديك حساب؟ " : "Already have an account? "}
        <Link href={`/${lang}/auth/login`} className="text-brand-600">
          {isAr ? "سجّل الدخول" : "Sign in"}
        </Link>
      </div>
    </Card>
  );
}
