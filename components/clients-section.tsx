﻿"use client"

import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { SectionParallax } from "@/components/section-parallax"
import { ScrollReveal } from "@/components/scroll-reveal"

const clients = [
  { title: "Espacio Eme Centro Médico", description: "Análisis de datos clínicos, trazabilidad de calibración y automatización de reportes." },
  { title: "Consultora Epojé", description: "Coordinación de proyectos y análisis de datos para el sector público." },
  { title: "Agencia I-Brain Digital", description: "Optimización de campañas digitales mediante análisis de datos." },
  { title: "Nadar Ediciones", description: "Implementación de dashboards comerciales y análisis de ventas." },
  { title: "Universidad de Valparaíso", description: "Investigación académica y modelos de Machine Learning (Clustering)." },
  { title: "Conectados S.A.", description: "Análisis de métricas de rendimiento y coaching basado en datos." },
]

function initials(name: string) {
  const words = name.replace(/S\.A\.$/, "").trim().split(/\s+/).filter(Boolean)
  const significant = words.filter((w) => !["de", "del", "la", "los", "y"].includes(w.toLowerCase()))
  const pick = significant.length > 0 ? significant : words
  if (pick.length >= 2) return pick.slice(0, 2).map((w) => w[0]).join("").toUpperCase()
  return (pick[0] ?? "").slice(0, 2).toUpperCase()
}

export function ClientsSection() {
  return (
    <section id="clients" className="relative py-14 sm:py-20">
      <SectionParallax />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            className="mb-12 sm:mb-16"
            eyebrow="Clientes"
            title={
              <>
                Empresas y <span className="text-primary">Colaboraciones</span>
              </>
            }
            description="Organizaciones e instituciones con las que he colaborado aplicando soluciones de análisis de datos y gestión estratégica."
          />
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {clients.map((client) => (
              <Card
                key={client.title}
                className="flex flex-row items-start gap-4 rounded-2xl border border-border/60 bg-background/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-bold text-primary">
                  {initials(client.title)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">{client.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{client.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
