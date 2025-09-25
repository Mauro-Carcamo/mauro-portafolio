import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import { WelcomePopup } from "@/components/ui/welcome-popup";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function Home() {
  const handleNavigate = (section: string) => {
    const element = document.querySelector(section);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Handle hash navigation on page load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 80,
            behavior: "smooth",
          });
        }
      }, 100);
    }
    
    // Update active nav item on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      document.querySelectorAll("section[id]").forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - 100;
        const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const id = section.getAttribute("id");
          document.querySelectorAll(".nav-item").forEach((navItem) => {
            navItem.classList.remove("active");
          });
          
          const activeNavItem = document.querySelector(`.nav-item[href="#${id}"]`);
          if (activeNavItem) {
            activeNavItem.classList.add("active");
          }
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProjectsSection />
        <TechnologiesSection />
        <EducationSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      <WelcomePopup onNavigate={handleNavigate} />
      <WhatsAppButton />
    </div>
  );
}
