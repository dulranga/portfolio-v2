import { Dot } from "lucide-react";
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
    <article className="container mx-auto px-4 py-16 min-h-screen">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 rounded-2xl border border-border bg-card p-8">
          <h1 className="mb-4 text-5xl font-extrabold">{post.title}</h1>
          <div className="mb-4 flex flex-wrap gap-1 items-center text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <Dot />
            {post.author && <span> {post.author}</span>}
          </div>
          <p className="text-lg text-muted-foreground">{post.description}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-lg bg-secondary px-3 py-1 text-sm font-medium border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
