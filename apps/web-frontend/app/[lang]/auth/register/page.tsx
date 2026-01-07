import { RegisterForm } from "@/components/auth/RegisterForm";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({
    lang: params.lang,
    key: "register",
    path: "/auth/register"
  });
}

export default function AuthRegisterPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-4 py-10 lg:px-8">
      <RegisterForm />
    </div>
  );
}
