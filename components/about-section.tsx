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
              Sociólogo con experiencia profesional especializado en Ciencia de Datos. Combino formación académica
              sólida con habilidades técnicas en análisis de datos, machine learning y programación (R, Python, SQL).
              Experiencia demostrada en gestión de proyectos sociales, coordinación de equipos y análisis de datos para
              la toma de decisiones.
            </p>

            <p className="text-base sm:text-lg leading-relaxed">
              He liderado iniciativas de formación y capacitación, implementado soluciones de automatización y
              desarrollado dashboards para optimización de procesos en diversos sectores. Destaco por mi capacidad para
              traducir datos en insights accionables y por implementar mejoras operativas que impactan positivamente en
              los resultados organizacionales.
            </p>

            <p className="text-base sm:text-lg leading-relaxed">
              Actualmente cursando un Diplomado en Inteligencia Artificial en la Universidad Autónoma, con experiencia
              reciente como Coordinador de Proyectos en Consultora Epojé y Community Manager en Agencia I-Brain Digital,
              siempre aplicando tecnologías modernas para resolver problemas complejos.
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
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <highlight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-2">{highlight.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{highlight.description}</p>
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
