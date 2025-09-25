"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { GraduationCap, Calendar, Download, Eye } from "lucide-react"

export function EducationSection() {
  const titulo = [
    {
      title: "Título de Sociólogo",
      institution: "Universidad Central de Chile",
      period: "2015",
      status: "completed",
      description: "Licenciatura en Sociología con enfoque en investigación social y análisis cuantitativo.",
      certificate: "/documents/titulo-sociologo.pdf",
    },
  ];

  const diplomados = [
    {
      title: "Diplomado en Inteligencia Artificial",
      institution: "Universidad Autónoma",
      period: "2025",
      status: "completed",
      description: "Especialización avanzada en técnicas de IA y machine learning aplicado.",
      certificate: "/documents/20250923151700_abd3a728-083d-4b46-9839-a19400f319ba.pdf",
    },
    {
      title: "Diplomado en Data Science",
      institution: "Universidad Católica de Chile",
      period: "2022",
      status: "completed",
      description: "Fundamentos de ciencia de datos, estadística y análisis predictivo.",
      certificate: "/documents/diplomado-data-science.pdf",
    },
  ];

  const cursos = [
    {
      title: "Bootcamp Ciencia de Datos",
      institution: "Corfo Talento Digital",
      period: "2024",
      status: "completed",
      description: "Programa intensivo en análisis de datos, machine learning y visualización.",
      certificate: "/documents/bootcamp-data-science.pdf",
    },
    {
      title: "Bootcamp Full Stack Python",
      institution: "Corfo Talento Digital",
      period: "2023",
      status: "completed",
      description: "Desarrollo web completo con Python, Django, React y bases de datos.",
      certificate: "/documents/bootcamp-full-stack-python.pdf",
    },
    {
      title: "Green Digital Skills",
      institution: "INCO Academy (LinkedIn)",
      period: "2024",
      status: "completed",
      description: "Curso online de habilidades digitales verdes. 24 horas de estudio.",
      certificate: "/documents/green-digital-skills.pdf",
    },
    {
      title: "Curso Introductorio Data Science",
      institution: "Escuela Digital",
      period: "2024",
      status: "completed",
      description: "Fundamentos de ciencia de datos y análisis estadístico.",
      certificate: "/documents/intro-data-science.pdf",
    },
    {
      title: "Procesamiento de Lenguaje Natural en R",
      institution: "Instituto Nacional de Estadísticas (INE)",
      period: "2023",
      status: "completed",
      description: "Técnicas avanzadas de NLP aplicadas en R para análisis de texto.",
      certificate: null,
    },
    {
      title: "R y Herramientas de Reproducibilidad",
      institution: "Instituto Nacional de Estadísticas (INE)",
      period: "2023",
      status: "completed",
      description: "Mejores prácticas para investigación reproducible con R.",
      certificate: null,
    },
    {
      title: "Introducción a Shiny",
      institution: "Instituto Nacional de Estadísticas (INE)",
      period: "2023",
      status: "completed",
      description: "Desarrollo de aplicaciones web interactivas con Shiny en R.",
      certificate: null,
    },
    {
      title: "Introducción a la Minería de Datos",
      institution: "Pontificia Universidad Católica de Chile (Coursera)",
      period: "2022",
      status: "completed",
      description: "Fundamentos de minería de datos y técnicas de análisis predictivo.",
      certificate: "/documents/mineria-de-datos-coursera.pdf",
    },
    {
      title: "Curso Herramientas para la Gestión de Proyectos",
      institution: "Universidad Católica de Chile",
      period: "2022",
      status: "completed",
      description: "Metodologías ágiles y lean para gestión de proyectos. Nota: 6,2",
      certificate: "/documents/gestion-proyectos-agil.pdf",
    },
    {
      title: "Curso Aplicación de Técnicas para la Gestión de Capacitación",
      institution: "Universidad Católica de Chile",
      period: "2021",
      status: "completed",
      description: "Técnicas avanzadas para gestión del proceso de capacitación. Nota: 5,7",
      certificate: "/documents/gestion-capacitacion.pdf",
    },
  ];

  const handleDownloadCertificate = (certificatePath: string, title: string) => {
    const link = document.createElement("a")
    link.href = certificatePath
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}-certificado.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const EducationCategory = ({ title, items }: { title: string; items: any[] }) => (
    <div className="mb-8 last:mb-0">
      <h3 className="text-2xl font-semibold mb-6 pb-2 border-b border-primary/20 text-primary/90">{title}</h3>
      <ul className="space-y-6">
        {items.map((edu, index) => (
          <li key={index} className="pb-6 border-b border-muted/50 last:border-b-0">
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex-grow">
                <h4 className="text-lg font-semibold text-primary">{edu.title}</h4>
                <p className="text-sm text-muted-foreground font-medium">{edu.institution}</p>
                <p className="text-sm text-muted-foreground mt-2 mb-3">{edu.description}</p>
              </div>
              <div className="flex flex-col items-start sm:items-end sm:text-right flex-shrink-0 sm:ml-4 mt-3 sm:mt-0">
                <div className="flex items-center gap-2 mb-3">
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
                {edu.certificate && (
                  <div className="flex gap-2 mt-auto">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          Ver
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[90vh]">
                        <DialogHeader>
                          <DialogTitle>{edu.title}</DialogTitle>
                        </DialogHeader>
                        <div className="h-full">
                          <iframe src={edu.certificate} width="100%" height="100%" />
                        </div>
                      </DialogContent>
                    </Dialog>
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
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

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

        <div className="max-w-4xl mx-auto bg-background rounded-lg p-8 shadow-sm">
          <EducationCategory title="Título Profesional" items={titulo} />
          <EducationCategory title="Diplomados" items={diplomados} />
          <EducationCategory title="Cursos y Bootcamps" items={cursos} />
        </div>
      </div>
    </section>
  )
}