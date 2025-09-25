"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Calendar, Download, Eye } from "lucide-react"

export function EducationSection() {
  const education = [
    {
      title: "Título de Sociólogo",
      institution: "Universidad Central de Chile",
      period: "2015",
      status: "completed",
      description: "Licenciatura en Sociología con enfoque en investigación social y análisis cuantitativo.",
      certificate: "/certificates/titulo-sociologo-2015.pdf",
    },
    {
      title: "Diplomado en Inteligencia Artificial",
      institution: "Universidad Autónoma",
      period: "2025 - En curso",
      status: "current",
      description: "Especialización avanzada en técnicas de IA y machine learning aplicado.",
      certificate: null,
    },
    {
      title: "Green Digital Skills",
      institution: "INCO Academy (LinkedIn)",
      period: "2024",
      status: "completed",
      description: "Curso online de habilidades digitales verdes. 24 horas de estudio.",
      certificate: "/certificates/green-digital-skills-2024.pdf",
    },
    {
      title: "Curso Introductorio Data Science",
      institution: "Escuela Digital",
      period: "2024",
      status: "completed",
      description: "Fundamentos de ciencia de datos y análisis estadístico.",
      certificate: "/certificates/data-science-escuela-digital-2024.pdf",
    },
    {
      title: "Bootcamp Ciencia de Datos",
      institution: "Corfo Talento Digital",
      period: "2024",
      status: "completed",
      description: "Programa intensivo en análisis de datos, machine learning y visualización.",
      certificate: null,
    },
    {
      title: "Procesamiento de Lenguaje Natural en R",
      institution: "Instituto Nacional de Estadísticas (INE)",
      period: "2023",
      status: "completed",
      description: "Técnicas avanzadas de NLP aplicadas en R para análisis de texto.",
      certificate: "/certificates/nlp-r-ine-2023.pdf",
    },
    {
      title: "R y Herramientas de Reproducibilidad",
      institution: "Instituto Nacional de Estadísticas (INE)",
      period: "2023",
      status: "completed",
      description: "Mejores prácticas para investigación reproducible con R.",
      certificate: "/certificates/reproducibilidad-r-ine-2023.pdf",
    },
    {
      title: "Introducción a Shiny",
      institution: "Instituto Nacional de Estadísticas (INE)",
      period: "2023",
      status: "completed",
      description: "Desarrollo de aplicaciones web interactivas con Shiny en R.",
      certificate: "/certificates/introduccion-shiny-ine-2023.pdf",
    },
    {
      title: "Bootcamp Full Stack Python",
      institution: "Corfo Talento Digital",
      period: "2023",
      status: "completed",
      description: "Desarrollo web completo con Python, Django, React y bases de datos.",
      certificate: null,
    },
    {
      title: "Introducción a la Minería de Datos",
      institution: "Pontificia Universidad Católica de Chile (Coursera)",
      period: "2022",
      status: "completed",
      description: "Fundamentos de minería de datos y técnicas de análisis predictivo.",
      certificate: "/certificates/mineria-datos-coursera-uc.pdf",
    },
    {
      title: "Diplomado en Data Science",
      institution: "Universidad Católica de Chile",
      period: "2022",
      status: "completed",
      description: "Fundamentos de ciencia de datos, estadística y análisis predictivo.",
      certificate: "/certificates/data-science-uc-2022.pdf",
    },
    {
      title: "Curso Herramientas para la Gestión de Proyectos",
      institution: "Universidad Católica de Chile",
      period: "2022",
      status: "completed",
      description: "Metodologías ágiles y lean para gestión de proyectos. Nota: 6,2",
      certificate: "/certificates/gestion-proyectos-uc-2022.pdf",
    },
    {
      title: "Curso Aplicación de Técnicas para la Gestión de Capacitación",
      institution: "Universidad Católica de Chile",
      period: "2021",
      status: "completed",
      description: "Técnicas avanzadas para gestión del proceso de capacitación. Nota: 5,7",
      certificate: "/certificates/capacitacion-uc-2021.pdf",
    },
  ]

  const handleViewCertificate = (certificatePath: string) => {
    window.open(certificatePath, "_blank")
  }

  const handleDownloadCertificate = (certificatePath: string, title: string) => {
    const link = document.createElement("a")
    link.href = certificatePath
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}-certificado.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <GraduationCap className="w-4 h-4" />
            Formación Académica
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Educación y <span className="text-primary">Certificaciones</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mi trayectoria académica combina ciencias sociales con tecnología, especializándome en ciencia de datos e
            inteligencia artificial.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{edu.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={edu.status === "current" ? "default" : "secondary"} className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {edu.period}
                    </Badge>
                    {edu.status === "current" && (
                      <Badge variant="outline" className="text-xs border-primary text-primary">
                        En Curso
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-primary font-medium">{edu.institution}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{edu.description}</p>
                {edu.certificate && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewCertificate(edu.certificate!)}
                      className="text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Ver Certificado
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadCertificate(edu.certificate!, edu.title)}
                      className="text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Descargar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
