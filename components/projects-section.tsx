import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageCarousel } from "@/components/image-carousel"
import Link from "next/link"

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

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Mis Proyectos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una selección de proyectos que combinan ciencia de datos, machine learning y desarrollo de software para
            resolver problemas reales
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link key={index} href={project.liveUrl} className="block">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-[1.02]">
                <div className="relative overflow-hidden">
                  {project.images ? (
                    <div className="h-48">
                      <ImageCarousel
                        images={project.images}
                        alt={project.title}
                        autoPlay={true}
                        autoPlayInterval={2500}
                      />
                    </div>
                  ) : (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  {project.featured && <Badge className="absolute top-4 left-4 bg-primary z-10">Destacado</Badge>}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            href="https://github.com/Mauro-Carcamo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver todos los proyectos en GitHub
          </Button>
        </div>
      </div>
    </section>
  )
}
