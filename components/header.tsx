﻿"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const { scrollY } = useScroll()

  // Bloqueo de scroll al abrir el menú (UX de App nativa)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    
    // Ocultar al bajar (después de 150px) y mostrar al subir
    if (latest > previous && latest > 150 && !isMenuOpen) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }

    if (latest > 20) {
      if (!isScrolled) setIsScrolled(true)
    } else {
      if (isScrolled) setIsScrolled(false)
    }
  })

  const navItems = [
    { href: "#about", label: "Sobre mí" },
    { href: "#projects", label: "Proyectos" },
    { href: "#skills", label: "Stack" },
    { href: "#experience", label: "Experiencia" },
    { href: "#education", label: "Formación" },
    { href: "#contact", label: "Contacto" },
  ]

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isVisible ? "visible" : "hidden"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 w-full z-50 bg-background/85 backdrop-blur-md border-b border-border/60 md:bg-transparent md:backdrop-blur-none md:border-b-0 transition-all duration-300 transform-gpu",
        isScrolled && "bg-background/95 shadow-sm md:bg-background/95 md:backdrop-blur-sm md:border-b md:border-border md:shadow-sm"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between py-3 md:py-0 md:h-16 gap-2 md:gap-3">
          <div className="w-full md:w-auto flex items-center justify-center md:justify-start gap-2 sm:gap-3">
            <h1 className="text-base sm:text-lg font-bold text-primary text-center md:text-left whitespace-nowrap tracking-tight">
              Portafolio Profesional
            </h1>
            <AnimatePresence>
              {isScrolled && (
                <motion.a
                  href="#"
                  initial={{ opacity: 0, scale: 0, width: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    width: 40,
                    boxShadow: [
                      "0 0 0px rgba(99, 102, 241, 0)",
                      "0 0 15px rgba(99, 102, 241, 0.3)",
                      "0 0 0px rgba(99, 102, 241, 0)",
                    ]
                  }}
                  exit={{ opacity: 0, scale: 0, width: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    width: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    opacity: { duration: 0.3 },
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-primary/10 text-primary shadow-sm flex-shrink-0 aspect-square ml-2"
                  aria-label="Volver al inicio"
                  title="Inicio"
                >
                  <Home className="h-5 w-5" />
                </motion.a>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/80 text-primary shadow-sm transition-colors active:scale-90 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMenuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </button>

          <nav className="hidden w-auto md:block">
            <div className="flex flex-wrap items-center justify-end gap-x-10 gap-y-0 text-[15px] font-medium">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-2 py-1.5 rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    item.href === "#contact"
                      ? "text-primary font-semibold"
                      : "text-foreground hover:text-primary hover:bg-muted/60"
                  )}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </nav>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Overlay de fondo para enfocar el menú */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[-1] md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="md:hidden absolute left-4 right-4 top-full z-50 rounded-2xl border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur-md"
              >
                <nav className="grid gap-1">
                  {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    item.href === "#contact"
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted/60 hover:text-primary"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
