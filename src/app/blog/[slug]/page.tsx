import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "~/lib/blog";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

const rehypeOptions: Options = {
  theme: {
    light: "one-light",
    dark: "one-dark-pro",
  },
  keepBackground: false,
};

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

  return (
    <MDXRemote
      source={post.content}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, rehypeOptions]],
        },
      }}
    />
  );
}
