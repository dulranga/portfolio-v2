import Link from "next/link";

import { BlogSearch } from "~/components/BlogSearch";
import { Button } from "~/components/ui/button";
import { getAllPosts, type PostMetadata } from "~/lib/blog";
import { getBlogSearchPosts } from "~/lib/blog-search-data";

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const posts = getAllPosts();
  const searchPosts = getBlogSearchPosts();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialQuery = resolvedSearchParams?.q ?? "";

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="text-4xl font-bold">Blog</h1>

          <BlogSearch posts={searchPosts} initialQuery={initialQuery} />
        </div>
        <div className="grid gap-6">
          {posts.map((post: PostMetadata) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="mb-2 text-2xl font-bold hover:underline">
                  {post.title}
                </h2>
              </Link>
              <div className="mb-4 text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {post.author && ` • ${post.author}`}
              </div>
              <p className="mb-4 text-muted-foreground">{post.description}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
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
              <Link href={`/blog/${post.slug}`}>
                <Button variant="outline" className="rounded-full">
                  Read more
                </Button>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
