﻿"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Database, Brain, Code, Rocket } from "lucide-react"
import { SocialLinks } from "@/components/social-links"
import { PdfDialog } from "@/components/pdf-dialog"
import { SectionParallax } from "@/components/section-parallax"
import { motion, Variants } from "framer-motion"

export function HeroSection() {
  const highlights = [
    {
      icon: Database,
      title: "Ciencia de Datos",
      description: "Análisis avanzado de datos, Machine Learning y predicción de patrones",
    },
    {
      icon: Brain,
      title: "Inteligencia Artificial",
      description: "NLP, análisis de textos y modelos de aprendizaje automático",
    },
    {
      icon: Code,
      title: "Desarrollo Full Stack",
      description: "React, TypeScript, Python y tecnologías modernas de desarrollo",
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  }

  return (
    <section
      className="min-h-[65vh] pt-20 sm:pt-24 md:pt-20 pb-4 sm:pb-6 relative overflow-hidden flex flex-col justify-center"
    >
      {/* Background Pattern */}
      <SectionParallax />
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-[0.025] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start"
        >
          {/* Left Column - Content and Actions */}
          <div className="space-y-5 text-center lg:text-left">
            <div>
              <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                {["Hola,", "soy"].map((word, i) => (
                  <motion.span
                    key={i}
                    variants={itemVariants}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
                <br className="hidden sm:block" />
                <span className="relative inline-block mt-2">
                  {/* Soft Glow behind Name */}
                  <motion.div 
                    animate={{ opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 blur-3xl bg-primary/40 -z-10" 
                  />
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ 
                      delay: 0.5, 
                      duration: 0.8,
                      backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" }
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary"
                  >
                    Mauricio Cárcamo
                  </motion.span>
                </span>
              </h1>

            </div>

            <motion.div id="about" variants={itemVariants} className="scroll-mt-24 space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                Analista de Datos · Científico de Datos
              </h2>

              <p className="text-sm text-muted-foreground leading-snug max-w-xl mx-auto lg:mx-0">
                Formación en Ciencias Sociales (Sociólogo) y diplomados en Ciencia de Datos e IA, con más de 8 años
                de experiencia resolviendo problemas de negocio en empresas, pymes y proyectos públicos. Dominio de
                Python, R y SQL para el ciclo completo de datos, de la extracción a la visualización en Power BI y
                Looker Studio.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 mt-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-left">
                    <div className="w-8 h-8 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                      <highlight.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight leading-tight">{highlight.title}</h3>
                      <p className="text-xs text-muted-foreground leading-snug">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Foto, CTAs y redes sociales */}
          <div className="flex flex-col items-center gap-6">
            <motion.div variants={itemVariants} className="flex justify-center">
            <div className="w-full max-w-[22rem] sm:max-w-sm lg:max-w-none lg:w-52 lg:h-52 aspect-square rounded-[2rem] lg:rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-xl shadow-primary/10">
              <div className="w-full h-full rounded-[1.75rem] lg:rounded-full bg-background/70 backdrop-blur flex items-center justify-center overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1706536613867.jpg-H1gm0kFpkJrdpxuyJIShGjRoIaEBYS.jpeg"
                  alt="Mauricio Cárcamo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 justify-center">
              <Button
                className="min-w-[150px] rounded-full shadow-sm active:scale-95 transition-transform"
                asChild
              >
                <a href="#projects">Ver mis proyectos</a>
              </Button>
              <Button
                variant="outline"
                className="min-w-[130px] bg-transparent rounded-full text-primary border-primary/25 hover:bg-primary/10"
                asChild
              >
                <a href="#contact">Contáctame</a>
              </Button>

              <PdfDialog
                title="CV — Mauricio Cárcamo"
                src="/documents/cv-mauricio-carcamo.pdf"
                downloadName="CV_Mauricio_Carcamo.pdf"
                trigger={
                  <Button
                    variant="outline"
                    className="min-w-[100px] rounded-full text-primary border-primary/40 hover:bg-primary/10 active:scale-95"
                  >
                    Ver CV
                  </Button>
                }
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full max-w-[22rem] sm:max-w-sm lg:max-w-none lg:w-64 flex justify-center bg-muted/20 backdrop-blur-sm border border-border/50 rounded-2xl p-4 shadow-sm"
            >
              <SocialLinks className="flex flex-wrap items-center gap-4 sm:gap-6" size="md" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="mt-2 sm:mt-4 flex justify-center animate-bounce hidden sm:flex">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
