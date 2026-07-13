import GithubSlugger from "github-slugger";
import { visit } from "unist-util-visit";

export interface TOCItem {
    depth: number;
    value: string;
    slug: string;
}

// Factory function that returns the actual plugin (for serialization)
export function remarkExtractTOC() {
    return (tree: any, file: any) => {
        const toc: TOCItem[] = [];
        const slugger = new GithubSlugger();
        visit(tree, "heading", (node) => {
            const depth = node.depth;
            // ✅ Only include h2–h4 (adjust if you want)
            if (depth < 2 || depth > 4) return;
            const value = node.children
                .filter((n: any) => n.type === "text")
                .map((n: any) => n.value)
                .join("");
            if (!value) return;
            const slug = slugger.slug(value);
            toc.push({
                depth,
                value,
                slug,
            });
        });

        // ✅ Attach TOC to the MDX file's data object
        file.data.toc = toc;
    };
}
