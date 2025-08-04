import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Libraries from "@/components/Libraries";
import Studies from "@/components/Studies";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* New Animated Background */}
      <div className="main-background"></div>
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <Navigation />
      
      {/* Main content container */}
      <div className="page-container">
        <Hero />
        <Projects />
        <Libraries />
        <Studies />
        <Experience />
        <Contact />
      </div>
      
      <FloatingButtons />
    </div>
  );
}
