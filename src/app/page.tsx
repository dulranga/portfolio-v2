import Blog from "~/components/Blog";
import HeroSection from "~/components/HeroSection";
import Projects from "~/components/Projects";

export default function Page() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <Projects />
            <Blog />
        </main>
    );
}
