"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#projects", label: "Proyectos" },
    { href: "#skills", label: "Habilidades" },
    { href: "#experience", label: "Experiencia" },
    { href: "#education", label: "Educación" },
    { href: "#about", label: "Acerca de" },
    { href: "#contact", label: "Contacto" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 bg-background/85 backdrop-blur-md border-b border-border/60 md:bg-transparent md:backdrop-blur-none md:border-b-0 transition-colors duration-300",
        isScrolled && "bg-background/95 shadow-sm md:bg-background/95 md:backdrop-blur-sm md:border-b md:border-border md:shadow-sm"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-3 md:flex-row md:justify-between md:py-0 md:h-16 gap-2 md:gap-3">
          <div className="w-full md:w-auto">
            <h1 className="text-base sm:text-xl font-bold text-primary text-center md:text-left whitespace-nowrap">
              Mauricio Cárcamo
            </h1>
          </div>

          <nav className="w-full md:w-auto">
            <div className="grid grid-cols-3 justify-items-center gap-x-4 gap-y-2 text-sm sm:text-base md:flex md:flex-wrap md:items-center md:justify-end md:gap-x-8 md:gap-y-0 md:text-base">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-2 py-1.5 rounded-md text-foreground hover:text-primary hover:bg-muted/60 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
