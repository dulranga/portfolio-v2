import { MDXRemote } from "next-mdx-remote/rsc";
import type { FC } from "react";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Pre } from "./Pre";

const rehypeOptions: Options = {
    theme: {
        light: "one-light",
        dark: "one-dark-pro",
    },
    keepBackground: false,
};

const components = {
    pre: Pre,
};

interface MdxRendererProps {
    source: string;
}

export const MdxRenderer: FC<MdxRendererProps> = ({ source }) => {
    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none">
            <MDXRemote
                source={source}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkMath, remarkGfm],
                        rehypePlugins: [
                            rehypeSlug,
                            rehypeKatex,
                            [rehypePrettyCode, rehypeOptions],
                        ],
                    },
                }}
                components={components}
            />
        </div>
    );
};
