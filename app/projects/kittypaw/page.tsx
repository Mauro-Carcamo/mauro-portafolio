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
    "React Native",
    "Node.js",
    "MongoDB",
    "Machine Learning",
    "IoT",
    "ESP32",
    "3D Printing",
    "Mobile Development",
  ]

  const features = [
    "Sistema de matching inteligente entre adoptantes y mascotas",
    "Dispensador automático de comida con sensores IoT",
    "Monitoreo en tiempo real de temperatura, humedad y peso",
    "Aplicación móvil con dashboard de datos",
    "Diseño 3D personalizado e impresión 3D",
    "Integración con microcontroladores ESP32",
    "Base de datos para gestión de refugios y adopciones",
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
                Aplicación móvil integral para adopción de mascotas con sistema de matching inteligente y dispensador
                automático de comida con tecnología IoT.
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
                <p className="text-sm text-muted-foreground">
                  KittyPaw es un proyecto integral que combina desarrollo móvil, IoT y machine learning para
                  revolucionar el proceso de adopción de mascotas. El sistema incluye tanto una aplicación móvil como un
                  dispensador físico inteligente.
                </p>
                <p className="text-sm text-muted-foreground">
                  El dispensador automático, diseñado e impreso en 3D, utiliza sensores para monitorear el consumo de
                  alimento, temperatura y humedad del ambiente, enviando datos en tiempo real a la aplicación móvil a
                  través de conectividad WiFi.
                </p>
                <p className="text-sm text-muted-foreground">
                  La aplicación móvil implementa algoritmos de machine learning para crear matches inteligentes entre
                  adoptantes potenciales y mascotas disponibles, considerando factores como estilo de vida, experiencia
                  previa y preferencias específicas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Carrusel de imágenes */}
          <div className="lg:sticky lg:top-8">
            <ImageCarousel images={kittypawImages} alt="Proyecto Kittypaw" autoPlay={true} autoPlayInterval={4000} />
          </div>
        </div>
      </div>
    </div>
  )
}
