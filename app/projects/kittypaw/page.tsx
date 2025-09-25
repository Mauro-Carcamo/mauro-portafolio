import { ImageCarousel } from "@/components/image-carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function KittypawProject() {
  const kittypawImages = [
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/#projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Proyectos
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Información del proyecto */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">Kittypaw!</h1>
              <p className="text-xl text-muted-foreground mb-6">
                KittyPaw es una plataforma tecnológica para la gestión de mascotas, que combina hardware (sensores y dispensadores inteligentes), software (app/web) e inteligencia artificial (IA). El objetivo es ayudar a los dueños de mascotas a monitorear, automatizar y mejorar la alimentación y el bienestar de sus animales.
              </p>

              <div className="flex gap-4 mb-8">
                <Button asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Demo
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com/Mauro-Carcamo" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Ver Código
                  </a>
                </Button>
              </div>
            </div>

            <Card>
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

            <Card>
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

            <Card>
              <CardHeader>
                <CardTitle>Descripción del Proyecto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  KittyPaw es una plataforma tecnológica integral para la gestión de mascotas, que combina hardware (sensores y dispensadores inteligentes), software (app/web) e inteligencia artificial (IA). Su objetivo es monitorear, automatizar y mejorar la alimentación y el bienestar de los animales.

                  Componentes Principales:
                  - Hardware (IoT): Dispositivos inteligentes con sensores (temperatura, humedad, luz, peso) conectados vía MQTT con AWS IoT Core, recolectando datos en tiempo real.
                  - Backend: Desarrollado con Django, incluye una API REST para recibir datos de los dispositivos, gestionar usuarios, mascotas y dispositivos, e integración con servicios AWS (Timestream, DynamoDB, S3, Elastic Beanstalk).
                  - Frontend / Dashboard: Aplicación web y móvil (híbrida con Capacitor/Ionic) con un diseño pedagógico y UX amigable. Ofrece visualización de datos (gráficos de alimentación, patrones de sueño), gestión de mascotas y dispositivos, y configuración.

                  Inteligencia Artificial:
                  - Modelos de predicción para detectar cambios en hábitos de alimentación, posibles enfermedades o alteraciones de comportamiento. Futuras integraciones con modelos de visión.

                  Modelo de Negocio:
                  - MVP / Startup tipo SaaS, con venta de hardware (dispensadores inteligentes) y suscripción mensual a la plataforma. Planes diferenciados (Básico: monitoreo; Premium: IA con alertas predictivas y reportes de salud).

                  Casos de Uso:
                  - Monitoreo de patrones de alimentación, alertando al usuario ante cambios significativos. Visualización de métricas clave en el dashboard.

                  Viabilidad Técnica:
                  - Arquitectura recomendada en AWS Cloud (IoT Core, Timestream, DynamoDB, S3, Elastic Beanstalk), con costos bajos al inicio y escalabilidad automática. Integración con Grafana para visualización avanzada.

                  Estado Actual:
                  - Desarrollo en Django con API y dashboard en marcha. Conexión IoT probada con ESP32/ESP8266. Prototipo de envío de datos JSON vía MQTT a AWS. CSVs con data de prueba. Diseño del dashboard inicial en proceso.

                  En resumen: KittyPaw busca ser el ecosistema inteligente para mascotas, integrando sensores + datos + IA en una app sencilla, con un modelo de negocio escalable y foco en la salud preventiva animal.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Carrusel de imágenes */}
          <div className="lg:sticky lg:top-8 space-y-8">
            <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Rlm2o0Q148w?si=wOqBbATNwW1IPps2"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
            <ImageCarousel images={kittypawImages} alt="Proyecto Kittypaw" autoPlay={true} autoPlayInterval={4000} />
          </div>
        </div>
      </div>
    </div>
  )
}
