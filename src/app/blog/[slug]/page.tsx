import type { Metadata } from "next";
import { MdxRenderer } from "~/components/MdxRenderer";
import { getContentTableOfContents } from "~/lib/content-index";
import { getAllPostSlugs, getPostBySlug } from "~/lib/blog";

// Dynamic params for static generation
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const tableOfContents = getContentTableOfContents("src/content/posts", slug);
  const keywordSet = new Set<string>([
    post.title,
    post.description,
    "blog",
    "article",
    "frontend development",
  ]);

  for (const tag of post.tags ?? []) {
    keywordSet.add(tag);
  }

  for (const heading of tableOfContents) {
    keywordSet.add(heading.text);
  }

  return {
    title: `${post.title} | Blog | Dulranga Dhawanitha`,
    description: post.description,
    keywords: Array.from(keywordSet),
    authors: post.author ? [{ name: post.author }] : [{ name: "Dulranga Dhawanitha" }],
    creator: post.author ?? "Dulranga Dhawanitha",
    publisher: "Dulranga Dhawanitha",
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `/blog/${slug}`,
      title: `${post.title} | Blog | Dulranga Dhawanitha`,
      description: post.description,
      siteName: "Dulranga Dhawanitha Portfolio",
      publishedTime: post.date,
      authors: post.author ? [post.author] : ["Dulranga Dhawanitha"],
      tags: post.tags,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog | Dulranga Dhawanitha`,
      description: post.description,
      images: ["/og-image.png"],
      creator: "@dulrangaD",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Get the post content without frontmatter using gray-matter
  const post = getPostBySlug(slug);
  const tableOfContents = getContentTableOfContents("src/content/posts", slug);

  return (
    <MdxRenderer source={post.content} tableOfContents={tableOfContents} />
  );
}
