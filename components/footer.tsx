export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Mauricio Cárcamo. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              Acerca de
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Proyectos
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
