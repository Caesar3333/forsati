import { VerificationCodeForm } from "@/components/auth/VerificationCodeForm";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "verifyMobile",
    path: "/auth/verify-mobile"
  });
}

export default function AuthVerifyMobilePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-4 py-10 lg:px-8">
      <VerificationCodeForm mode="mobile" />
    </div>
  );
}
