import type { Metadata } from "next";

import Blog from "~/components/Blog";
import { ContactSection } from "~/components/ContactSection";
import HeroSection from "~/components/HeroSection";
import Projects from "~/components/Projects";

export const metadata: Metadata = {
  title: "Dulranga Dhawanitha | Frontend Developer Portfolio",
  description:
    "Frontend developer portfolio featuring selected work, writing, and ways to get in touch.",
  keywords: [
    "Dulranga Dhawanitha",
    "frontend developer",
    "web developer",
    "react",
    "next.js",
    "typescript",
    "portfolio",
    "projects",
    "blog",
  ],
  authors: [{ name: "Dulranga Dhawanitha" }],
  creator: "Dulranga Dhawanitha",
  publisher: "Dulranga Dhawanitha",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Dulranga Dhawanitha | Frontend Developer Portfolio",
    description:
      "Frontend developer portfolio featuring selected work, writing, and ways to get in touch.",
    siteName: "Dulranga Dhawanitha Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dulranga Dhawanitha Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dulranga Dhawanitha | Frontend Developer Portfolio",
    description:
      "Frontend developer portfolio featuring selected work, writing, and ways to get in touch.",
    images: ["/og-image.png"],
    creator: "@dulrangaD",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen max-w-800 mx-auto">
      <HeroSection />
      <Projects />
      <Blog />
      <ContactSection />
    </main>
  );
}
