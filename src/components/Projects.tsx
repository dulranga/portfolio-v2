import type { FC } from "react";
import { getAllProjectPosts } from "~/lib/projects-posts";
import { ProjectCard } from "./ProjectCard";

const Projects: FC = () => {
  const projects = getAllProjectPosts();

  return (
    <div className="p-gap mx-auto mb-20" id="projects">
      <section className="grid gap-12 p-8 md:p-12 lg:p-24 rounded-default relative border border-border overflow-hidden">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold leading-16 md:text-5xl lg:text-7xl">
            Projects
          </h2>
          <p className="text-xl font-semibold text-muted-foreground md:text-2xl mt-4">
            These are some of my notable projects showcasing my skills and
            expertise in frontend development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-12">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.description}
              link={`/project/${project.slug}`}
              image={project.image}
              tech={project.tech}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
