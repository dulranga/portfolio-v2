// lib/mdx.ts (Server-side code only)
import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { remarkExtractTOC } from "./remark-extract-toc";

const rehypeOptions: Options = {
    theme: {
        light: "one-light",
        dark: "one-dark-pro",
    },
    keepBackground: false,
};

export async function getMdxSource(content: string) {
    const source = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkExtractTOC],
            rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypeOptions]],
        },
    });
    return source;
}
