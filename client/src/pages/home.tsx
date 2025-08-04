import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Studies from "@/components/Studies";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
      </div>

      <Navigation />
      <Hero />
      <Projects />
      <Studies />
      <Experience />
      <Contact />
      <FloatingButtons />
    </div>
  );
}
