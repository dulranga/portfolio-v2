import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const projectRoot = process.cwd();
const postsDirectory = path.join(projectRoot, "src/content/posts");
const outputFilePath = path.join(
  projectRoot,
  "src/content/__generated_index.json",
);

function stripHeadingMarkers(value) {
  return value.replace(/\s+#+\s*$/, "").trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractHeadings(markdown) {
  const headings = [];
  const lines = markdown.split(/\r?\n/);
  let inCodeFence = false;

  for (const line of lines) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);

    if (fenceMatch) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.+?)\s*$/);

    if (!headingMatch) {
      continue;
    }

    const level = headingMatch[1].length;
    const rawText = headingMatch[2].trim();
    const text = stripHeadingMarkers(rawText);

    headings.push({
      level,
      text,
      raw: rawText,
      slug: slugify(text),
    });
  }

  return headings;
}

async function main() {
  const fileNames = await fs.readdir(postsDirectory);
  const postFiles = fileNames.filter((fileName) => fileName.endsWith(".mdx"));

  const posts = await Promise.all(
    postFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data,
        headings: extractHeadings(content),
      };
    }),
  );

  posts.sort((left, right) => {
    const leftDate = String(left.frontmatter?.date ?? "");
    const rightDate = String(right.frontmatter?.date ?? "");

    if (leftDate === rightDate) {
      return left.slug.localeCompare(right.slug);
    }

    return leftDate < rightDate ? 1 : -1;
  });

  const output = {
    generatedAt: new Date().toISOString(),
    sourceDirectory: "src/content/posts",
    posts,
  };

  await fs.writeFile(
    outputFilePath,
    `${JSON.stringify(output, null, 2)}\n`,
    "utf8",
  );
  console.log(`Wrote ${outputFilePath}`);
}

main().catch((error) => {
  console.error("Failed to generate content index:", error);
  process.exitCode = 1;
});
