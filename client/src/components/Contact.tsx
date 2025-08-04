import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  return (
    <section id="contacto" className="py-20 bg-[var(--secondary-color)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--accent-color)] mb-4 relative">
            Contacto
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[var(--primary-color)] rounded"></div>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-8">
                <Mail className="h-16 w-16 text-[var(--primary-color)] mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-[var(--accent-color)] mb-4">
                  ¿Listo para colaborar?
                </h3>
                <p className="text-lg text-[var(--accent-color)]/80 leading-relaxed">
                  Estoy disponible para proyectos de análisis de datos, machine learning y consultoría en ciencia de datos.
                  ¡Conectemos y creemos soluciones innovadoras juntos!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <Mail className="h-8 w-8 text-[var(--primary-color)] mx-auto mb-3" />
                  <p className="font-semibold text-[var(--accent-color)] mb-1">Email</p>
                  <p className="text-[var(--accent-color)]/80">mauro.carcamo89@gmail.com</p>
                </div>
                <div className="text-center">
                  <Phone className="h-8 w-8 text-[var(--primary-color)] mx-auto mb-3" />
                  <p className="font-semibold text-[var(--accent-color)] mb-1">Teléfono</p>
                  <p className="text-[var(--accent-color)]/80">+56 9 9038 1919</p>
                </div>
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-[var(--primary-color)] mx-auto mb-3" />
                  <p className="font-semibold text-[var(--accent-color)] mb-1">Ubicación</p>
                  <p className="text-[var(--accent-color)]/80">Santiago, Chile</p>
                </div>
              </div>

              <div className="flex justify-center space-x-6">
                <a
                  href="mailto:mauro.carcamo89@gmail.com"
                  className="w-14 h-14 bg-[var(--secondary-color)] text-[var(--accent-color)] rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:bg-[var(--primary-color)] hover:text-white hover:-translate-y-1"
                  title="Email"
                >
                  <FaEnvelope />
                </a>
                <a
                  href="https://github.com/maurocarcamo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[var(--secondary-color)] text-[var(--accent-color)] rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:bg-[var(--primary-color)] hover:text-white hover:-translate-y-1"
                  title="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://linkedin.com/in/maurocarcamo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[var(--secondary-color)] text-[var(--accent-color)] rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:bg-[var(--primary-color)] hover:text-white hover:-translate-y-1"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://wa.me/56990381919"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[var(--secondary-color)] text-[var(--accent-color)] rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:bg-[var(--primary-color)] hover:text-white hover:-translate-y-1"
                  title="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
