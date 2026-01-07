import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost";
  const routes = [
    "",
    "/jobs",
    "/pricing",
    "/faq",
    "/blog",
    "/contact",
    "/legal/terms",
    "/legal/privacy",
    "/legal/ai-disclaimer",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/verify-email",
    "/auth/verify-mobile",
    "/app/seeker/dashboard",
    "/app/seeker/opportunities",
    "/app/seeker/applications",
    "/app/seeker/saved",
    "/app/seeker/services",
    "/app/org/dashboard",
    "/app/org/opportunities",
    "/app/org/opportunities/create",
    "/app/org/applicants",
    "/app/provider/dashboard",
    "/app/provider/services",
    "/app/provider/orders",
    "/app/admin/dashboard",
    "/app/admin/users",
    "/app/admin/roles",
    "/app/admin/organizations",
    "/app/admin/opportunities",
    "/app/admin/providers",
    "/app/admin/plans",
    "/app/admin/settings",
    "/app/admin/content"
  ];
  const languages = ["ar", "en"];
  const now = new Date();

  const staticRoutes = languages.flatMap((lang) =>
    routes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: now
    }))
  );

  const blogRoutes = languages.flatMap((lang) =>
    blogPosts.map((post) => ({
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      lastModified: now
    }))
  );

  return [...staticRoutes, ...blogRoutes];
}
