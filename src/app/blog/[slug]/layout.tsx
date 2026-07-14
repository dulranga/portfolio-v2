import { Dot } from "lucide-react";
import type { ReactNode } from "react";
import { TableOfContents } from "~/components/TableOfContents";
import { getContentTableOfContents } from "~/lib/content-index";
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
  const tableOfContents = getContentTableOfContents("src/content/posts", slug);

  return (
    <article className="container mx-auto min-h-screen px-4 py-16 lg:px-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="min-w-0">
          <div className="mx-auto max-w-4xl">
            <header className="mb-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h1 className="mb-4 text-5xl font-extrabold">{post.title}</h1>
              <div className="mb-4 flex flex-wrap items-center gap-1 text-muted-foreground">
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
              <p className="text-lg text-muted-foreground">
                {post.description}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-border bg-secondary px-3 py-1 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-lg">
              {children}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border p-5 shadow-sm">
            <TableOfContents headings={tableOfContents} />
          </div>
        </aside>
      </div>
    </article>
  );
}
