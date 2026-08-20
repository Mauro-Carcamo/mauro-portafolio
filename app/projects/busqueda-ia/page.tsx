"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, ArrowLeft, Search, Brain, ClipboardCheck, BarChart3, LineChart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionParallax } from "@/components/section-parallax"
import { Header } from "@/components/header"
import { PostulacionesPopup } from "@/components/postulaciones-popup"

export default function BusquedaIAProject() {
  const [popupOpen, setPopupOpen] = useState(false)
  const technologies = ["Python", "Playwright", "Pandas", "Machine Learning", "Ollama"]

  const features = [
    {
      icon: Search,
      title: "Scraping multi-portal",
      description: "Extrae ofertas de 13 portales laborales chilenos y remotos en español (Laborum, Chiletrabajos, Trabajando, GetOnBrd, Computrabajo, entre otros).",
    },
    {
      icon: Brain,
      title: "Matching CV↔oferta con IA",
      description: "Compara cada oferta contra el CV en dos etapas: embeddings semánticos y, opcionalmente, un LLM local (Ollama) para un juicio más fino.",
    },
    {
      icon: ClipboardCheck,
      title: "Seguimiento de postulaciones",
      description: "Detecta el estado de cada postulación por portal (CV visualizado, en proceso, aviso finalizado) y arma un historial consultable por empresa.",
    },
    {
      icon: BarChart3,
      title: "Análisis de mercado",
      description: "Frecuencia de palabras clave más demandadas, distribución salarial y tendencias, para priorizar en qué enfocar el CV.",
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
          <div className="space-y-8">
            <ScrollReveal>
              <div>
                <Badge className="mb-4" variant="secondary">Web Scraping · IA · Automatización</Badge>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                  Búsqueda IA
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Scraper y analizador de ofertas laborales: extrae, enriquece y clasifica ofertas de 13
                  portales, las compara contra el CV con IA y hace seguimiento de cada postulación —
                  proyecto de uso personal para ordenar y priorizar la búsqueda de trabajo.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Button className="rounded-full" onClick={() => setPopupOpen(true)}>
                    <LineChart className="h-4 w-4 mr-2" />
                    Ver historial de postulaciones
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
          </div>

          <div className="lg:sticky lg:top-24 space-y-6">
            <ScrollReveal variant="right">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/60 bg-muted/20 shadow-lg">
                <Image
                  src="/task-management-dashboard.png"
                  alt="Dashboard de seguimiento de postulaciones"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right" delayMs={80}>
              <Card className="rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                <CardContent className="pt-5 pb-4 space-y-3">
                  <h3 className="font-semibold text-sm">Datos del proyecto</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Portales cubiertos</p>
                      <p className="font-medium">13</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Uso</p>
                      <p className="font-medium">Personal</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Matching</p>
                      <p className="font-medium">Embeddings + LLM local</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Automatización</p>
                      <p className="font-medium">Login + postulación asistida</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <PostulacionesPopup open={popupOpen} onOpenChange={setPopupOpen} />
    </div>
  )
}
