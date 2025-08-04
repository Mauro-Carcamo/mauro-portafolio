import { useState } from "react";
import { BarChart3, GraduationCap, Bot, Phone, Worm, MessageSquare, Eye, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const projects = [
  {
    id: 1,
    title: "KittyPaw",
    description: "Aplicación web interactiva para adopción de mascotas con sistema de matching inteligente, perfiles detallados y chat en tiempo real entre adoptantes y refugios.",
    icon: Heart,
    categories: ["react", "typescript"],
    tags: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
    slug: "kittypaw",
    libraries: ["React", "TypeScript", "Node.js", "Express", "Socket.io", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Wouter"]
  },
  {
    id: 2,
    title: "Dashboard Ventas Nadar Ediciones",
    description: "Análisis integral de ventas y costos con vinculación de datos de redes sociales. Dashboard interactivo en Google Looker Studio para optimización de estrategias comerciales.",
    icon: BarChart3,
    categories: ["python", "dashboard"],
    tags: ["Python", "Google Looker", "API Social Media"],
    slug: "dashboard-nadar",
    libraries: ["Python", "Pandas", "Google Analytics API", "Looker Studio", "Social Media APIs", "Matplotlib", "Seaborn"]
  },
  {
    id: 3,
    title: "Análisis Desempeño Académico",
    description: "Investigación sobre factores que inciden en el desempeño académico usando machine learning no supervisado para clustering y análisis predictivo.",
    icon: GraduationCap,
    categories: ["r", "sql"],
    tags: ["R", "Machine Learning", "Clustering", "SQL"],
    slug: "analisis-academico",
    libraries: ["R", "dplyr", "ggplot2", "cluster", "factoextra", "corrplot", "caret", "randomForest", "PostgreSQL"]
  },
  {
    id: 4,
    title: "Automatización WhatsApp",
    description: "Sistema de automatización de comunicaciones para proyectos de capacitación. Envío programado de contenido y seguimiento de participación.",
    icon: Bot,
    categories: ["python"],
    tags: ["Python", "WhatsApp API", "Automatización"],
    slug: "whatsapp-automation",
    libraries: ["Python", "WhatsApp API", "Schedule", "SQLite", "Pandas", "Requests", "JSON", "Datetime"]
  },
  {
    id: 5,
    title: "Dashboard Contact Center",
    description: "Dashboard de métricas clave para monitoreo de ventas, dotación y rendimiento de campañas. Implementación de estrategias basadas en datos para incremento de ventas.",
    icon: Phone,
    categories: ["python", "dashboard"],
    tags: ["Google Data Studio", "KPIs", "Análisis Ventas"],
    slug: "dashboard-contact-center",
    libraries: ["Google Data Studio", "Python", "Pandas", "BigQuery", "Google Sheets API", "Plotly", "Streamlit"]
  },
  {
    id: 6,
    title: "Web Scraping Automatizado",
    description: "Automatización de descarga de documentos para procesos de acreditación universitaria. Sistema eficiente de extracción y organización de datos web.",
    icon: Worm,
    categories: ["python", "sql"],
    tags: ["Python", "Web Scraping", "Selenium", "BeautifulSoup"],
    slug: "web-scraping",
    libraries: ["Python", "Selenium", "BeautifulSoup", "Requests", "Pandas", "SQLite", "ChromeDriver", "lxml"]
  },
  {
    id: 7,
    title: "Análisis de Texto NLP",
    description: "Procesamiento de lenguaje natural para análisis de sentimientos y extracción de insights de datos textuales en proyectos de investigación social.",
    icon: MessageSquare,
    categories: ["r"],
    tags: ["R", "NLP", "Text Mining", "Sentiment Analysis"],
    slug: "nlp-analysis",
    libraries: ["R", "tm", "wordcloud", "RColorBrewer", "SnowballC", "syuzhet", "tidytext", "dplyr", "ggplot2"]
  }
];

const filters = [
  { id: "all", label: "Todos" },
  { id: "python", label: "Python" },
  { id: "r", label: "R" },
  { id: "sql", label: "SQL" },
  { id: "dashboard", label: "Dashboard" }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projects.filter(project => 
    activeFilter === "all" || project.categories.includes(activeFilter)
  );

  return (
    <section id="proyectos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--accent-color)] mb-4 relative">
            Proyectos
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[var(--primary-color)] rounded"></div>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full px-6 py-2 font-medium transition-all ${
                activeFilter === filter.id
                  ? "bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90"
                  : "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Card
                key={project.id}
                className="project-card h-full transition-all duration-300 hover:shadow-xl border-0 bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 bg-[var(--primary-color)]/10 rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-[var(--primary-color)]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-[var(--accent-color)]">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-[var(--accent-color)]/80 leading-relaxed">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full btn-outline-custom mt-4"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver Código
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
