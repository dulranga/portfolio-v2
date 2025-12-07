import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { IconsBackground } from "./IconsBackground";

export default function HeroSection() {
  return (
    <div className="p-gap mx-auto">
      <section className="grid gap-2 min-h-[60vh] p-8 md:p-12 lg:p-24 rounded-default relative border border-border ">
        <div className="self-center">
          <IconsBackground />
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-6 max-w-5xl">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold leading-16 md:text-5xl lg:text-8xl">
                Hi, I'm Dulranga
              </h1>
              <p className="text-xl font-semibold text-muted-foreground md:text-2xl">
                A frontend developer with 4 years of experience
              </p>
            </div>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Crafting exceptional digital experiences with clean code and
              thoughtful design. Specialized in building modern, performant web
              applications using React, Next.js, and TypeScript.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href="#contact">Contact me</Link>
              </Button>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/dulranga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-accent"
                  aria-label="GitHub"
                >
                  <Github className="size-5" />
                </Link>
                <Link
                  href="https://linkedin.com/in/dulranga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-accent"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-5" />
                </Link>
                <Link
                  href="https://twitter.com/dulrangaD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-accent"
                  aria-label="Twitter"
                >
                  <Twitter className="size-5" />
                </Link>
                <Link
                  href="mailto:contact@dulranga.dev"
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-card transition-all hover:bg-accent"
                  aria-label="Email"
                >
                  <Mail className="size-5" />
                </Link>
              </div>
            </div>
          </div>
          {/* Right Column - Visual Element */}
        </div>
      </section>
    </div>
  );
}
