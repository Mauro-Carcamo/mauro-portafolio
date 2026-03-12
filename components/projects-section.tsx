"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageCarousel } from "@/components/image-carousel"
import { TechnologyIcon } from "@/components/technology-icon"
import Link from "next/link"
import { ArrowUpRight, ChevronLeft, ChevronRight, Github } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

export function ProjectsSection() {
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

  const projects = [
    {
      title: "Kittypaw!",
      description:
        "Plataforma tecnológica integral para la gestión de mascotas, combinando hardware (IoT), software (app/web) e inteligencia artificial (IA) para monitorear y mejorar su bienestar.",
      image: "/pet-adoption-app.png",
      images: kittypawImages, // Added images array for KittyPaw project
      technologies: ["React Native", "Node.js", "MongoDB", "Machine Learning"],
      liveUrl: "/projects/kittypaw",
      githubUrl: "https://github.com/Mauro-Carcamo",
      featured: true,
    },
    {
      title: "Predicción de Mortalidad en Chile",
      description:
        "Análisis y predicción de patrones de mortalidad utilizando Machine Learning y técnicas avanzadas de ciencia de datos.",
      image: "/mortality-prediction-visualizations.png",
      technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      liveUrl: "/projects/mortality-prediction",
      githubUrl: "https://github.com/Mauro-Carcamo",
      featured: true,
    },
    {
      title: "Textos Religiosos y Machine Learning",
      description:
        "Análisis de textos religiosos utilizando técnicas de NLP y procesamiento de lenguaje natural para extraer insights.",
      image: "/nlp-religious-text-analysis.png",
      technologies: ["Python", "NLTK", "spaCy", "TensorFlow"],
      liveUrl: "/projects/religious-texts",
      githubUrl: "https://github.com/Mauro-Carcamo",
      featured: false,
    },
    {
      title: "Web Scraping Letras de Canciones",
      description:
        "Extracción y análisis de letras musicales (1960-2020) para identificar tendencias y patrones en la música popular.",
      image: "/music-lyrics-analysis.png",
      technologies: ["Python", "BeautifulSoup", "Selenium", "Data Analysis"],
      liveUrl: "/projects/music-lyrics",
      githubUrl: "https://github.com/Mauro-Carcamo",
      featured: false,
    },
  ]

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    duration: 40,
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocusWithin, setIsFocusWithin] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

    if (reduceMotion) return
    if (isHovered || isFocusWithin) return

    const firstId = window.setTimeout(() => {
      emblaApi.scrollNext()
    }, 1400)

    const id = window.setInterval(() => {
      emblaApi.scrollNext()
    }, 3800)

    return () => {
      window.clearTimeout(firstId)
      window.clearInterval(id)
    }
  }, [emblaApi, isHovered, isFocusWithin])

  return (
    <section id="projects" className="parallax-section py-14 sm:py-20" style={{ ["--parallax-speed" as any]: "-0.05" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Mis Proyectos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una selección de proyectos que combinan ciencia de datos, machine learning y desarrollo de software para
            resolver problemas reales
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocusWithin(true)}
          onBlurCapture={() => setIsFocusWithin(false)}
        >
          <div className="absolute -top-14 right-0 hidden sm:flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={scrollPrev} disabled={!canScrollPrev} aria-label="Anterior">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} disabled={!canScrollNext} aria-label="Siguiente">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
            <div className="flex touch-pan-y gap-3 sm:gap-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex-[0_0_86%] sm:flex-[0_0_54%] md:flex-[0_0_40%] lg:flex-[0_0_30%] xl:flex-[0_0_24%]"
                >
                  <Card
                    className={[
                      "group overflow-hidden p-0 py-0 gap-0 h-full",
                      "shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5",
                      project.featured ? "ring-1 ring-primary/20" : "",
                    ].join(" ")}
                  >
                    <div className="relative overflow-hidden bg-muted aspect-video">
                      {project.images ? (
                        <ImageCarousel
                          images={project.images}
                          alt={project.title}
                          autoPlay={true}
                          autoPlayInterval={2500}
                        />
                      ) : (
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {project.featured && (
                        <Badge className="absolute top-3 left-3 bg-primary z-10 shadow-sm">Destacado</Badge>
                      )}
                    </div>

                    <CardHeader className="px-4 sm:px-5 py-3">
                      <CardTitle className="text-base sm:text-lg leading-tight">{project.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="px-4 sm:px-5 pb-4 pt-0 flex-1 space-y-3">
                      <p className="text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 items-center">
                        {project.technologies.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="flex items-center gap-1.5 bg-secondary/70 text-secondary-foreground rounded-full px-2.5 py-1 text-[11px] font-semibold min-w-0 max-w-full"
                          >
                            <TechnologyIcon techName={tech} size={16} />
                            <span className="min-w-0 truncate" title={tech}>
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 gap-2.5 justify-between flex-wrap">
                      <Button variant="default" size="sm" className="flex-1 sm:flex-none" asChild>
                        <Link href={project.liveUrl}>
                          Ver proyecto <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>

                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          Código
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center sm:hidden items-center gap-2">
            <Button variant="outline" size="icon" onClick={scrollPrev} disabled={!canScrollPrev} aria-label="Anterior">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} disabled={!canScrollNext} aria-label="Siguiente">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="https://github.com/Mauro-Carcamo" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              Ver todos los proyectos en GitHub
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
