import { MdxRenderer } from "~/components/MdxRenderer";
import { getAllProjectSlugs, getProjectPostBySlug } from "~/lib/projects-posts";

// Dynamic params for static generation
export async function generateStaticParams() {
    const slugs = getAllProjectSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export default async function ProjectPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Get the project post content without frontmatter using gray-matter
    const project = getProjectPostBySlug(slug);

    return (
        <div className="container mx-auto px-4 py-8">
            <article className="mx-auto max-w-4xl">
                <header className="mb-12">
                    <h1 className="text-3xl font-bold md:text-5xl lg:text-5xl lg:font-black mb-4">
                        {project.title}
                    </h1>
                    <div className="text-muted-foreground flex gap-2 items-center">
                        <span>
                            {new Date(project.date).toLocaleDateString()}
                        </span>
                        {project.author && <span>• {project.author}</span>}
                    </div>
                </header>
                <MdxRenderer source={project.content} />
            </article>
        </div>
    );
}
