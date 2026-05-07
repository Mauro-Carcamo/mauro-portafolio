"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PdfDialog } from "@/components/pdf-dialog"
import { GraduationCap, Calendar, Download, Eye, Award, BookOpen, Scroll } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { SectionParallax } from "@/components/section-parallax"
import { ScrollReveal } from "@/components/scroll-reveal"
import { motion, Variants } from "framer-motion"

interface EducationItem {
  title: string
  institution: string
  period: string
  status: string
  certificate: string | null
}

export function EducationSection() {
  const titulo = [
    {
      title: "Título de Sociólogo",
      institution: "Universidad Central de Chile",
      period: "2015",
      status: "completed",
      certificate: "/documents/titulo-sociologo.pdf",
    },
  ];

  const diplomados = [
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
  ];

  const cursos = [
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
  ];

  const downloadNameForTitle = (title: string) =>
    `${title.replace(/\s+/g, "-").toLowerCase()}-certificado.pdf`

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 25 } },
    hover: { x: typeof window !== 'undefined' && window.innerWidth > 768 ? 6 : 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
  }

  const badgeVariants: Variants = {
    hover: { 
      scale: 1.1, 
      transition: { type: "spring", stiffness: 400, damping: 10 } 
    }
  }

  const EducationCategory = ({ title, items, icon: Icon }: { title: string; items: EducationItem[]; icon: React.ElementType }) => (
    <div className="mb-8 last:mb-0">
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 pb-2 border-b border-border text-foreground flex items-center gap-3 overflow-hidden">
        <motion.div
          initial={{ rotate: -15, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary/70 shrink-0" />
        </motion.div>
        {title}
      </h3>
      <motion.ul 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-5%" }}
        className="space-y-6"
      >
        {items.map((edu, index) => (
          <motion.li 
            key={index} 
            variants={itemVariants}
            whileHover="hover"
            className="group px-4 -mx-4 py-4 border-b border-muted/30 last:border-b-0 transition-colors hover:bg-primary/5 rounded-xl"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex-grow mb-2 sm:mb-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="text-lg font-semibold text-primary mb-1 sm:mb-0">{edu.title}</h4>
                  <div className="flex items-center gap-2 flex-wrap sm:ml-4">
                    <motion.div variants={badgeVariants} className="inline-flex">
                      <Badge variant={edu.status === "current" ? "default" : "secondary"} className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {edu.period}
                      </Badge>
                    </motion.div>
                    {edu.status === "current" && (
                      <motion.div variants={badgeVariants} className="inline-flex">
                        <Badge variant="outline" className="text-xs border-primary text-primary">
                          En Curso
                        </Badge>
                      </motion.div>
                    )}
                    {edu.certificate && (
                      <div className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ 
                            scale: [1, 1.05, 1],
                            transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <PdfDialog
                            title={edu.title}
                            src={edu.certificate}
                            downloadName={downloadNameForTitle(edu.title)}
                            trigger={
                              <Button variant="outline" size="sm" className="text-xs shadow-sm">
                                <Eye className="w-3 h-3 mr-1" />
                                Ver
                              </Button>
                            }
                          />
                        </motion.div>
                        <motion.div
                          whileHover={{ 
                            scale: [1, 1.05, 1],
                            transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <Button variant="outline" size="sm" className="text-xs shadow-sm" asChild>
                            <a href={edu.certificate} download={downloadNameForTitle(edu.title)}>
                              <Download className="w-3 h-3 mr-1" />
                              Descargar
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-medium mt-1">{edu.institution}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );

  return (
    <section
      id="education"
      className="relative py-14 sm:py-20 bg-muted/30"
    >
      <SectionParallax variant="muted" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            className="mb-12 sm:mb-16"
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
            description={
              <span className="font-bold text-lg sm:text-xl text-foreground">
                Mi trayectoria académica combina ciencias sociales con tecnología, especializándome en ciencia de datos e inteligencia artificial.
              </span>
            }
          />
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <div className="max-w-6xl mx-auto rounded-2xl border border-border/60 bg-background/80 p-5 sm:p-8 shadow-sm">
            <EducationCategory title="Título Profesional" items={titulo} icon={Award} />
            <EducationCategory title="Diplomados" items={diplomados} icon={Scroll} />
            <EducationCategory title="Cursos y Bootcamps" items={cursos} icon={BookOpen} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
