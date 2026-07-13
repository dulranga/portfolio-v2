import { Github, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

const contactMethods = [
  {
    label: "Number",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    icon: Phone,
  },
  {
    label: "Email",
    value: "hello@dulranga.dev",
    href: "mailto:hello@dulranga.dev?subject=Hello%20Dulranga%2C%20let's%20connect",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/dulranga",
    href: "https://github.com/dulranga",
    icon: Github,
  },
  {
    label: "Instagram",
    value: "instagram.com/dulranga",
    href: "https://instagram.com/dulranga",
    icon: Instagram,
  },
];

const mailSubject = "Hello Dulranga, let's connect";
const mailTo = `mailto:hello@dulranga.dev?subject=${encodeURIComponent(mailSubject)}`;

export function ContactSection() {
  return (
    <div className="p-gap mx-auto" id="contact">
      <section className="relative overflow-hidden rounded-default border border-border px-6 py-10 shadow-sm md:px-10 md:py-12 lg:px-12">
        <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Contact
            </p>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Let&apos;s make it happen together. Reach out to me.
            </h2>
            <p className="max-w-xl text-base font-semibold leading-relaxed text-muted-foreground md:text-lg">
              If you have a project, an idea, or just want to say hello, the
              easiest way to reach me is through mail. I usually reply fastest
              there.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="px-10 shadow-md">
                <Link href={mailTo}>Write a mail</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[28px] border border-border/70 bg-background/75 p-4 shadow-sm md:p-5">
            <div className="mb-4 flex items-end justify-between gap-4 px-2 pt-1">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Reach out directly
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Quick links for the usual ways to connect.
                </p>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground">
                <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]" />
                Online
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                const isExternal = method.href.startsWith("http");

                return (
                  <Link
                    key={method.label}
                    href={method.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-card"
                  >
                    <span className={`pointer-events-none absolute inset-0`} />
                    <span className="relative flex items-start gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background shadow-sm">
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {method.label}
                        </span>
                        <span className="mt-1 block truncate text-base font-semibold text-foreground">
                          {method.value}
                        </span>
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
