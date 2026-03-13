"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Download } from "lucide-react"
import { SocialLinks } from "@/components/social-links"
import { PdfDialog } from "@/components/pdf-dialog"

export function HeroSection() {
  return (
    <section className="min-h-[70vh] pt-32 sm:pt-32 md:pt-24 pb-14 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-[0.035]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Column - Content and Actions */}
          <div className="space-y-7">
            <div>
              <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
                Hola, soy{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Mauricio Cárcamo
                </span>
              </h1>

              <p className="text-pretty text-lg sm:text-2xl text-muted-foreground mb-6 leading-relaxed">
                Sociólogo con estudios en Ciencia de Datos, Inteligencia Artificial y Full Stack en Python.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
              <Button size="lg" className="min-w-[160px] rounded-full shadow-sm" asChild>
                <a href="#projects">Ver mis proyectos</a>
              </Button>
              <Button variant="outline" size="lg" className="min-w-[160px] bg-transparent rounded-full" asChild>
                <a href="#contact">Contáctame</a>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-start gap-3">
              <PdfDialog
                title="CV — Mauricio Cárcamo"
                src="/documents/cv-mauricio-carcamo.pdf"
                downloadName="CV_Mauricio_Carcamo.pdf"
                trigger={
                  <Button variant="secondary" size="lg" className="min-w-[180px] rounded-full bg-primary/10 hover:bg-primary/15 text-primary border border-primary/20">
                    Ver CV
                  </Button>
                }
              />

              <Button variant="outline" size="lg" className="min-w-[180px] rounded-full" asChild>
                <a href="/documents/cv-mauricio-carcamo.pdf" download="CV_Mauricio_Carcamo.pdf">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </a>
              </Button>
            </div>

            <SocialLinks className="flex flex-wrap items-center gap-4 sm:gap-5" size="md" />
          </div>

          {/* Right Column - Photo Only */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-xl shadow-primary/10">
              <div className="w-full h-full rounded-full bg-background/70 backdrop-blur flex items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1706536613867.jpg-H1gm0kFpkJrdpxuyJIShGjRoIaEBYS.jpeg"
                  alt="Mauricio Cárcamo"
                  className="w-60 h-60 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
