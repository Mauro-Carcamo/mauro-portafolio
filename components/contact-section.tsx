"use client"

import type React from "react"

import { Mail, Phone } from "lucide-react"
import { SocialLinks } from "@/components/social-links"

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
      className="parallax-section py-14 sm:py-20"
      style={{ ["--parallax-speed" as any]: "-0.05" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Contacto</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes un proyecto de ciencia de datos o desarrollo? Me encantaría colaborar contigo y aplicar machine
            learning para resolver desafíos reales.
          </p>
          <SocialLinks className="flex flex-wrap justify-center gap-5 mt-8" size="md" />
        </div>

        <div className="grid grid-cols-1 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 text-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>
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
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
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
      </div>
    </section>
  )
}
