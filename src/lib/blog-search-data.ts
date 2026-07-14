import fs from "node:fs";
import path from "node:path";

import type { ContentIndexHeading } from "~/lib/content-index";
import type { BlogSearchPost } from "~/lib/blog-search";

type GeneratedBlogFrontmatter = {
    title: string;
    date: string;
    description: string;
    author?: string;
    tags?: string[];
};

type GeneratedBlogEntry = {
    slug: string;
    frontmatter: GeneratedBlogFrontmatter;
    headings: ContentIndexHeading[];
};

type GeneratedBlogIndex = {
    posts?: GeneratedBlogEntry[];
};

const generatedIndexPath = path.join(
    process.cwd(),
    "src/content/__generated_index.json",
);

function readBlogSearchPosts(): BlogSearchPost[] {
    if (!fs.existsSync(generatedIndexPath)) {
        return [];
    }

    try {
        const fileContents = fs.readFileSync(generatedIndexPath, "utf8");
        const generatedIndex = JSON.parse(fileContents) as GeneratedBlogIndex;

        return (generatedIndex.posts ?? []).map((entry) => ({
            slug: entry.slug,
            title: entry.frontmatter.title,
            date: entry.frontmatter.date,
            description: entry.frontmatter.description,
            author: entry.frontmatter.author,
            tags: entry.frontmatter.tags ?? [],
            headings: entry.headings,
        }));
    } catch (error) {
        console.error("Error reading generated blog search index:", error);
        return [];
    }
}

export function getBlogSearchPosts(): BlogSearchPost[] {
    return readBlogSearchPosts().sort((left, right) => {
        if (left.date < right.date) {
            return 1;
        }

        if (left.date > right.date) {
            return -1;
        }

        return left.title.localeCompare(right.title);
    });
}