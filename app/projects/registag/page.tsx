"use client"

import { ImageCarousel } from "@/components/image-carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, ArrowLeft, ExternalLink, ScanLine, ShieldCheck, FileCheck2, Radio } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionParallax } from "@/components/section-parallax"
import { Header } from "@/components/header"

export default function RegistagProject() {
  const projectImages = ["/projects/registag.jpg"]

  const technologies = [
    "ESP8266",
    "RFID",
    "IoT",
    "Google Apps Script",
    "Google Sheets",
    "Next.js",
    "Playwright",
  ]

  const features = [
    {
      icon: ScanLine,
      title: "Registro automático en terreno",
      description: "Dispositivo con lector RFID que registra la entrega de Equipos de Protección Personal (EPP) al momento, sin planillas ni papel.",
    },
    {
      icon: FileCheck2,
      title: "Pipeline hacia Google Sheets",
      description: "Google Apps Script centraliza los eventos de entrega, controla estados de stock y genera alertas y constancias legales digitales.",
    },
    {
      icon: ShieldCheck,
      title: "Cumplimiento normativo",
      description: "Trazabilidad pensada para cumplir con el DS 594 en la entrega de EPP, con respaldo digital de cada entrega.",
    },
    {
      icon: Radio,
      title: "Piloto en producción",
      description: "Desplegado en una empresa real: 150 trabajadores y más de 15 tipos de EPP gestionados en terreno.",
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
                <Badge className="mb-4" variant="secondary">IoT · RFID · Cumplimiento Normativo</Badge>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                  Registag
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Plataforma de trazabilidad de Equipos de Protección Personal (EPP) para cumplimiento normativo:
                  registro automático de entregas en terreno mediante RFID, con pipeline de datos hacia Google
                  Sheets para control de estados, alertas y constancias legales digitales.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Button className="rounded-full" asChild>
                    <a href="https://regist4g.vercel.app" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Landing
                    </a>
                  </Button>
                  <Button variant="outline" className="rounded-full" asChild>
                    <a href="https://github.com/Regist4g" target="_blank" rel="noopener noreferrer">
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
                  <h3 className="font-semibold text-sm mb-3">Flujo del sistema</h3>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>Diseño del dispositivo edge con lector RFID (ESP8266) para terreno</li>
                    <li>Registro del trabajador y de cada EPP entregado mediante escaneo de tags</li>
                    <li>Envío de eventos a un pipeline en Google Apps Script</li>
                    <li>Control de stock, estados y alertas en Google Sheets</li>
                    <li>Generación de constancias legales digitales para cumplimiento normativo</li>
                    <li>Pruebas automatizadas end-to-end vía MCP Playwright</li>
                  </ol>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Right column */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <ScrollReveal variant="right">
              <ImageCarousel images={projectImages} alt="Dispositivo Registag" />
            </ScrollReveal>

            <ScrollReveal variant="right" delayMs={80}>
              <Card className="rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                <CardContent className="pt-5 pb-4 space-y-3">
                  <h3 className="font-semibold text-sm">Datos del proyecto</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Estado</p>
                      <p className="font-medium">Piloto en producción</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Trabajadores</p>
                      <p className="font-medium">150</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Tipos de EPP</p>
                      <p className="font-medium">15+</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Inicio</p>
                      <p className="font-medium">Ene 2026</p>
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
