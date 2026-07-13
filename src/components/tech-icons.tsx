import type { FC } from "react";
import * as Icons from "./icons";

export type TechIconType = keyof typeof Icons;

export const techIconMap: Record<string, FC<{ className?: string }>> = {
    react: Icons.ReactIcon,
    javascript: Icons.JavaScriptIcon,
    node: Icons.NodeIcon,
    vite: Icons.ViteIcon,
    docker: Icons.DockerIcon,
    aws: Icons.AwsIcon,
    bun: Icons.BunIcon,
    git: Icons.GitIcon,
    html: Icons.HtmlIcon,
};
