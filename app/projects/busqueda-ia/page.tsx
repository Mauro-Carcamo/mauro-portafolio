"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import {
  Github,
  ArrowLeft,
  Search,
  Brain,
  ClipboardCheck,
  BarChart3,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionParallax } from "@/components/section-parallax"
import { Header } from "@/components/header"

// Datos de ejemplo (empresas, cifras y fechas ficticias) — solo para
// demostrar cómo funciona el popup de seguimiento. No corresponden a
// postulaciones reales.
const RESUMEN_EJEMPLO = {
  totalOfertas: 612,
  totalPlataformas: 13,
  totalPostulaciones: 6,
  porPortal: [
    { portal: "Chiletrabajos.cl", cantidad: 180 },
    { portal: "Computrabajo.cl", cantidad: 150 },
    { portal: "GetOnBrd.cl", cantidad: 120 },
    { portal: "Trabajando.cl", cantidad: 90 },
    { portal: "Laborum.cl", cantidad: 72 },
  ],
  porKeyword: [
    { keyword: "Analista de Datos", cantidad: 140 },
    { keyword: "Data Scientist", cantidad: 95 },
    { keyword: "Power BI", cantidad: 80 },
    { keyword: "Machine Learning", cantidad: 70 },
    { keyword: "SQL", cantidad: 60 },
    { keyword: "Business Intelligence", cantidad: 55 },
  ],
}

const EMPRESAS_EJEMPLO: Record<
  string,
  { titulo: string; portal: string; fecha: string; estado: string; dias: number }[]
> = {
  "Andes Analytics": [
    { titulo: "Analista de Datos Senior", portal: "Chiletrabajos.cl", fecha: "15-07-2026", estado: "CV visualizado", dias: 12 },
  ],
  "NovaTech Solutions": [
    { titulo: "Data Scientist", portal: "GetOnBrd.cl", fecha: "02-07-2026", estado: "En proceso", dias: 25 },
  ],
  "Grupo Media Sur": [
    { titulo: "Analista BI", portal: "Trabajando.cl", fecha: "18-06-2026", estado: "Aviso finalizado", dias: 40 },
  ],
  "DataBridge Consulting": [
    { titulo: "Ingeniero de Datos", portal: "Computrabajo.cl", fecha: "20-07-2026", estado: "Enviada", dias: 7 },
  ],
  "Cordillera Software": [
    { titulo: "Analista de Datos Junior", portal: "Laborum.cl", fecha: "10-06-2026", estado: "CV no visualizado", dias: 48 },
  ],
  "Bienestar Digital": [
    { titulo: "Data Analyst", portal: "Chiletrabajos.cl", fecha: "24-07-2026", estado: "CV visualizado", dias: 3 },
  ],
}

function ResumenPostulacionesPopup() {
  const [open, setOpen] = useState(false)
  const [empresa, setEmpresa] = useState("")

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 4500)
    return () => clearTimeout(t)
  }, [])

  const postulaciones = empresa ? EMPRESAS_EJEMPLO[empresa] ?? [] : []
  const maxPortal = Math.max(...RESUMEN_EJEMPLO.porPortal.map((p) => p.cantidad))
  const maxKeyword = Math.max(...RESUMEN_EJEMPLO.porKeyword.map((p) => p.cantidad))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-1rem)] sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-5 sm:p-6"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-muted/60 text-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogTitle className="pr-8 text-lg font-bold tracking-tight">
          Resumen de la búsqueda laboral
        </DialogTitle>
        <p className="mb-4 text-xs text-muted-foreground">
          Datos de ejemplo — así se ve el seguimiento generado por el scraper.
        </p>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="rounded-xl border border-border/60 bg-primary/5 p-3 text-center">
            <div className="text-xl font-bold text-primary">{RESUMEN_EJEMPLO.totalOfertas}</div>
            <div className="text-[11px] text-muted-foreground">Ofertas extraídas</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-primary/5 p-3 text-center">
            <div className="text-xl font-bold text-primary">{RESUMEN_EJEMPLO.totalPlataformas}</div>
            <div className="text-[11px] text-muted-foreground">Plataformas</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-primary/5 p-3 text-center">
            <div className="text-xl font-bold text-primary">{RESUMEN_EJEMPLO.totalPostulaciones}</div>
            <div className="text-[11px] text-muted-foreground">Postulaciones</div>
          </div>
        </div>

        <h3 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
          Ofertas por plataforma
        </h3>
        <div className="space-y-1.5">
          {RESUMEN_EJEMPLO.porPortal.map((p) => (
            <div key={p.portal} className="flex items-center gap-2 text-xs">
              <span className="w-28 shrink-0 truncate">{p.portal}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `${(p.cantidad / maxPortal) * 100}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-right text-muted-foreground">{p.cantidad}</span>
            </div>
          ))}
        </div>

        <h3 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
          Ofertas por palabra clave
        </h3>
        <div className="space-y-1.5">
          {RESUMEN_EJEMPLO.porKeyword.map((p) => (
            <div key={p.keyword} className="flex items-center gap-2 text-xs">
              <span className="w-28 shrink-0 truncate">{p.keyword}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-accent"
                  style={{ width: `${(p.cantidad / maxKeyword) * 100}%` }}
                />
              </span>
              <span className="w-8 shrink-0 text-right text-muted-foreground">{p.cantidad}</span>
            </div>
          ))}
        </div>

        <hr className="my-5 border-border/60" />

        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
          Verificar una postulación
        </h3>
        <select
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <option value="">— Selecciona una empresa —</option>
          {Object.keys(EMPRESAS_EJEMPLO).map((nombre) => (
            <option key={nombre} value={nombre}>
              {nombre}
            </option>
          ))}
        </select>

        {postulaciones.length > 0 && (
          <div className="mt-3 space-y-2">
            {postulaciones.map((p, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-muted/40 p-3">
                <div className="text-sm font-semibold">{p.titulo}</div>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>🌐 {p.portal}</span>
                  <span>📅 {p.fecha}</span>
                  <span>📌 {p.estado}</span>
                </div>
                <span
                  className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    p.dias > 30 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                  }`}
                >
                  {p.dias} día{p.dias === 1 ? "" : "s"} desde la postulación
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="mt-5 text-right text-[11px] text-muted-foreground">
          Datos de ejemplo — no corresponden a postulaciones reales.
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default function BusquedaIAProject() {
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
      description: "Detecta el estado de cada postulación por portal (CV visualizado, en proceso, aviso finalizado) y hace un dashboard consultable por empresa.",
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

      <ResumenPostulacionesPopup />
    </div>
  )
}
