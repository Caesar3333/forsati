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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost";
const siteName = "Forsati";
const siteNameAr = "\u0641\u0631\u0635\u062a\u064a";
const description =
  "Forsati (\u0641\u0631\u0635\u062a\u064a) connects talent with jobs, training, volunteering, and marketplace services powered by AI.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName} | ${siteNameAr}`,
    template: `%s | ${siteName}`
  },
  description,
  openGraph: {
    title: `${siteName} | ${siteNameAr}`,
    description,
    type: "website",
    url: baseUrl,
    images: [
      {
        url: "/brand/forsati/og-image.png",
        width: 1200,
        height: 630,
        alt: "Forsati"
      }
    ]
  },
  icons: {
    icon: [
      {
        url: "/brand/forsati/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        url: "/brand/forsati/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      }
    ],
    apple: "/brand/forsati/apple-touch-icon.png",
    shortcut: "/brand/forsati/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${arabic.variable} bg-sand text-ink-900 antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
