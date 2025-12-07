import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "~/lib/blog";

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

  // Get the post content without frontmatter using gray-matter
  const post = getPostBySlug(slug);

  return <MDXRemote source={post.content} />;
}
