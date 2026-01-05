import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const arabic = Tajawal({
  subsets: ["arabic"],
  variable: "--font-ar",
  weight: ["400", "500", "700"],
  display: "swap"
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://forsati.example";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "فرصتي | Forsati",
    template: "%s | فرصتي"
  },
  description:
    "منصة فرصتي لاكتشاف الوظائف، التدريب، والتطوع مع أدوات ذكية للسيرة الذاتية والمقابلات.",
  openGraph: {
    title: "فرصتي | Forsati",
    description:
      "منصة فرصتي لاكتشاف الوظائف، التدريب، والتطوع مع أدوات ذكية للسيرة الذاتية والمقابلات.",
    type: "website",
    url: baseUrl
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${arabic.variable} bg-sand text-ink-900 antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
