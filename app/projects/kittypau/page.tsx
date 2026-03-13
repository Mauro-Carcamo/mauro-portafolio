"use client"

import { ImageCarousel } from "@/components/image-carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionParallax } from "@/components/section-parallax"
import { ArrowLeft, Github, Instagram, Linkedin, LogIn, Youtube } from "lucide-react"
import Link from "next/link"
import { Parallax } from "react-scroll-parallax"

	export default function KittypauProject() {
	  const kittypauImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-TfWbRHXGAdMVjCdnJ3UuoMPSKWYUuG.jpeg", // Logo
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.jpg-Gi4mtVmyUmtW3r3FtcPgcBlzWKT8bi.jpeg", // Diseño 3D
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.jpg-87kT48HZss47HeWL5EUHuICRBBPaqo.jpeg", // Piezas impresas
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.jpg-CrV0UJpsAdqrPGt2riwt8fLhIxQR8P.jpeg", // Electrónica
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.jpg-BORpRmjMANvpJciyhp6EyOy9OrnFOS.jpeg", // Componentes
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6.jpg-g6YwZo4FjMZknM27rSSwn5kSDBfP5z.jpeg", // Dispensador completo
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.jpg-iNflzeY4Y4inaUpdkXgBBdHzC0n3sV.jpeg", // Gato usando
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8.jpg-84YNS0kqfDx3zpXyGgRR1d15PtD68K.jpeg", // App funcionando
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-fE5i8lUMh9ovgnIlRrV3IGrIenHRSO.jpeg", // Instalación app
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-Nv3MtKKr9wNacPCT1wYkV4fbstK1Eh.jpeg", // Gráfico temperatura
  ]

  const technologies = [
    "Django",
    "API REST",
    "AWS IoT Core",
    "AWS Timestream",
    "AWS DynamoDB",
    "AWS S3",
    "AWS Elastic Beanstalk",
    "Capacitor",
    "Ionic",
    "React Native",
    "Node.js",
    "MongoDB",
    "Machine Learning",
    "IoT",
    "ESP32",
    "ESP8266",
    "MQTT",
    "3D Printing",
    "Grafana",
  ]

  const features = [
    "Plataforma integral de gestión de mascotas (hardware, software, IA)",
    "Dispensadores inteligentes con sensores IoT (temperatura, humedad, luz, peso)",
    "Monitoreo y automatización de alimentación y bienestar animal",
    "Comunicación de dispositivos vía MQTT con AWS IoT Core",
    "Backend robusto con Django y API REST para gestión de datos",
    "Integración con servicios AWS (Timestream, DynamoDB, S3, Elastic Beanstalk)",
    "Aplicación web y móvil (híbrida con Capacitor/Ionic) con dashboard intuitivo",
    "Visualización de datos clave y gráficos de comportamiento (alimentación, sueño)",
    "Modelos de IA para predicción de cambios de hábitos y posibles enfermedades",
    "Sistema de alertas predictivas personalizadas",
    "Modelo de negocio SaaS con venta de hardware y suscripción (planes Básico/Premium)",
    "Diseño 3D personalizado e impresión 3D de hardware",
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
          {/* Información del proyecto */}
          <div className="space-y-8">
            <ScrollReveal>
              <div>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 className="text-4xl font-semibold tracking-tight mb-3">Kittypau</h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      Kittypau es una plataforma PetTech AIoT que conecta una app (web y APK) con dispositivos IoT para monitorear el bienestar de mascotas.
                      Integra telemetría y eventos en tiempo real, paneles de visualización e historial, y un flujo de autenticación/registro de usuarios y mascotas.
                    </p>
                  </div>

                  <Badge className="bg-primary/10 text-primary border border-primary/20">PetTech • AIoT</Badge>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="rounded-full" asChild>
                    <a href="https://kittypau-app.vercel.app/login" target="_blank" rel="noopener noreferrer">
                      <LogIn className="h-4 w-4 mr-2" />
                      Ir a app
                    </a>
                  </Button>
                  <Button variant="outline" className="rounded-full" asChild>
                    <a href="https://github.com/Mauro-Carcamo" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Ver Código
                    </a>
                  </Button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <a
                      href="https://www.linkedin.com/in/kittypau-mascotas/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <a
                      href="https://www.instagram.com/kittypau.mascotas/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <a
                      href="https://www.youtube.com/channel/UCYrN8v3Lb5n1B0L2QeOEcxA"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="h-4 w-4 mr-2" />
                      YouTube
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={80} variant="left">
              <Card className="rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Características Principales</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delayMs={120} variant="right">
              <Card className="rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Tecnologías Utilizadas</CardTitle>
                </CardHeader>
                <CardContent>
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

            <ScrollReveal delayMs={160} variant="left">
              <Card className="rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Descripción del Proyecto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Kittypau conecta una app (web y APK) con dispositivos IoT para monitorear comida/agua/actividad y estados de dispositivos.
                    Incluye telemetría y eventos en tiempo real, paneles de visualización e historial, bridge y conectividad MQTT, manejo de estados operativos (online/offline/degradado) y pantallas de error para fallas críticas.
                  </p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Componentes principales</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        <span className="font-medium text-foreground">IoT:</span> sensores + dispensadores con comunicación MQTT.
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Backend:</span> Django + API REST + AWS (Timestream, DynamoDB, S3, Elastic Beanstalk).
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Frontend:</span> app web/móvil con dashboards y flujo de usuarios/mascotas.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Carrusel de imágenes */}
          <div className="lg:sticky lg:top-8 space-y-8">
            <ScrollReveal variant="right">
              <Parallax translateY={[-8, 8]}>
                <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden shadow-lg border border-border/60 bg-muted/20">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/0LV1gTPgNlI"
                    title="Kittypau - Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </Parallax>
            </ScrollReveal>

            <ScrollReveal delayMs={80} variant="right">
              <Parallax translateY={[-6, 6]}>
                <ImageCarousel images={kittypauImages} alt="Proyecto Kittypau" autoPlay={true} autoPlayInterval={4000} />
              </Parallax>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
