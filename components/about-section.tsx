import { Card, CardContent } from "@/components/ui/card"
import { Database, Brain, Code } from "lucide-react"

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
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Acerca de mí</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sociólogo especializado en Ciencia de Datos con experiencia en Machine Learning, análisis predictivo y
              desarrollo Full Stack
            </p>
          </div>

          <div className="space-y-6 mb-16">
            <p className="text-lg leading-relaxed">
              Sociólogo con experiencia profesional especializado en Ciencia de Datos. Combino formación académica
              sólida con habilidades técnicas en análisis de datos, machine learning y programación (R, Python, SQL).
              Experiencia demostrada en gestión de proyectos sociales, coordinación de equipos y análisis de datos para
              la toma de decisiones.
            </p>

            <p className="text-lg leading-relaxed">
              He liderado iniciativas de formación y capacitación, implementado soluciones de automatización y
              desarrollado dashboards para optimización de procesos en diversos sectores. Destaco por mi capacidad para
              traducir datos en insights accionables y por implementar mejoras operativas que impactan positivamente en
              los resultados organizacionales.
            </p>

            <p className="text-lg leading-relaxed">
              Actualmente cursando un Diplomado en Inteligencia Artificial en la Universidad Autónoma, con experiencia
              reciente como Coordinador de Proyectos en Consultora Epojé y Community Manager en Agencia I-Brain Digital,
              siempre aplicando tecnologías modernas para resolver problemas complejos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <highlight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
