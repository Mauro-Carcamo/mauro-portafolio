import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Tu Nombre</h3>
            <p className="text-muted-foreground mb-4">
              Desarrollador Full Stack especializado en crear experiencias digitales excepcionales con tecnologías
              modernas.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:tu@email.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Habilidades
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Desarrollo Web</li>
              <li>Aplicaciones Móviles</li>
              <li>Consultoría Técnica</li>
              <li>Optimización de Performance</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            © {currentYear} Tu Nombre. Hecho con <Heart className="h-4 w-4 text-red-500" /> y mucho café.
          </p>
        </div>
      </div>
    </footer>
  )
}
