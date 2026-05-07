"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { SectionParallax } from "@/components/section-parallax"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SkillTooltipIcon } from "@/components/skill-tooltip-icon"
import { motion, Variants } from "framer-motion"

export function SkillsSection() {
  const descriptions: Record<string, string> = {
    React: "Librería para crear interfaces con componentes.",
    "Next.js": "Framework de React para apps rápidas con rutas y buen SEO.",
    TypeScript: "JavaScript con tipos para evitar errores.",
    "Tailwind CSS": "CSS por clases para diseñar rápido y consistente.",
    "Vue.js": "Framework para interfaces web reactivas.",
    "Node.js": "JavaScript en el servidor.",
    Python: "Lenguaje versátil para datos y backend.",
    FastAPI: "Framework Python para APIs rápidas y modernas.",
    PostgreSQL: "Base de datos relacional robusta.",
    MongoDB: "Base de datos NoSQL basada en documentos.",
    Redis: "Base en memoria para caché y colas.",
    Supabase: "Backend listo: Postgres + Auth + Storage.",
    Git: "Control de versiones para tu código.",
    Docker: "Contenedores para correr apps igual en cualquier entorno.",
    AWS: "Servicios cloud para infraestructura.",
    Vercel: "Hosting y despliegue (ideal para Next.js).",
    Figma: "Diseño y prototipado de interfaces.",
  }

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React" },
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Vue.js" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js" },
        { name: "Python" },
        { name: "FastAPI" },
      ],
    },
    {
      title: "Base de Datos",
      skills: [
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "Redis" },
        { name: "Supabase" },
      ],
    },
    {
      title: "Herramientas",
      skills: [
        { name: "Git" },
        { name: "Docker" },
        { name: "AWS" },
        { name: "Vercel" },
        { name: "Figma" },
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
              description="Estas son las herramientas que uso para construir aplicaciones y trabajar con datos: lo que se ve (pantallas) y lo que funciona por dentro (servidor y base de datos)."
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
