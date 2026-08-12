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
      company: "Espacio Eme Centro Médico",
      position: "Consultor de Datos",
      period: "Nov 2025 - Feb 2026",
      location: "Santiago, Chile",
      description:
        "Consolidación y análisis de data de termómetros para certificación de refrigeradores de elementos orgánicos sensibles. Análisis de registros de temperatura de 12 termómetros en 3 pisos, con cadencia de 5 minutos durante 5 meses, detectando errores, outliers y fluctuaciones fuera de rango. Desarrollo asistido por IA (Claude Code) en VS Code.",
      achievements: [
        "Certificación aprobada para el uso de los equipos en la conservación de elementos orgánicos sensibles",
        "Garantía de trazabilidad y cumplimiento normativo",
        "Automatización de tareas de procesamiento de datos",
      ],
      technologies: ["Python", "Pandas", "Data Cleaning", "Automatización", "Reportería"],
    },
    {
      company: "Consultora Epojé · Ministerio del Trabajo",
      position: "Coordinador de Proyecto",
      period: "Sep 2023 - Dic 2024",
      location: "Santiago / Valparaíso, Chile",
      description:
        "Escuela de Formación Sindical (Dpto. de Diálogo Social, 2024) y Escuela de Formación MYPES, Región de Valparaíso (2023). Responsable de la planificación, ejecución y evaluación integral de ambos proyectos adjudicados, incluyendo el diseño de módulos de formación y de evaluación por módulo (Google Forms), alcanzando una tasa de aprobación del 95%.",
      achievements: [
        "Plataforma web de comunicación centralizada con automatización de WhatsApp y correo electrónico",
        "Tasa de aprobación del 95%, cumpliendo el estándar exigido por el programa",
        "Planificación, ejecución y evaluación integral de dos proyectos adjudicados",
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
      company: "Universidad Diego Portales",
      position: "Consultor de Datos",
      period: "Sep 2022 - Ene 2023",
      location: "Santiago, Chile",
      description:
        "Auditoría documental para el proceso de acreditación de postítulos de la carrera de Medicina. Auditoría y validación de estudios y certificaciones de 35 doctores, contrastando la información contra el Registro Nacional de Prestadores de Salud.",
      achievements: [
        "Automatización mediante web scraping dinámico de la descarga masiva de documentos",
        "Reducción significativa del tiempo de recopilación manual",
        "Construcción de base de datos con currículum académico, publicaciones y experiencia docente",
      ],
      technologies: ["Web Scraping", "Python", "Auditoría de Datos"],
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
      company: "Conectados S.A. (Contact Center)",
      position: "Analista de Datos & Coordinador de Capacitación",
      period: "Abr 2018 - Ago 2023",
      location: "Santiago, Chile",
      description:
        "Campañas WOM, Virgin Mobile, UC Christus y Seguros Santander. Liderazgo de 2 personas a cargo (Capacitación y Calidad de Venta) y supervisión directa de 10 personas en la campaña Virgin Mobile (2019). Diseño de dashboard integral en Power BI con validaciones del proceso de venta.",
      achievements: [
        "Sistema propio de registro de venta y lectura automática de contrato",
        "Capacitaciones semanales (30-40 personas) para equipos de venta en Chile, Colombia y Venezuela (LATAM)",
        "Creación y mantención de sitio web interno con tutoriales y recursos para ejecutivos",
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
              description="Más de 8 años de experiencia en análisis de datos, gestión de proyectos y automatización de procesos en múltiples sectores."
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
                      <h4 className="text-sm font-semibold mb-3 text-foreground/80">Logros principales:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                            <span className="leading-snug">{achievement}</span>
                          </li>
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
