import { Github, HeartIcon, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const socialLinks = [
    {
        href: "https://github.com/dulranga",
        label: "GitHub",
        icon: Github,
    },
    {
        href: "https://linkedin.com/in/dulranga",
        label: "LinkedIn",
        icon: Linkedin,
    },
    {
        href: "https://twitter.com/dulrangaD",
        label: "Twitter",
        icon: Twitter,
    },
    {
        href: "mailto:contact@dulranga.dev",
        label: "Email",
        icon: Mail,
    },
];

const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="p-gap mx-auto">
            <footer className="border border-border bg-card rounded-default">
                <div className="container mx-auto p-gap pt-12">
                    <div className="flex flex-col md:flex-row gap-8 md:justify-between">
                        {/* Brand Section */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">
                                Dulranga
                                <span className="text-muted-foreground">.</span>
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Frontend developer crafting exceptional digital
                                experiences with clean code and thoughtful
                                design.
                            </p>
                            {/* Quick Links - Inline */}
                            <nav className="flex flex-wrap gap-4 pt-2">
                                {footerLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        {/* Social Links */}
                        <div className="space-y-4">
                            <h4 className="font-semibold">Connect</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex size-10 items-center justify-center rounded-full border border-border bg-background transition-all hover:bg-accent"
                                            aria-label={link.label}
                                        >
                                            <Icon className="size-4" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {/* Bottom Bar */}
                    <div className="mt-4 border-t border-border pt-4 text-center text-sm text-muted-foreground">
                        <p className="flex mx-auto w-fit gap-1 items-center">
                            © {currentYear} Dulranga Dhawanitha. All rights
                            reserved. Built with Love{" "}
                            <HeartIcon size={16} fill="red" stroke="red" />
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
