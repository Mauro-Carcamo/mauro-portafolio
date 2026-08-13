﻿"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageCarousel } from "@/components/image-carousel"
import { TechnologyIcon, hasTechnologyIcon } from "@/components/technology-icon"
import { SectionHeader } from "@/components/section-header"
import { SectionParallax } from "@/components/section-parallax"
import { ScrollReveal } from "@/components/scroll-reveal"
import { PdfDialog } from "@/components/pdf-dialog"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  ArrowRight,
  GraduationCap,
  Download,
  Eye,
  Award,
  BookOpen,
  Scroll,
} from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type React from "react"

import { motion, AnimatePresence, Variants } from "framer-motion"

interface EducationItem {
  title: string
  institution: string
  period: string
  status: string
  certificate: string | null
}

const educationTitulo: EducationItem[] = [
  {
    title: "Título de Sociólogo",
    institution: "Universidad Central de Chile",
    period: "2015",
    status: "completed",
    certificate: "/documents/titulo-sociologo.pdf",
  },
]

const educationDiplomados: EducationItem[] = [
  {
    title: "Beca Google Talento Digital",
    institution: "Google",
    period: "2026",
    status: "current",
    certificate: null,
  },
  {
    title: "Diplomado en Inteligencia Artificial",
    institution: "Universidad Autónoma",
    period: "2025",
    status: "completed",
    certificate: "/documents/20250923151700_abd3a728-083d-4b46-9839-a19400f319ba.pdf",
  },
  {
    title: "Diplomado en Data Science",
    institution: "Universidad Católica de Chile",
    period: "2022",
    status: "completed",
    certificate: "/documents/diplomado-data-science.pdf",
  },
]

const educationCursos: EducationItem[] = [
  {
    title: "Bootcamp Ciencia de Datos",
    institution: "Corfo Talento Digital",
    period: "2024",
    status: "completed",
    certificate: "/documents/bootcamp-data-science.pdf",
  },
  {
    title: "Bootcamp Full Stack Python",
    institution: "Corfo Talento Digital",
    period: "2023",
    status: "completed",
    certificate: "/documents/bootcamp-full-stack-python.pdf",
  },
  {
    title: "Green Digital Skills",
    institution: "INCO Academy (LinkedIn)",
    period: "2024",
    status: "completed",
    certificate: "/documents/green-digital-skills.pdf",
  },
  {
    title: "Curso Introductorio Data Science",
    institution: "Escuela Digital",
    period: "2024",
    status: "completed",
    certificate: "/documents/intro-data-science.pdf",
  },
  {
    title: "Procesamiento de Lenguaje Natural en R",
    institution: "Instituto Nacional de Estadísticas (INE)",
    period: "2023",
    status: "completed",
    certificate: null,
  },
  {
    title: "R y Herramientas de Reproducibilidad",
    institution: "Instituto Nacional de Estadísticas (INE)",
    period: "2023",
    status: "completed",
    certificate: null,
  },
  {
    title: "Introducción a Shiny",
    institution: "Instituto Nacional de Estadísticas (INE)",
    period: "2023",
    status: "completed",
    certificate: null,
  },
  {
    title: "Introducción a la Minería de Datos",
    institution: "Pontificia Universidad Católica de Chile (Coursera)",
    period: "2022",
    status: "completed",
    certificate: "/documents/mineria-de-datos-coursera.pdf",
  },
  {
    title: "SQL Interactivo",
    institution: "Desafío LATAM",
    period: "2024",
    status: "completed",
    certificate: null,
  },
  {
    title: "El Desafío SIG desde Cero: Biodiversidad y Medio Ambiente",
    institution: "Instituto Ambiental GIS",
    period: "2023",
    status: "completed",
    certificate: null,
  },
  {
    title: "ChatGPT Prompt Engineering for Developers",
    institution: "Teleduc, Pontificia Universidad Católica de Chile",
    period: "2022",
    status: "completed",
    certificate: null,
  },
  {
    title: "Curso Herramientas para la Gestión de Proyectos",
    institution: "Universidad Católica de Chile",
    period: "2022",
    status: "completed",
    certificate: "/documents/gestion-proyectos-agil.pdf",
  },
  {
    title: "Curso Aplicación de Técnicas para la Gestión de Capacitación",
    institution: "Universidad Católica de Chile",
    period: "2021",
    status: "completed",
    certificate: "/documents/gestion-capacitacion.pdf",
  },
]

const educationDownloadName = (title: string) => `${title.replace(/\s+/g, "-").toLowerCase()}-certificado.pdf`

function EducationCategoryCompact({
  title,
  items,
  icon: Icon,
}: {
  title: string
  items: EducationItem[]
  icon: React.ElementType
}) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary mb-1.5">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      <ul>
        {items.map((edu, index) => (
          <li
            key={index}
            className="flex items-start justify-between gap-2 py-2 border-b border-border/40 last:border-b-0"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground leading-snug">{edu.title}</p>
              <p className="text-xs text-muted-foreground truncate">
                {edu.institution} · {edu.period}
                {edu.status === "current" && (
                  <span className="ml-1.5 text-primary font-semibold">En curso</span>
                )}
              </p>
            </div>
            {edu.certificate && (
              <div className="flex gap-1 shrink-0">
                <PdfDialog
                  title={edu.title}
                  src={edu.certificate}
                  downloadName={educationDownloadName(edu.title)}
                  trigger={
                    <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Ver certificado: ${edu.title}`}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  }
                />
                <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                  <a href={edu.certificate} download={educationDownloadName(edu.title)} aria-label={`Descargar certificado: ${edu.title}`}>
                    <Download className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProjectImage({ 
  src, 
  alt, 
  className, 
  priority = false,
  placeholder
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  priority?: boolean;
  placeholder?: "blur" | "empty"
}) {
  const [isLoading, setIsLoading] = useState(true)
  
  // Placeholder base64 (un color gris azulado muy ligero) para que el blur funcione con URLs externas
  const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8AKpT8S9WAAAAABJRU5ErkJggg=="

  return (
    <div className="relative w-full h-full overflow-hidden bg-muted">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-muted"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        whileHover={{ scale: 1.08, y: -4 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full"
      >
        <Image
        src={src}
        alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(className, "transition-opacity duration-500", isLoading ? "opacity-0" : "opacity-100")}
          onLoad={() => setIsLoading(false)}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
        />
      </motion.div>
    </div>
  )
}

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  appUrl?: string
  githubUrl: string
  featured: boolean
  images?: string[]
}

export function ProjectsSection() {
  const router = useRouter()

  const projects: Project[] = [
    {
      title: "Kittypau",
      description:
        "Plataforma integral para gestión de mascotas que combina IoT, app/web e IA para monitorear y mejorar el bienestar.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-TfWbRHXGAdMVjCdnJ3UuoMPSKWYUuG.jpeg",
      technologies: ["React Native", "Node.js", "MongoDB", "Machine Learning"],
      liveUrl: "/projects/kittypau",
      appUrl: "https://kittypau-app.vercel.app",
      githubUrl: "https://github.com/Mauro-Carcamo",
      featured: true,
    },
    {
      title: "Registag",
      description:
        "Plataforma de trazabilidad de EPP: registro automático de entregas en terreno vía RFID, con pipeline hacia Google Sheets para control de estados, alertas y constancias legales digitales.",
      image: "/projects/registag.jpg",
      technologies: ["ESP8266", "IoT", "Google Apps Script"],
      liveUrl: "/projects/registag",
      appUrl: "https://regist4g.vercel.app",
      githubUrl: "https://github.com/Regist4g",
      featured: true,
    },
    {
      title: "Predicción de Mortalidad en Chile",
      description:
        "Análisis y predicción de mortalidad con técnicas de ciencia de datos y Machine Learning.",
      image: "/mortality-prediction-visualizations.png",
      technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      liveUrl: "/projects/mortality-prediction",
      githubUrl: "https://github.com/Mauro-Carcamo",
      featured: true,
    },
    {
      title: "Textos Religiosos y Machine Learning",
      description:
        "Análisis de textos religiosos con técnicas de NLP para extraer insights.",
      image: "/nlp-religious-text-analysis.png",
      technologies: ["Python", "NLTK", "spaCy", "TensorFlow"],
      liveUrl: "/projects/religious-texts",
      githubUrl: "https://github.com/Mauro-Carcamo",
      featured: false,
    },
    {
      title: "Web Scraping Letras de Canciones",
      description:
        "Extracción y análisis de letras (1960–2020) para encontrar tendencias en música popular.",
      image: "/music-lyrics-analysis.png",
      technologies: ["Python", "BeautifulSoup", "Selenium", "Data Analysis"],
      liveUrl: "/projects/music-lyrics",
      githubUrl: "https://github.com/Mauro-Carcamo",
      featured: false,
    },
  ]

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    duration: 40,
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocusWithin, setIsFocusWithin] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

    if (reduceMotion) return
    if (isHovered || isFocusWithin) return

    const firstId = window.setTimeout(() => {
      emblaApi.scrollNext()
    }, 1400)

    const id = window.setInterval(() => {
      emblaApi.scrollNext()
    }, 3800)

    return () => {
      window.clearTimeout(firstId)
      window.clearInterval(id)
    }
  }, [emblaApi, isHovered, isFocusWithin])

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  }

  return (
    <section id="projects" className="relative pt-10 sm:pt-14 pb-12 sm:pb-16">
      <SectionParallax />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
        {/* Columna izquierda — Proyectos (carrusel horizontal) */}
        <div className="min-w-0">
        <ScrollReveal>
          <SectionHeader
            align="left"
            className="mb-8"
            eyebrow="Portafolio"
            title={
              <>
                Mis <span className="text-primary">Proyectos</span>
              </>
            }
          />
        </ScrollReveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocusWithin(true)}
          onBlurCapture={() => setIsFocusWithin(false)}
        >
          <div className="absolute -top-12 right-0 hidden sm:flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={scrollPrev} disabled={!canScrollPrev} aria-label="Anterior">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} disabled={!canScrollNext} aria-label="Siguiente">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y" style={{ touchAction: "pan-y" }}>
            <div className="flex touch-pan-y gap-3 sm:gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="flex-[0_0_86%] sm:flex-[0_0_70%] md:flex-[0_0_55%] lg:flex-[0_0_60%] xl:flex-[0_0_48%]"
                  variants={itemVariants}
                >
                  <motion.div
                    layout // Enable layout animations
                    whileHover={{
                      y: -8,
                      scale: 1.015,
                      rotateX: -2,
                      rotateY: 2,
                      z: 20, // Add a slight Z-axis translation for more depth
                    }}
                    whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    style={{
                      transformStyle: "preserve-3d", // Enable 3D transformations
                      perspective: "1200px", // Set perspective for 3D effect
                    }}
                    className={cn(
                      "group overflow-hidden p-0 py-0 gap-0 h-full rounded-2xl border border-border/60 bg-background/80 shadow-sm",
                      "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      project.featured ? "ring-1 ring-primary/20" : "",
                    )}
                  >
                    <Card
                      role="link"
                      tabIndex={0}
                      aria-label={`Abrir ${project.title}`}
                      onClick={(event) => {
                        const target = event.target as HTMLElement
                        if (target.closest("a,button")) return
                        router.push(project.liveUrl)
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter" && event.key !== " ") return
                        event.preventDefault()
                        router.push(project.liveUrl)
                      }}
                      className="h-full w-full border-none shadow-none" // Remove default card styling to let motion.div handle it
                    >
                    <div className="relative overflow-hidden bg-muted aspect-video" style={{ transformStyle: "preserve-3d" }}>
                      {project.images ? (
                        <motion.div whileHover={{ scale: 1.08, y: -4 }} transition={{ duration: 0.5 }}>
                          <ImageCarousel
                            images={project.images}
                            alt={project.title}
                            autoPlay={true}
                            autoPlayInterval={2500}
                          />
                        </motion.div>
                      ) : (
                        <ProjectImage
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          priority={project.featured}
                          className={cn(
                            "w-full h-full transition-transform duration-500 group-hover:scale-[1.03]",
                            project.title === "Kittypau" ? "object-contain p-6 bg-white" : "object-cover"
                          )}
                          placeholder="blur"
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {project.featured && (
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(99,102,241,0.4)",
                              "0 0 15px rgba(99,102,241,0.7)",
                              "0 0 0px rgba(99,102,241,0.4)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-3 left-3 z-10"
                        >
                          <Badge className="bg-primary shadow-sm">Destacado</Badge>
                        </motion.div>
                      )}
                    </div>

                    <CardHeader className="px-4 sm:px-5 pt-5 pb-2">
                      <CardTitle className="text-lg sm:text-xl font-bold leading-tight tracking-tight">{project.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="px-4 sm:px-5 pb-4 pt-0 flex-1 space-y-4">
                      <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 items-center pt-1">
                        {project.technologies.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="flex flex-nowrap items-center gap-1.5 bg-secondary/60 text-secondary-foreground rounded-full px-2.5 py-1 text-[11px] font-semibold min-w-0 max-w-full shrink-0"
                          >
                            {hasTechnologyIcon(tech) && <TechnologyIcon techName={tech} size={16} />}
                            <span className="min-w-0 truncate" title={tech}>
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 gap-2 flex-wrap">
                      <Button size="sm" className="flex-1 rounded-full" asChild>
                        <Link href={project.liveUrl} onClick={(e) => e.stopPropagation()}>
                          <ArrowRight className="h-4 w-4" />
                          Ver detalles
                        </Link>
                      </Button>

                      {project.appUrl && (
                        <Button size="sm" variant="outline" className="rounded-full" asChild>
                          <a
                            href={project.appUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4" />
                            App
                          </a>
                        </Button>
                      )}

                      <Button variant="outline" size="sm" className="rounded-full" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
          </div>
        </motion.div>

        <ScrollReveal delayMs={120}>
          <div className="mt-8">
            <Link href="https://github.com/Mauro-Carcamo" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full">
                Ver todos los proyectos en GitHub
              </Button>
            </Link>
          </div>
        </ScrollReveal>
        </div>

        {/* Columna derecha — Educación y Certificaciones */}
        <div id="education" className="scroll-mt-24 min-w-0">
          <ScrollReveal>
            <SectionHeader
              align="left"
              className="mb-8"
              eyebrow={
                <span className="inline-flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Formación Académica
                </span>
              }
              title={
                <>
                  Educación y <span className="text-primary">Certificaciones</span>
                </>
              }
            />
          </ScrollReveal>

          <ScrollReveal delayMs={80}>
            <div className="rounded-2xl border border-border/60 bg-background/80 shadow-sm p-4 sm:p-5 max-h-[560px] overflow-y-auto">
              <EducationCategoryCompact title="Título Profesional" items={educationTitulo} icon={Award} />
              <EducationCategoryCompact title="Diplomados" items={educationDiplomados} icon={Scroll} />
              <EducationCategoryCompact title="Cursos y Bootcamps" items={educationCursos} icon={BookOpen} />
            </div>
          </ScrollReveal>
        </div>
        </div>
      </div>
    </section>
  )
}
