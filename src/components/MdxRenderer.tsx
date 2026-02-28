import { MDXRemote } from "next-mdx-remote/rsc";
import type { FC } from "react";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

const rehypeOptions: Options = {
    theme: {
        light: "one-light",
        dark: "one-dark-pro",
    },
    keepBackground: false,
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
                        rehypePlugins: [[rehypePrettyCode, rehypeOptions]],
                    },
                }}
            />
        </div>
    );
};
