"use client"

import type React from "react"

import { Mail, Phone } from "lucide-react"
import { SocialLinks } from "@/components/social-links"
import { SectionHeader } from "@/components/section-header"
import { SectionParallax } from "@/components/section-parallax"
import { ScrollReveal } from "@/components/scroll-reveal"

export function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "mauro.carcamo89@gmail.com",
      href: "mailto:mauro.carcamo89@gmail.com",
    },
    {
      icon: Phone,
      title: "Teléfono",
      value: "+56 9 9038 1919",
      href: "tel:+56990381919",
    },

  ]

  return (
    <section
      id="contact"
      className="relative py-14 sm:py-20"
    >
      <SectionParallax />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            className="mb-10 sm:mb-14"
            eyebrow="Hablemos"
            title={
              <>
                <span className="text-primary">Contacto</span>
              </>
            }
            description="¿Tienes un proyecto de ciencia de datos o desarrollo? Me encantaría colaborar contigo y aplicar machine learning para resolver desafíos reales."
          />
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <SocialLinks className="flex flex-wrap justify-center gap-5 mb-10 sm:mb-14" size="md" />
        </ScrollReveal>

        <ScrollReveal delayMs={120}>
          <div className="grid grid-cols-1 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 text-center">
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 tracking-tight">Información de Contacto</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{info.title}</p>
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 underline-offset-4 hover:underline"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
