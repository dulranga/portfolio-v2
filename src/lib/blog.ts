import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface PostMetadata {
    title: string;
    date: string;
    description: string;
    author?: string;
    tags?: string[];
    slug: string;
}

export interface Post extends PostMetadata {
    content: string;
}

/**
 * Get all posts from the content directory
 * Returns array of post metadata sorted by date (newest first)
 */
export function getAllPosts(): PostMetadata[] {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title as string,
                date: data.date as string,
                description: data.description as string,
                author: data.author as string | undefined,
                tags: data.tags as string[] | undefined,
            };
        });

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        }
        return -1;
    });
}

/**
 * Get a single post by slug
 * Returns post metadata and content
 */
export function getPostBySlug(slug: string): Post {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title as string,
            date: data.date as string,
            description: data.description as string,
            author: data.author as string | undefined,
            tags: data.tags as string[] | undefined,
            content,
        };
    } catch (error) {
        console.error(`Error fetching post with slug "${slug}":`, error);
        notFound();
    }
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs(): string[] {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
