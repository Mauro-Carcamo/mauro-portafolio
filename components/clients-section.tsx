﻿"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { SectionParallax } from "@/components/section-parallax"
import { ScrollReveal } from "@/components/scroll-reveal"

const clients = [
  { title: "Consultora Epojé", logo: "/logos/epoje.png", description: "Coordinación de proyectos y análisis de datos para el sector público." },
  { title: "Agencia I-Brain Digital", logo: "/logos/ibrain.png", description: "Optimización de campañas digitales mediante análisis de datos." },
  { title: "Nadar Ediciones", logo: "/logos/nadar.png", description: "Implementación de dashboards comerciales y análisis de ventas." },
  { title: "Universidad de Valparaíso", logo: "/logos/uv.png", description: "Investigación académica y modelos de Machine Learning (Clustering)." },
  { title: "Conectados S.A.", logo: "/logos/conectados.png", description: "Análisis de métricas de rendimiento y coaching basado en datos." },
]

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {clients.map((client) => (
              <Card
                key={client.title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] bg-muted/30">
                  <div className="absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-300 group-hover:opacity-0">
                    <Image
                      src={client.logo}
                      alt={client.title}
                      fill
                      className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-5 opacity-0 transition-all duration-300 group-hover:bg-black/80 group-hover:opacity-100">
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-[0.25em] text-primary">Colaboración</p>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{client.title}</h3>
                      <p className="text-sm leading-relaxed text-white/80">
                        {client.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
