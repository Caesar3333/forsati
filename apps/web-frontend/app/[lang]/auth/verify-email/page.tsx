import { VerificationCodeForm } from "@/components/auth/VerificationCodeForm";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "verifyEmail",
    path: "/auth/verify-email"
  });
}

export default function AuthVerifyEmailPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-4 py-10 lg:px-8">
      <VerificationCodeForm mode="email" />
    </div>
  );
}
