import { type ReactNode } from "react";
import { getPostBySlug } from "~/lib/blog";

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <article className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 rounded-2xl border border-border bg-card p-8">
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
          <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.author && <span>• {post.author}</span>}
          </div>
          <p className="text-lg text-muted-foreground">{post.description}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-lg bg-secondary px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </article>
  );
}
