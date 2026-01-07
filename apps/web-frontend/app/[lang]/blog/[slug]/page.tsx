import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { lang: "ar" | "en"; slug: string };
}) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    return buildMetadata({ lang: params.lang, key: "blog", path: "/blog" });
  }
  return buildMetadata({
    lang: params.lang,
    key: "blog",
    path: `/blog/${params.slug}`,
    titleOverride: post.title[params.lang],
    descriptionOverride: post.excerpt[params.lang]
  });
}

export default function BlogDetailPage({
  params
}: {
  params: { lang: "ar" | "en"; slug: string };
}) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    notFound();
  }
  const isAr = params.lang === "ar";

  return (
    <article className="mx-auto max-w-4xl space-y-6 px-4 py-12 lg:px-8">
      <div className="space-y-3">
        <Link href={`/${params.lang}/blog`} className="text-sm text-brand-600">
          {isAr ? "العودة للمدونة" : "Back to blog"}
        </Link>
        <h1 className="text-3xl font-semibold text-ink-900">
          {post.title[params.lang]}
        </h1>
        <p className="text-sm text-ink-500">{post.excerpt[params.lang]}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="info">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className={`h-48 rounded-3xl bg-gradient-to-br ${post.cover}`} />
      <div className="space-y-4 text-sm text-ink-700">
        {post.content[params.lang].map((paragraph, index) => (
          <p key={`${post.slug}-${index}`}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
