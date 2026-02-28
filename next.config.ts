import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { remarkExtractTOC } from "~/lib/remark-extract-toc";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    extension: /\.mdx?$/,
    options: {
        // Pass your plugins here
        remarkPlugins: [],
        rehypePlugins: ["rehype-slug"],
    },
});

export default withMDX(nextConfig);
