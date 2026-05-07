"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { SectionParallax } from "@/components/section-parallax"
import { ScrollReveal } from "@/components/scroll-reveal"
import { motion, Variants } from "framer-motion"

export function ExperienceSection() {
  const experiences = [
    {
      company: "Consultora Epojé",
      position: "Coordinador de proyecto",
      period: "Sep 2024 - Dic 2024",
      location: "Santiago, Chile",
      description:
        "Adjudicación proyecto Escuela de formación Sindical, Departamento Diálogo Social, Ministerio del Trabajo. Responsable de la planificación, ejecución y evaluación del proyecto, incluyendo el diseño de módulos de formación para sindicatos, gestión de equipos y participantes, desarrollo de herramientas evaluativas, seguimiento de indicadores clave como asistencia y resultados de aprendizaje.",
      achievements: [
        "Automatización de correos y mensajes de WhatsApp",
        "Gestión de equipos multidisciplinarios",
        "Desarrollo de herramientas evaluativas",
      ],
      technologies: ["Automatización", "Gestión de Proyectos", "Análisis de Datos"],
    },
    {
      company: "Agencia I-Brain Digital",
      position: "Community Manager",
      period: "Abr 2024 - Ago 2024",
      location: "Santiago, Chile",
      description:
        "Responsable de la creación de contenido y la gestión de diseño para publicaciones en redes sociales, trabajando con empresas de los sectores editorial, imprenta, médico y de venta de vehículos.",
      achievements: [
        "Análisis de datos mediante Meta Business Suite",
        "Optimización de campañas digitales",
        "Mejora del alcance de marcas en plataformas digitales",
      ],
      technologies: ["Meta Business Suite", "Análisis de Datos", "Marketing Digital"],
    },
    {
      company: "Nadar Ediciones",
      position: "Asesoría en Datos",
      period: "Sep 2023 - Dic 2023",
      location: "Santiago, Chile",
      description:
        "Recolección y organización de datos para el análisis de ventas y costos. Implementé la vinculación de datos provenientes de redes sociales con métricas de ventas, lo que permitió identificar tendencias y optimizar estrategias comerciales.",
      achievements: [
        "Creación de dashboard en Google Looker Studios",
        "Identificación de tendencias de ventas",
        "Optimización de estrategias comerciales",
      ],
      technologies: ["Google Looker Studios", "Análisis de Ventas", "Data Analytics"],
    },
    {
      company: "Universidad de Valparaíso",
      position: "Analista de Datos",
      period: "Dic 2022",
      location: "Valparaíso, Chile",
      description:
        "Desarrollo de investigación sobre factores que inciden en el desempeño académico de los estudiantes de la carrera de Auditoría (2017-2021). Responsable de la limpieza y estructura de datos socioeconómicos y evaluaciones académicas.",
      achievements: [
        "Aplicación de modelos de machine learning no supervisados",
        "Creación de clustering",
        "Visualización y presentación de resultados",
      ],
      technologies: ["Machine Learning", "Python", "R", "Data Visualization"],
    },
    {
      company: "Conectados S.A.",
      position: "Análisis de Datos y Coaching de Ventas",
      period: "Abr 2018 - Ago 2022",
      location: "Santiago, Chile",
      description:
        "Contact Center dedicado a la venta de servicios. Diseñé dashboards en Google Data Studio para monitorear métricas clave como ventas, dotación y rendimiento de campañas.",
      achievements: [
        "Incremento de ventas mediante estrategias basadas en datos",
        "Optimización de gestión de equipos comerciales",
        "Coordinación de capacitación en Latam",
      ],
      technologies: ["Google Data Studio", "Análisis de Ventas", "Gestión de Equipos"],
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 20 
      } 
    },
  }

  return (
    <section id="experience" className="relative py-14 sm:py-20">
      <SectionParallax />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              className="mb-12 sm:mb-16"
              eyebrow="Trayectoria"
              title={
                <>
                  Experiencia <span className="text-primary">Profesional</span>
                </>
              }
              description="Más de 6 años de experiencia en análisis de datos, gestión de proyectos y liderazgo de equipos."
            />
          </ScrollReveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                layout
                whileHover={{
                  y: -5,
                  scale: 1.005,
                  rotateX: -1,
                  rotateY: 1,
                }}
                whileTap={{ scale: 0.99 }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <Card className="rounded-2xl border border-border/60 bg-background/80 shadow-sm transition-shadow duration-300 hover:shadow-xl">
                  <CardHeader className="px-4 sm:px-5 pt-5 pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg sm:text-xl font-bold tracking-tight mb-2">{exp.position}</CardTitle>
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Building className="h-4 w-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-5 pb-5">
                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Logros principales:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
