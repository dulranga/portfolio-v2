import type { FC } from "react";
import { Card, CardContent } from "./ui/card";

type ProjectsProps = {};

const Projects: FC<ProjectsProps> = ({}) => {
    return (
        <div className="p-gap mx-auto">
            <section className="grid gap-2 min-h-[60vh] p-8 md:p-12 lg:p-24 rounded-default relative border border-border overflow-hidden ">
                <div>
                    <h2 className="text-4xl font-bold leading-16 md:text-5xl lg:text-7xl">
                        Projects
                    </h2>
                    <p className="text-xl font-semibold text-muted-foreground md:text-2xl">
                        These are some of my notable projects showcasing my
                        skills and expertise in frontend development.
                    </p>
                </div>
                <Card>
                    <CardContent></CardContent>
                </Card>
            </section>
        </div>
    );
};

export default Projects;
