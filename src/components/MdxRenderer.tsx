import { MDXRemote } from "next-mdx-remote/rsc";
import type { FC } from "react";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { ContentIndexHeading } from "~/lib/content-index";
import { Pre } from "./Pre";

const rehypeOptions: Options = {
  theme: {
    light: "one-light",
    dark: "one-dark-pro",
  },
  keepBackground: false,
  // Enable horizontal scrolling for LaTeX blocks
  defaultLang: "text",
};

// Custom rehype plugin to add horizontal scrolling to LaTeX blocks
const rehypeScrollableMath = () => {
  return function transformer(tree: any) {
    // Visit all elements with class "katex" and wrap them in a scrollable pre
    function visit(node: any, parent: any, index: any) {
      if (
        node.type === "element" &&
        node.tagName === "span" &&
        node.properties?.className?.includes("katex-display")
      ) {
        // Create a wrapper div with overflow-x-auto
        const wrapper = {
          type: "element",
          tagName: "div",
          properties: {
            className: [
              "katex-wrapper",
              "overflow-x-auto",
              "border",
              "border-muted",
              "rounded",
              "p-2",
              "my-4",
            ],
          },
          children: [node],
        };

        // Replace the katex node with the wrapper in parent's children
        if (parent && Array.isArray(parent.children)) {
          parent.children[index] = wrapper;
        }
      }

      // Recursively visit children
      if (node.children) {
        node.children.forEach((child: any, childIndex: any) => {
          visit(child, node, childIndex);
        });
      }

      return node;
    }

    return visit(tree, null, null);
  };
};

const headingTagNames = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

const rehypeHeadingIds = (tableOfContents: ContentIndexHeading[] = []) => {
  return function transformer(tree: any) {
    let headingIndex = 0;

    function visit(node: any) {
      if (!node || typeof node !== "object") {
        return;
      }

      if (
        node.type === "element" &&
        typeof node.tagName === "string" &&
        headingTagNames.has(node.tagName)
      ) {
        const heading = tableOfContents[headingIndex];

        if (heading) {
          node.properties = {
            ...node.properties,
            id: heading.slug,
          };
        }

        headingIndex += 1;
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    }

    visit(tree);

    return tree;
  };
};

const components = {
  pre: Pre,
};

interface MdxRendererProps {
  source: string;
  tableOfContents?: ContentIndexHeading[];
}

export const MdxRenderer: FC<MdxRendererProps> = ({
  source,
  tableOfContents,
}) => {
  return (
    <div
      className="prose prose-zinc dark:prose-invert max-w-none"
      data-toc-count={tableOfContents?.length ?? 0}
    >
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath, remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              rehypeHeadingIds(tableOfContents),
              rehypeKatex,
              rehypeScrollableMath,
              [rehypePrettyCode, rehypeOptions],
            ],
          },
        }}
        components={components}
      />
    </div>
  );
};
