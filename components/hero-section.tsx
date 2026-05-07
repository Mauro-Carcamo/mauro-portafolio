﻿"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Rocket } from "lucide-react"
import { SocialLinks } from "@/components/social-links"
import { PdfDialog } from "@/components/pdf-dialog"
import { SectionParallax } from "@/components/section-parallax"
import { Parallax } from "react-scroll-parallax"
import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion"

export function HeroSection() {
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

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 })
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 })
  
  const moveX = useTransform(springX, [0, 1200], [-15, 15])
  const moveY = useTransform(springY, [0, 800], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent) => {
    // Evitamos cálculos si es un dispositivo táctil (simplificado)
    if (window.matchMedia("(pointer: coarse)").matches) return
    
    const { clientX, clientY } = e
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="min-h-[70vh] pt-24 sm:pt-28 md:pt-24 pb-10 sm:pb-14 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Pattern */}
      <SectionParallax />
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-[0.025] pointer-events-none" />

      <Parallax
        scale={[1, 1.1]}
        opacity={[1, 0.8]}
        easing="easeInQuad"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ x: moveX, y: moveY }}
          className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center"
        >
          {/* Left Column - Content and Actions */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-balance text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight">
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

              <motion.p 
                variants={itemVariants}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="text-pretty text-lg sm:text-2xl text-muted-foreground leading-relaxed max-w-xl"
              >
                Sociólogo con estudios en Ciencia de Datos, Inteligencia Artificial y Full Stack en Python.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="min-w-[160px] rounded-full shadow-sm active:scale-95 transition-transform" 
                asChild
              >
                <a href="#projects">Ver mis proyectos</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="min-w-[160px] bg-transparent rounded-full text-primary border-primary/25 hover:bg-primary/10"
                asChild
              >
                <a href="#contact">Contáctame</a>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <PdfDialog
                title="CV — Mauricio Cárcamo"
                src="/documents/cv-mauricio-carcamo.pdf"
                downloadName="CV_Mauricio_Carcamo.pdf"
                trigger={
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="min-w-[180px] rounded-full bg-primary/10 text-primary border border-primary/20 active:scale-95"
                  >
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
            </motion.div>
          </div>

          {/* Right Column - Photo and Social Links */}
          <div className="flex flex-col items-center lg:items-end gap-8">
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
            <Parallax translateY={[-10, 10]}>
            <div className="w-full max-w-[22rem] sm:max-w-sm lg:max-w-none lg:w-64 lg:h-64 aspect-square rounded-[2rem] lg:rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-xl shadow-primary/10">
              <div className="w-full h-full rounded-[1.75rem] lg:rounded-full bg-background/70 backdrop-blur flex items-center justify-center overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1706536613867.jpg-H1gm0kFpkJrdpxuyJIShGjRoIaEBYS.jpeg"
                  alt="Mauricio Cárcamo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Parallax>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="w-full max-w-[22rem] sm:max-w-sm lg:max-w-none lg:w-64 flex justify-center bg-muted/20 backdrop-blur-sm border border-border/50 rounded-2xl p-4 shadow-sm"
            >
              <SocialLinks className="flex flex-wrap items-center gap-4 sm:gap-6" size="md" />
            </motion.div>
          </div>
        </motion.div>
      </Parallax>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
