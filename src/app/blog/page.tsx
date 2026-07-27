import type { Metadata } from "next";
import Link from "next/link";

import { BlogSearch } from "~/components/blog-search";
import { Button } from "~/components/ui/button";
import { getAllPosts, type PostMetadata } from "~/lib/blog";
import { getBlogSearchPosts } from "~/lib/blog-search-data";

export async function generateMetadata(): Promise<Metadata> {
  const posts = getAllPosts();
  const searchPosts = getBlogSearchPosts();
  const keywordSet = new Set<string>([
    "blog",
    "articles",
    "frontend development",
    "web development",
    "react",
    "next.js",
    "typescript",
  ]);

  for (const post of posts) {
    keywordSet.add(post.title);
    keywordSet.add(post.description);

    for (const tag of post.tags ?? []) {
      keywordSet.add(tag);
    }
  }

  for (const post of searchPosts) {
    for (const heading of post.headings) {
      keywordSet.add(heading.text);
    }
  }

  return {
    title: "Blog | Dulranga Dhawanitha",
    description:
      "Read articles on algorithms, SQL, recursion, internationalization, and practical frontend development notes.",
    keywords: Array.from(keywordSet),
    authors: [{ name: "Dulranga Dhawanitha" }],
    creator: "Dulranga Dhawanitha",
    publisher: "Dulranga Dhawanitha",
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/blog",
      title: "Blog | Dulranga Dhawanitha",
      description:
        "Read articles on algorithms, SQL, recursion, internationalization, and practical frontend development notes.",
      siteName: "Dulranga Dhawanitha Portfolio",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Dulranga Dhawanitha Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | Dulranga Dhawanitha",
      description:
        "Read articles on algorithms, SQL, recursion, internationalization, and practical frontend development notes.",
      images: ["/og-image.png"],
      creator: "@dulrangaD",
    },
  };
}

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
