import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // This allows all hostnames, use with extreme caution
            },
        ],
    },
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
