import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

export interface ProjectMetadata {
  title: string;
  date: string;
  description: string;
  image: string;
  author?: string;
  tags?: string[];
  tech: string[];
  slug: string;
}

export interface ProjectContent extends ProjectMetadata {
  content: string;
}

/**
 * Get all project posts from the content/projects directory
 */
export function getAllProjectPosts(): ProjectMetadata[] {
  if (!fs.existsSync(projectsDirectory)) return [];

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        image: data.image as string,
        author: data.author as string | undefined,
        tags: data.tags as string[] | undefined,
        tech: (data.tech as string[]) || [],
      };
    });

  return allProjectsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Get a single project post by slug
 */
export function getProjectPostBySlug(slug: string): ProjectContent {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) notFound();

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
      image: data.image as string,
      author: data.author as string | undefined,
      tags: data.tags as string[] | undefined,
      tech: (data.tech as string[]) || [],
      content,
    };
  } catch (error) {
    console.error(`Error fetching project with slug "${slug}":`, error);
    notFound();
  }
}

/**
 * Get all project slugs for static generation
 */
export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) return [];
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
