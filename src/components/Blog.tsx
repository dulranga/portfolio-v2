import Link from "next/link";
import type { FC } from "react";
import { getAllPosts, type PostMetadata } from "~/lib/blog";

const Blog: FC = () => {
    const posts = getAllPosts().slice(0, 3); // Display top 3 for the landing page

    return (
        <div className="p-gap mx-auto mb-20">
            <section className="grid gap-12 p-8 md:p-12 lg:p-24 rounded-default relative border border-border overflow-hidden">
                <div>
                    <h2 className="text-4xl font-bold leading-16 md:text-5xl lg:text-7xl">
                        Blog
                    </h2>
                    <p className="text-xl font-semibold text-muted-foreground md:text-2xl mt-4">
                        Insights, guides, and thoughts on modern web
                        development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post: PostMetadata) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block h-full focus:outline-none"
                        >
                            <article className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-all hover:border-black hover:shadow-xl dark:hover:border-white">
                                <div>
                                    <div className="mb-6 text-sm font-medium text-muted-foreground">
                                        {new Date(post.date).toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            },
                                        )}
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold leading-tight group-hover:underline">
                                        {post.title}
                                    </h3>
                                </div>
                                <p className="line-clamp-3 text-lg leading-relaxed text-muted-foreground">
                                    {post.description}
                                </p>
                            </article>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link
                        href="/blog"
                        className="rounded-full bg-black px-10 py-5 text-lg font-bold text-white transition-transform hover:scale-105 active:scale-95 dark:bg-white dark:text-black"
                    >
                        View all posts
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Blog;
