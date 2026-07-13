import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { techIconMap } from "./tech-icons";

interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
    image: string;
    tech: string[];
}

export const ProjectCard: FC<ProjectCardProps> = ({
    title,
    description,
    link,
    image,
    tech,
}) => {
    return (
        <Link
            href={link}
            className="group relative flex flex-col overflow-hidden rounded-[32px] border border-border bg-card transition-all hover:border-black dark:hover:border-white p-6"
        >
            <div className="aspect-16/10 w-full rounded-2xl relative flex items-center justify-center overflow-hidden bg-muted">
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Tech Stack Icons Overlay */}
                <div className="absolute bottom-4 right-4 flex gap-2 p-2 bg-background/80 backdrop-blur-md rounded-xl border border-border">
                    {tech.map((techKey) => {
                        const Icon = techIconMap[techKey.toLowerCase()];
                        return Icon ? (
                            <Icon key={techKey} className="w-5 h-5 shrink-0" />
                        ) : null;
                    })}
                </div>
            </div>

            <div className="flex flex-col gap-2 pt-6">
                <h3 className="text-2xl font-bold leading-tight group-hover:underline">
                    {title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
        </Link>
    );
};
