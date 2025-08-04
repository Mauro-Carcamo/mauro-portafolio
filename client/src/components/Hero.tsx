import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@assets/1706536613867_1754333919791.jpg";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center hero-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--accent-color)]">
              Mauricio Cárcamo
            </h1>
            <p className="text-xl lg:text-2xl font-medium text-[var(--primary-color)]">
              Data Scientist & Sociólogo
            </p>
            <p className="text-lg text-[var(--accent-color)]/80 leading-relaxed">
              Especialista en Ciencia de Datos con sólida formación sociológica.
              Combino análisis estadístico avanzado con comprensión profunda del comportamiento social
              para generar insights accionables que impulsan la toma de decisiones estratégicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="btn-primary-custom px-8 py-3 rounded-full font-semibold"
                onClick={() => window.open("https://github.com/maurocarcamo", "_blank")}
              >
                <Github className="mr-2 h-5 w-5" />
                Ver GitHub
              </Button>
              <Button
                variant="outline"
                className="btn-outline-custom px-8 py-3 rounded-full font-semibold"
                onClick={() => scrollToSection("contacto")}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contactar
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src={profileImg}
              alt="Mauricio Cárcamo - Data Scientist"
              className="profile-img w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover fade-in"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
