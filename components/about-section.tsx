import { Card, CardContent } from "@/components/ui/card"
import { Database, Brain, Code } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { SectionParallax } from "@/components/section-parallax"
import { ScrollReveal } from "@/components/scroll-reveal"

export function AboutSection() {
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

  return (
    <section
      id="about"
      className="relative py-14 sm:py-20 bg-muted/30"
    >
      <SectionParallax variant="muted" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeader
            className="mb-12 sm:mb-16"
            eyebrow="Perfil"
            title={
              <>
                Acerca de <span className="text-primary">mí</span>
              </>
            }
            description="Analista de Datos / Científico de Datos con formación en Ciencias Sociales y más de 8 años de experiencia resolviendo problemas de negocio."
          />
          </ScrollReveal>

          <ScrollReveal delayMs={80}>
            <div className="max-w-4xl mx-auto space-y-6 mb-16">
            <p className="text-base sm:text-lg leading-relaxed">
              Analista de Datos / Científico de Datos con formación en Ciencias Sociales (Sociólogo) y diplomados en
              Ciencia de Datos e Inteligencia Artificial, con más de 8 años de experiencia resolviendo problemas de
              negocio en empresas, pymes y proyectos públicos. Dominio de Python, R y SQL para el ciclo completo de
              trabajo con datos: extracción, limpieza, modelamiento, evaluación de algoritmos de Machine Learning y
              visualización en Power BI y Looker Studio.
            </p>

            <p className="text-base sm:text-lg leading-relaxed">
              Experiencia en automatización de procesos (web scraping, Google Apps Script) orientada al
              descubrimiento de insights y la toma de decisiones. Desarrollador de proyectos propios que integran
              IoT, sensores e IA aplicada a grandes volúmenes de datos. Busco integrar equipos multidisciplinarios
              orientados a resultados.
            </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={120}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <Card
                key={index}
                className="text-center p-6 rounded-2xl border border-border/60 bg-background/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <CardContent className="pt-4">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <highlight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2">{highlight.title}</h3>
                  <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
