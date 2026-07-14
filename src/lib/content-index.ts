import fs from "node:fs";
import path from "node:path";

export interface ContentIndexHeading {
  level: number;
  text: string;
  raw: string;
  slug: string;
}

interface ContentIndexEntry {
  slug: string;
  headings: ContentIndexHeading[];
}

interface ContentIndexFile {
  generatedAt: string;
  sourceDirectory: string;
  posts?: ContentIndexEntry[];
  projects?: ContentIndexEntry[];
  [collection: string]: unknown;
}

const contentIndexPath = path.join(
  process.cwd(),
  "src/content/__generated_index.json",
);

function getCollectionName(contentDirectory: string): string {
  return path.basename(path.resolve(contentDirectory));
}

function readContentIndex(): ContentIndexFile | null {
  if (!fs.existsSync(contentIndexPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(contentIndexPath, "utf8");
    return JSON.parse(fileContents) as ContentIndexFile;
  } catch (error) {
    console.error("Error reading generated content index:", error);
    return null;
  }
}

function isContentIndexEntry(value: unknown): value is ContentIndexEntry {
  return (
    typeof value === "object" &&
    value !== null &&
    "slug" in value &&
    "headings" in value &&
    Array.isArray((value as ContentIndexEntry).headings)
  );
}

/**
 * Get table of contents headings for a slug from the generated content index.
 * The content directory name determines which collection to read.
 */
export function getContentTableOfContents(
  contentDirectory: string,
  slug: string,
): ContentIndexHeading[] {
  const contentIndex = readContentIndex();

  if (!contentIndex) {
    return [];
  }

  const collectionName = getCollectionName(contentDirectory);
  const collection = contentIndex[collectionName];

  if (!Array.isArray(collection)) {
    return [];
  }

  const entry = collection.find(
    (item): item is ContentIndexEntry => isContentIndexEntry(item) && item.slug === slug,
  );

  return entry?.headings ?? [];
}