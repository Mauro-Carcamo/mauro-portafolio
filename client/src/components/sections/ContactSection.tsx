import { SectionTitle } from "@/components/ui/section-title";
import { PERSONAL_INFO } from "@/lib/constants";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  Github, 
  Twitter
} from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <SectionTitle>Contacto</SectionTitle>
        
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-semibold text-xl mb-6 text-primary text-center">¿Trabajamos juntos?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-secondary h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg">Ubicación</h4>
                  <p className="text-gray-600">{PERSONAL_INFO.address}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="text-secondary h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg">Email</h4>
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-gray-600 hover:text-secondary transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="text-secondary h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg">Teléfono</h4>
                  <a 
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-gray-600 hover:text-secondary transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Globe className="text-secondary h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg">Sitio Web</h4>
                  <a 
                    href={PERSONAL_INFO.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-secondary transition-colors"
                  >
                    {PERSONAL_INFO.website}
                  </a>
                </div>
              </div>
            </div>
            
              <div className="flex items-start space-x-4">
                <Linkedin className="text-secondary h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg">LinkedIn</h4>
                  <a 
                    href="https://linkedin.com/in/mauricio-carcamo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-secondary transition-colors"
                  >
                    linkedin.com/in/mauricio-carcamo
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Github className="text-secondary h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg">GitHub</h4>
                  <a 
                    href="https://github.com/Mauro-Carcamo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-secondary transition-colors"
                  >
                    github.com/Mauro-Carcamo
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Twitter className="text-secondary h-6 w-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-lg">Twitter</h4>
                  <a 
                    href="https://twitter.com/mauricio_carcamo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-secondary transition-colors"
                  >
                    @mauricio_carcamo
                  </a>
                </div>
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}