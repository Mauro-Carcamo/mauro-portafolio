"use client"

import { ImageCarousel } from "@/components/image-carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, ArrowLeft, Music, TrendingUp, Search, BarChart2 } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionParallax } from "@/components/section-parallax"
import { Header } from "@/components/header"

export default function MusicLyricsProject() {
  const projectImages = ["/music-lyrics-analysis.png"]

  const technologies = [
    "Python",
    "BeautifulSoup",
    "Selenium",
    "Pandas",
    "Matplotlib",
    "NLTK",
    "Web Scraping",
    "Text Mining",
    "Data Analysis",
  ]

  const features = [
    {
      icon: Search,
      title: "Extracción automatizada",
      description: "Web scraping con BeautifulSoup y Selenium para recolectar letras de canciones populares entre 1960 y 2020.",
    },
    {
      icon: TrendingUp,
      title: "Análisis de tendencias",
      description: "Identificación de cambios en temáticas, vocabulario y estructuras lingüísticas a través de las décadas.",
    },
    {
      icon: Music,
      title: "Corpus textual",
      description: "Construcción de un corpus con cientos de canciones ordenadas por año, género y popularidad.",
    },
    {
      icon: BarChart2,
      title: "Visualización de resultados",
      description: "Gráficos de frecuencia de palabras, evolución de temas y comparativas por período musical.",
    },
  ]

  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <SectionParallax />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative">
        <Link href="/#projects">
          <Button variant="ghost" className="mb-8 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Proyectos
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column */}
          <div className="space-y-8">
            <ScrollReveal>
              <div>
                <Badge className="mb-4" variant="secondary">Web Scraping · NLP · Data Analysis</Badge>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                  Web Scraping Letras de Canciones
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Extracción y análisis de letras musicales (1960–2020) para identificar tendencias,
                  cambios lingüísticos y patrones en la música popular a través de las décadas.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Button variant="outline" className="rounded-full" asChild>
                    <a href="https://github.com/Mauro-Carcamo" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Ver Código
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={60}>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <Card key={index} className="rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                    <CardContent className="pt-5 pb-4">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100}>
              <Card className="rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                <CardHeader className="pt-5 pb-2">
                  <CardTitle className="text-base font-bold">Stack tecnológico</CardTitle>
                </CardHeader>
                <CardContent className="pb-5">
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delayMs={120}>
              <Card className="rounded-2xl border border-border/60 bg-muted/20 shadow-sm">
                <CardContent className="pt-5 pb-4">
                  <h3 className="font-semibold text-sm mb-3">Metodología</h3>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>Identificación de fuentes y planificación del scraping</li>
                    <li>Extracción automatizada de letras con BeautifulSoup y Selenium</li>
                    <li>Limpieza y normalización del corpus textual con Pandas</li>
                    <li>Tokenización y eliminación de stopwords con NLTK</li>
                    <li>Análisis de frecuencias y evolución temporal de vocabulario</li>
                    <li>Visualización de resultados con Matplotlib</li>
                  </ol>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Right column */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <ScrollReveal variant="right">
              <ImageCarousel images={projectImages} alt="Análisis de Letras Musicales" />
            </ScrollReveal>

            <ScrollReveal variant="right" delayMs={80}>
              <Card className="rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                <CardContent className="pt-5 pb-4 space-y-3">
                  <h3 className="font-semibold text-sm">Datos del proyecto</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Período analizado</p>
                      <p className="font-medium">1960 – 2020</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Tipo de análisis</p>
                      <p className="font-medium">NLP + Web Scraping</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Lenguaje principal</p>
                      <p className="font-medium">Python</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Output</p>
                      <p className="font-medium">Gráficos + Dataset</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
