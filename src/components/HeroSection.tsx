import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { IconsBackground } from "./IconsBackground";

const mailSubject = "Hello Dulranga, let's connect";
const mailTo = `mailto:hello@dulranga.dev?subject=${encodeURIComponent(mailSubject)}`;

export default function HeroSection() {
  return (
    <div className="p-gap mx-auto">
      <section className="grid place-items-center sm:place-items-start gap-4 sm:min-h-[60vh] p-8 md:p-12 lg:p-24 rounded-default relative border border-border overflow-hidden ">
        <div className="self-center contents sm:block sm:space-y-4">
          <IconsBackground />
          {/* Left Column - Text Content */}

          <h1 className="text-4xl font-bold leading-16 md:text-5xl lg:text-8xl">
            Hi, I'm Dulranga
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg font-medium">
            I have been developing web applications for over 4 years, and I am
            passionate about building performant and scalable applications. I
            always look for new challenges and opportunities to learn and grow
            as a developer.
          </p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center ">
            <Button asChild size="lg">
              <Link href={mailTo}>Write a mail</Link>
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
          {/* Right Column - Visual Element */}
        </div>
      </section>
    </div>
  );
}
