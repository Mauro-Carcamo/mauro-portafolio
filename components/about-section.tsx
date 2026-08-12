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
            description="Sociólogo especializado en Ciencia de Datos con experiencia en Machine Learning, análisis predictivo y desarrollo Full Stack."
          />
          </ScrollReveal>

          <ScrollReveal delayMs={80}>
            <div className="max-w-4xl mx-auto space-y-6 mb-16">
            <p className="text-base sm:text-lg leading-relaxed">
              Sociólogo especializado en Ciencia de Datos con más de 8 años de experiencia profesional. Combino
              formación académica sólida con habilidades técnicas en análisis de datos, machine learning y programación
              (Python, R, SQL). Experiencia demostrada en análisis de datos para la toma de decisiones, gestión de
              proyectos y automatización de procesos en sectores de salud, educación, telecomunicaciones y medios.
            </p>

            <p className="text-base sm:text-lg leading-relaxed">
              He desarrollado dashboards con Power BI y Looker Studio, implementado modelos de clustering y NLP,
              automatizado procesos de extracción de datos mediante web scraping y liderado equipos multidisciplinarios.
              Me destaco por traducir datos complejos en insights accionables que impactan positivamente en los
              resultados de las organizaciones.
            </p>

            <p className="text-base sm:text-lg leading-relaxed">
              Cuento con Diplomado en Data Science (PUC, 2022) y Diplomado en Inteligencia Artificial (Universidad
              Autónoma, 2025), además de múltiples certificaciones en análisis de datos, NLP y desarrollo de software.
              Disponible para trabajo remoto o híbrido.
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
