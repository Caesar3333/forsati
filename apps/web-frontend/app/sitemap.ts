import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://forsati.example";
  const routes = [
    "",
    "/jobs",
    "/login",
    "/register",
    "/forgot-password",
    "/check-email",
    "/companies/demo",
    "/me",
    "/me/applications",
    "/me/saved",
    "/me/cv",
    "/me/ai/cv-analyzer",
    "/me/ai/mock-interview",
    "/me/verification",
    "/recruiter/dashboard",
    "/recruiter/jobs",
    "/recruiter/jobs/new",
    "/recruiter/candidates/search",
    "/recruiter/reports",
    "/about",
    "/privacy",
    "/cookies",
    "/terms",
    "/security",
    "/ai-disclaimer"
  ];
  const languages = ["ar", "en"];
  const now = new Date();

  return languages.flatMap((lang) =>
    routes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: now
    }))
  );
}
