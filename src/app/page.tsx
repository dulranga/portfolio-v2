import Blog from "~/components/Blog";
import { ContactSection } from "~/components/ContactSection";
import HeroSection from "~/components/HeroSection";
import Projects from "~/components/Projects";

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
