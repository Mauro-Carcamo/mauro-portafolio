export function Footer() {
  const navLinks = [
    { href: "#about", label: "Sobre mí" },
    { href: "#projects", label: "Proyectos" },
    { href: "#skills", label: "Stack" },
    { href: "#experience", label: "Experiencia" },
    { href: "#education", label: "Formación" },
    { href: "#contact", label: "Contacto" },
  ]

  const socialLinks = [
    { href: "https://github.com/Mauro-Carcamo", label: "GitHub" },
    { href: "https://www.linkedin.com/in/mauricio-carcamo-diaz/", label: "LinkedIn" },
    { href: "mailto:mauro.carcamo89@gmail.com", label: "Email" },
  ]

  return (
    <footer className="bg-muted/50 border-t">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Mauricio Cárcamo</p>
            <p className="text-sm text-muted-foreground">Analista de Datos · Data Science · Python</p>
            <p className="text-sm text-muted-foreground">El Quisco, Chile · Disponible remoto</p>
          </div>

          {/* Nav */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Navegación</p>
            <div className="grid grid-cols-2 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Contacto</p>
            <div className="flex flex-col gap-1">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Mauricio Cárcamo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
