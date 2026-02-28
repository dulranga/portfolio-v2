import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getAllPosts, type PostMetadata } from "~/lib/blog";

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-8 text-4xl font-bold">Blog</h1>
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
                                {new Date(post.date).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    },
                                )}
                                {post.author && ` • ${post.author}`}
                            </div>
                            <p className="mb-4 text-muted-foreground">
                                {post.description}
                            </p>
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
                                <Button
                                    variant="outline"
                                    className="rounded-full"
                                >
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
