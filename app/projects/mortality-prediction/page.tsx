'use client';

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, ArrowLeft, BarChart, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const PythonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 80 80">
    <path d="M40.1 0C23.6 0 10.3 13.4 10.3 29.9v5.3h19.8V29.9c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8v19.8H29.9c-5.4 0-9.8 4.4-9.8 9.8s4.4 9.8 9.8 9.8h5.3c16.5 0 29.9-13.4 29.9-29.9V29.9C65.1 13.4 51.8 0 40.1 0zM25.2 15.1c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9z" fill="#306998"/>
    <path d="M39.9 80c16.5 0 29.9-13.4 29.9-29.9v-5.3H50v5.3c0 5.4-4.4 9.8-9.8 9.8s-9.8-4.4-9.8-9.8V39.9h19.8c5.4 0 9.8-4.4 9.8-9.8s-4.4-9.8-9.8-9.8h-5.3C23.6 20.3 10.3 33.7 10.3 50.2v9.8C10.3 71.6 23.6 80 39.9 80zM54.8 65.1c2.7 0 4.9-2.2 4.9-4.9s-2.2-4.9-4.9-4.9-4.9 2.2-4.9 4.9 2.2 4.9 4.9 4.9z" fill="#FFD43B"/>
  </svg>
);

export default function MortalityPredictionProject() {
  const [activeDashboard, setActiveDashboard] = useState<'shiny' | 'looker' | 'powerbi' | null>(null);

  const technologies = [
    "Python",
    "Scikit-learn",
    "Pandas",
    "Matplotlib",
    "Seaborn",
    "Shiny",
    "Looker Studio",
    "Power BI",
  ]

  const features = [
    "Análisis exploratorio de datos demográficos chilenos",
    "Modelos predictivos de mortalidad por región y edad",
    "Visualizaciones interactivas de tendencias temporales",
    "Análisis de factores socioeconómicos influyentes",
    "Dashboard interactivo para explorar los datos y predicciones",
  ]

  const handleDashboardToggle = (dashboard: 'shiny' | 'looker' | 'powerbi') => {
    if (activeDashboard === dashboard) {
      setActiveDashboard(null); // Oculta si se vuelve a hacer clic en el mismo botón
    } else {
      setActiveDashboard(dashboard);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/#projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Proyectos
          </Button>
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Predicción de Mortalidad en Chile</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Análisis y predicción de patrones de mortalidad utilizando Machine Learning y técnicas avanzadas de
              ciencia de datos aplicadas a datos demográficos chilenos.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 border-t pt-6">
                <Button onClick={() => handleDashboardToggle('shiny')} variant={activeDashboard === 'shiny' ? 'default' : 'outline'}>
                  <PythonIcon />
                  Python (Shiny)
                </Button>
                <Button onClick={() => handleDashboardToggle('looker')} variant={activeDashboard === 'looker' ? 'default' : 'outline'}>
                  <BarChart className="h-4 w-4 mr-2" />
                  Looker Studio
                </Button>
                <Button onClick={() => handleDashboardToggle('powerbi')} variant={activeDashboard === 'powerbi' ? 'default' : 'outline'}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Power BI
                </Button>
                 <Button variant="outline" asChild>
                  <a href="https://github.com/Mauro-Carcamo" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Ver Código
                  </a>
                </Button>
            </div>
          </div>

          {activeDashboard && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>
                  {activeDashboard === 'shiny' && "Dashboard Interactivo (Shiny)"}
                  {activeDashboard === 'looker' && "Dashboard Interactivo (Looker Studio)"}
                  {activeDashboard === 'powerbi' && "Dashboard Interactivo (Power BI)"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeDashboard === 'shiny' && (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      El siguiente dashboard es una aplicación Shiny ejecutándose localmente. Asegúrate de haber iniciado la aplicación para poder visualizarla.
                    </p>
                    <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden border">
                      <iframe
                        src="http://127.0.0.1:8001"
                        className="w-full h-full border-0"
                        title="Dashboard de Mortalidad en Chile"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </>
                )}
                {activeDashboard === 'looker' && (
                  <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Aquí se mostraría el dashboard de Looker Studio.</p>
                  </div>
                )}
                {activeDashboard === 'powerbi' && (
                  <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Aquí se mostraría el dashboard de Power BI.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Características del Análisis</CardTitle>
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
                <CardTitle>Tecnologías y Herramientas</CardTitle>
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
        </div>
      </div>
    </div>
  )
}