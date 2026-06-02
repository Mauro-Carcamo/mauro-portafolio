"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { SectionParallax } from "@/components/section-parallax"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SkillTooltipIcon } from "@/components/skill-tooltip-icon"
import { motion, Variants } from "framer-motion"

export function SkillsSection() {
  const descriptions: Record<string, string> = {
    Python: "Lenguaje principal para análisis de datos, ML y automatización.",
    Pandas: "Manipulación y análisis de datos tabulares.",
    "Scikit-learn": "Machine Learning: clasificación, regresión y clustering.",
    Matplotlib: "Visualización de datos con gráficos personalizados.",
    R: "Análisis estadístico, NLP y visualizaciones con Shiny.",
    SQL: "Consultas, limpieza y validación de bases de datos relacionales.",
    "Power BI": "Dashboards interactivos para Business Intelligence.",
    "Looker Studio": "Visualización de datos y reportes con Google Looker Studio.",
    NLTK: "Procesamiento de lenguaje natural en Python.",
    "Scikit-learn NLP": "Modelos de texto, TF-IDF y vectorización.",
    React: "Librería para crear interfaces con componentes.",
    "Next.js": "Framework de React para apps rápidas con buen SEO.",
    TypeScript: "JavaScript con tipos estáticos para código más seguro.",
    "Tailwind CSS": "CSS por clases utilitarias para diseño rápido.",
    "Node.js": "JavaScript en el servidor.",
    FastAPI: "Framework Python para APIs rápidas y modernas.",
    PostgreSQL: "Base de datos relacional robusta.",
    MongoDB: "Base de datos NoSQL basada en documentos.",
    Supabase: "Backend listo: Postgres + Auth + Storage.",
    Git: "Control de versiones para código.",
    Docker: "Contenedores para entornos reproducibles.",
    AWS: "Servicios cloud para infraestructura.",
    Vercel: "Hosting y despliegue para aplicaciones web.",
  }

  const skillCategories = [
    {
      title: "Data Science & ML",
      skills: [
        { name: "Python" },
        { name: "Pandas" },
        { name: "Scikit-learn" },
        { name: "Matplotlib" },
        { name: "R" },
        { name: "SQL" },
      ],
    },
    {
      title: "BI & Visualización",
      skills: [
        { name: "Power BI" },
        { name: "Looker Studio" },
      ],
    },
    {
      title: "Desarrollo Web",
      skills: [
        { name: "React" },
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Node.js" },
        { name: "FastAPI" },
      ],
    },
    {
      title: "Infraestructura",
      skills: [
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "Supabase" },
        { name: "Git" },
        { name: "Docker" },
        { name: "AWS" },
        { name: "Vercel" },
      ],
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        staggerChildren: 0.08,
        delayChildren: 0.2
      } 
    },
  }

  const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 10 } },
  }

  return (
    <section
      id="skills"
      className="relative py-14 sm:py-20 bg-muted/30"
    >
      <SectionParallax variant="muted" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              className="mb-12 sm:mb-16"
              eyebrow="Stack"
              title={
                <>
                  Habilidades <span className="text-primary">Técnicas</span>
                </>
              }
              description="Herramientas y lenguajes que uso para analizar datos, construir modelos de Machine Learning, crear dashboards y desarrollar aplicaciones completas."
            />
          </ScrollReveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                layout
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  rotateX: -2,
                  rotateY: 2,
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                className="h-full"
              >
                <Card className="h-full rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                  <CardHeader className="px-4 sm:px-5 pt-5 pb-2">
                    <CardTitle className="text-lg sm:text-xl font-bold text-center tracking-tight">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap justify-center gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          variants={iconVariants}
                          whileHover={{ scale: 1.15, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <SkillTooltipIcon
                            techName={skill.name}
                            description={descriptions[skill.name] ?? "Tecnología usada en mis proyectos."}
                          />
                        </motion.div>
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
