import { MdxRenderer } from "~/components/MdxRenderer";
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

  return <MdxRenderer source={post.content} />;
}
