"use client"

import { ImageCarousel } from "@/components/image-carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionParallax } from "@/components/section-parallax"

export default function MusicLyricsProject() {
  const projectImages = ["/music-lyrics-analysis.png"]

  const technologies = [
    "Python",
    "BeautifulSoup",
    "Selenium",
    "Pandas",
    "Matplotlib",
    "Data Analysis",
    "Web Scraping",
    "Text Mining",
  ]

  return (
    <div className="relative min-h-screen bg-background">
      <SectionParallax />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <Link href="/#projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Proyectos
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <ScrollReveal>
              <div>
                <h1 className="text-4xl font-bold mb-4">Web Scraping Letras de Canciones</h1>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  Extracción y análisis de letras musicales (1960-2020) para identificar tendencias y patrones en la
                  música popular a través de las décadas.
                </p>

                <div className="flex gap-4 mb-8">
                  <Button className="rounded-full" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Demo
                    </a>
                  </Button>
                  <Button variant="outline" className="rounded-full" asChild>
                    <a href="https://github.com/Mauro-Carcamo" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Ver Código
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={80}>
              <Card className="rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                <CardHeader className="pt-5 pb-2">
                  <CardTitle className="text-lg sm:text-xl font-bold">Tecnologías de Web Scraping</CardTitle>
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
          </div>

          <div className="lg:sticky lg:top-8">
            <ScrollReveal variant="right">
              <ImageCarousel images={projectImages} alt="Análisis de Letras Musicales" />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
