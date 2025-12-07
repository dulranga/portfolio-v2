import { getAllPostSlugs } from "~/lib/blog";

// Dynamic params for static generation
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Dynamically import the MDX file
  const Post = (await import(`~/content/posts/${slug}.mdx`)).default;

  return <Post />;
}
