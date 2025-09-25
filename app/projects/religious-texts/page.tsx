import { ImageCarousel } from "@/components/image-carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ReligiousTextsProject() {
  const projectImages = ["/nlp-religious-text-analysis.png"]

  const technologies = [
    "Python",
    "NLTK",
    "spaCy",
    "TensorFlow",
    "Transformers",
    "Scikit-learn",
    "Matplotlib",
    "WordCloud",
    "NLP",
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
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">Textos Religiosos y Machine Learning</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Análisis de textos religiosos utilizando técnicas de NLP y procesamiento de lenguaje natural para
                extraer insights y patrones semánticos.
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
                <CardTitle>Tecnologías de NLP</CardTitle>
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
          </div>

          <div className="lg:sticky lg:top-8">
            <ImageCarousel images={projectImages} alt="Análisis de Textos Religiosos" />
          </div>
        </div>
      </div>
    </div>
  )
}
