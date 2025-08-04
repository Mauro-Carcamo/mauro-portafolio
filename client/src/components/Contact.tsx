import { MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  return (
    <section id="contacto" className="py-20 bg-[var(--light-bg)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--accent-color)] mb-4 relative">
            Contacto
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[var(--primary-color)] rounded"></div>
          </h2>
          <p className="text-lg text-[var(--accent-color)]/80 leading-relaxed max-w-2xl mx-auto">
            Estoy disponible para proyectos de análisis de datos, machine learning y consultoría en ciencia de datos.
            ¡Conectemos y creemos soluciones innovadoras juntos!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center justify-items-center">
                
                {/* Email */}
                <div className="text-center group">
                  <a
                    href="mailto:mauro.carcamo89@gmail.com"
                    className="w-20 h-20 bg-[var(--secondary-color)] text-[var(--accent-color)] rounded-full flex items-center justify-center text-3xl transition-all duration-300 hover:bg-[var(--primary-color)] hover:text-white hover:scale-110 hover:shadow-lg mx-auto mb-3"
                    title="Email"
                  >
                    <FaEnvelope />
                  </a>
                  <p className="text-sm text-[var(--accent-color)]/80 group-hover:text-[var(--primary-color)] transition-colors">
                    mauro.carcamo89@gmail.com
                  </p>
                </div>

                {/* WhatsApp */}
                <div className="text-center group">
                  <a
                    href="https://wa.me/56990381919"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-20 h-20 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center text-3xl transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:scale-110 hover:shadow-lg mx-auto mb-3"
                    title="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  <p className="text-sm text-[var(--accent-color)]/80 group-hover:text-[#25D366] transition-colors">
                    +56 9 9038 1919
                  </p>
                </div>

                {/* Ubicación */}
                <div className="text-center group">
                  <div className="w-20 h-20 bg-[var(--secondary-color)] text-[var(--accent-color)] rounded-full flex items-center justify-center text-3xl transition-all duration-300 hover:bg-[var(--primary-color)] hover:text-white hover:scale-110 hover:shadow-lg mx-auto mb-3">
                    <MapPin />
                  </div>
                  <p className="text-sm text-[var(--accent-color)]/80 group-hover:text-[var(--primary-color)] transition-colors">
                    Santiago, Chile
                  </p>
                </div>

                {/* GitHub */}
                <div className="text-center group">
                  <a
                    href="https://github.com/maurocarcamo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-20 h-20 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center text-3xl transition-all duration-300 hover:bg-gray-800 hover:text-white hover:scale-110 hover:shadow-lg mx-auto mb-3"
                    title="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <p className="text-sm text-[var(--accent-color)]/80 group-hover:text-gray-800 transition-colors">
                    maurocarcamo
                  </p>
                </div>

                {/* LinkedIn */}
                <div className="text-center group">
                  <a
                    href="https://linkedin.com/in/maurocarcamo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-20 h-20 bg-[#0077B5]/10 text-[#0077B5] rounded-full flex items-center justify-center text-3xl transition-all duration-300 hover:bg-[#0077B5] hover:text-white hover:scale-110 hover:shadow-lg mx-auto mb-3"
                    title="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <p className="text-sm text-[var(--accent-color)]/80 group-hover:text-[#0077B5] transition-colors">
                    maurocarcamo
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
