import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { blogPosts } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  return buildMetadata({ lang: params.lang, key: "blog", path: "/blog" });
}

export default function BlogPage({
  params
}: {
  params: { lang: "ar" | "en" };
}) {
  const isAr = params.lang === "ar";

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 lg:px-8">
      <SectionHeading
        title={isAr ? "مدونة فرصتي" : "Forsati Blog"}
        subtitle={
          isAr
            ? "قراءات قصيرة تساعدك على تطوير مسارك المهني."
            : "Short reads to sharpen your career journey."
        }
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="overflow-hidden">
            <div
              className={`h-32 bg-gradient-to-br ${post.cover}`}
              aria-hidden
            />
            <div className="space-y-3 p-5">
              <div className="flex flex-wrap gap-2 text-xs text-ink-500">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-lg font-semibold text-ink-900">
                {post.title[params.lang]}
              </h2>
              <p className="text-sm text-ink-500">
                {post.excerpt[params.lang]}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="info">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Link
                href={`/${params.lang}/blog/${post.slug}`}
                className="text-sm font-semibold text-brand-600"
              >
                {isAr ? "اقرأ المزيد" : "Read more"}
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
