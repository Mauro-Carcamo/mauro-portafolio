import { useState } from "react";
import { BarChart3, GraduationCap, Bot, Phone, Worm, MessageSquare, Eye, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    id: 1,
    title: "KittyPaw",
    description: "Aplicación web interactiva para adopción de mascotas con sistema de matching inteligente, perfiles detallados y chat en tiempo real entre adoptantes y refugios.",
    icon: Heart,
    categories: ["react", "typescript"],
    tags: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
    slug: "kittypaw",
    libraries: ["React", "TypeScript", "Node.js", "Express", "Socket.io", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Wouter"],
    details: {
      overview: "KittyPaw es una plataforma web moderna diseñada para facilitar la adopción responsable de mascotas. Conecta refugios, rescatistas y personas interesadas en adoptar a través de una interfaz intuitiva y funcionalidades avanzadas de matching.",
      features: [
        "Sistema de perfiles detallados para mascotas con fotos, historial médico y características",
        "Algoritmo de matching inteligente basado en compatibilidad de estilo de vida",
        "Chat en tiempo real entre adoptantes y refugios",
        "Panel de administración para refugios con gestión de inventario",
        "Sistema de seguimiento post-adopción",
        "Integración con APIs de geolocalización para búsquedas por proximidad"
      ],
      challenges: [
        "Implementación de WebSockets para chat en tiempo real con escalabilidad",
        "Diseño de algoritmo de matching considerando múltiples variables",
        "Optimización de carga de imágenes y rendimiento en dispositivos móviles",
        "Gestión de estados complejos entre múltiples usuarios simultáneos"
      ],
      results: [
        "Interfaz responsive que funciona perfectamente en todos los dispositivos",
        "Tiempo de carga optimizado con lazy loading de imágenes",
        "Sistema de matching con 85% de precisión en compatibilidad",
        "Implementación exitosa de chat en tiempo real sin latencia"
      ]
    }
  },
  {
    id: 2,
    title: "Dashboard Ventas Nadar Ediciones",
    description: "Análisis integral de ventas y costos con vinculación de datos de redes sociales. Dashboard interactivo en Google Looker Studio para optimización de estrategias comerciales.",
    icon: BarChart3,
    categories: ["python", "dashboard"],
    tags: ["Python", "Google Looker", "API Social Media"],
    slug: "dashboard-nadar",
    libraries: ["Python", "Pandas", "Google Analytics API", "Looker Studio", "Social Media APIs", "Matplotlib", "Seaborn"],
    details: {
      overview: "Desarrollo de un dashboard integral para Nadar Ediciones que combina datos de ventas, costos operativos y métricas de redes sociales en una plataforma centralizada de análisis y toma de decisiones.",
      features: [
        "Integración de múltiples fuentes de datos (ventas, redes sociales, costos)",
        "Dashboard interactivo en Google Looker Studio con actualizaciones en tiempo real",
        "Análisis de correlación entre actividad en redes sociales y ventas",
        "Reportes automatizados con insights de tendencias de mercado",
        "Predicciones de ventas basadas en datos históricos",
        "Optimización de estrategias comerciales basada en datos"
      ],
      challenges: [
        "Integración de APIs de diferentes plataformas sociales con formatos diversos",
        "Normalización y limpieza de datos de múltiples fuentes",
        "Diseño de visualizaciones que comuniquen insights complejos de forma simple",
        "Automatización de actualizaciones de datos sin interrumpir operaciones"
      ],
      results: [
        "Incremento del 25% en eficiencia de estrategias comerciales",
        "Reducción del 40% en tiempo de análisis manual de datos",
        "Identificación de correlaciones clave entre redes sociales y ventas",
        "Dashboard completamente automatizado con actualizaciones diarias"
      ]
    }
  },
  {
    id: 3,
    title: "Análisis Desempeño Académico",
    description: "Investigación sobre factores que inciden en el desempeño académico usando machine learning no supervisado para clustering y análisis predictivo.",
    icon: GraduationCap,
    categories: ["r", "sql"],
    tags: ["R", "Machine Learning", "Clustering", "SQL"],
    slug: "analisis-academico",
    libraries: ["R", "dplyr", "ggplot2", "cluster", "factoextra", "corrplot", "caret", "randomForest", "PostgreSQL"],
    details: {
      overview: "Investigación aplicada sobre los factores determinantes en el desempeño académico de estudiantes universitarios, utilizando técnicas avanzadas de machine learning y análisis estadístico.",
      features: ["Análisis de clustering para segmentación de estudiantes", "Modelos predictivos de rendimiento académico", "Correlaciones entre variables socioeconómicas y académicas", "Visualizaciones interactivas de patrones de datos"],
      challenges: ["Manejo de datos faltantes y outliers", "Selección de variables más relevantes", "Interpretación de clusters en contexto educativo"],
      results: ["Identificación de 4 perfiles distintos de estudiantes", "Modelo predictivo con 82% de precisión", "Recomendaciones implementadas por la universidad"]
    }
  },
  {
    id: 4,
    title: "Automatización WhatsApp",
    description: "Sistema de automatización de comunicaciones para proyectos de capacitación. Envío programado de contenido y seguimiento de participación.",
    icon: Bot,
    categories: ["python"],
    tags: ["Python", "WhatsApp API", "Automatización"],
    slug: "whatsapp-automation",
    libraries: ["Python", "WhatsApp API", "Schedule", "SQLite", "Pandas", "Requests", "JSON", "Datetime"],
    details: {
      overview: "Sistema automatizado para gestión de comunicaciones masivas en proyectos de capacitación, optimizando la participación y seguimiento de usuarios.",
      features: ["Envío programado de mensajes personalizados", "Seguimiento de participación en tiempo real", "Reportes automáticos de engagement", "Base de datos de usuarios segmentados"],
      challenges: ["Cumplimiento de políticas de WhatsApp", "Gestión de grandes volúmenes de mensajes", "Personalización masiva sin spam"],
      results: ["85% de incremento en participación", "Automatización completa del proceso", "0% de reportes de spam"]
    }
  },
  {
    id: 5,
    title: "Dashboard Contact Center",
    description: "Dashboard de métricas clave para monitoreo de ventas, dotación y rendimiento de campañas. Implementación de estrategias basadas en datos para incremento de ventas.",
    icon: Phone,
    categories: ["python", "dashboard"],
    tags: ["Google Data Studio", "KPIs", "Análisis Ventas"],
    slug: "dashboard-contact-center",
    libraries: ["Google Data Studio", "Python", "Pandas", "BigQuery", "Google Sheets API", "Plotly", "Streamlit"],
    details: {
      overview: "Dashboard integral para contact center con monitoreo en tiempo real de métricas comerciales y operativas.",
      features: ["KPIs de ventas en tiempo real", "Análisis de productividad por agente", "Seguimiento de campañas", "Reportes automatizados"],
      challenges: ["Integración de múltiples sistemas", "Visualización de datos complejos", "Actualización en tiempo real"],
      results: ["30% incremento en ventas", "Reducción de tiempos de análisis", "Mejora en toma de decisiones"]
    }
  },
  {
    id: 6,
    title: "Web Scraping Automatizado",
    description: "Automatización de descarga de documentos para procesos de acreditación universitaria. Sistema eficiente de extracción y organización de datos web.",
    icon: Worm,
    categories: ["python", "sql"],
    tags: ["Python", "Web Scraping", "Selenium", "BeautifulSoup"],
    slug: "web-scraping",
    libraries: ["Python", "Selenium", "BeautifulSoup", "Requests", "Pandas", "SQLite", "ChromeDriver", "lxml"],
    details: {
      overview: "Sistema automatizado de extracción de documentos web para procesos académicos universitarios.",
      features: ["Scraping automatizado", "Organización de documentos", "Validación de archivos", "Base de datos centralizada"],
      challenges: ["Sitios web dinámicos", "Anti-scraping measures", "Volumen masivo de datos"],
      results: ["90% reducción en tiempo manual", "100% precisión en extracción", "Sistema completamente automatizado"]
    }
  },
  {
    id: 7,
    title: "Análisis de Texto NLP",
    description: "Procesamiento de lenguaje natural para análisis de sentimientos y extracción de insights de datos textuales en proyectos de investigación social.",
    icon: MessageSquare,
    categories: ["r"],
    tags: ["R", "NLP", "Text Mining", "Sentiment Analysis"],
    slug: "nlp-analysis",
    libraries: ["R", "tm", "wordcloud", "RColorBrewer", "SnowballC", "syuzhet", "tidytext", "dplyr", "ggplot2"],
    details: {
      overview: "Análisis avanzado de texto usando NLP para investigación social y análisis de sentimientos.",
      features: ["Análisis de sentimientos", "Word clouds", "Topic modeling", "Análisis de frecuencias", "Visualizaciones interactivas"],
      challenges: ["Limpieza de texto en español", "Modelos de sentimientos precisos", "Interpretación de resultados"],
      results: ["Insights clave en investigación social", "Análisis automatizado de opiniones", "Reportes visuales impactantes"]
    }
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
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = projects.filter(project => 
    activeFilter === "all" || project.categories.includes(activeFilter)
  );

  const openProjectModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

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
                  <div className="mt-4 space-y-2">
                    <div className="text-sm font-semibold text-[var(--accent-color)] mb-2">
                      Librerías utilizadas:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.libraries.map((library) => (
                        <span 
                          key={library} 
                          className="px-2 py-1 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded text-xs font-medium"
                        >
                          {library}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full btn-outline-custom mt-3"
                      onClick={() => openProjectModal(project)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Proyecto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <ProjectModal 
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeProjectModal}
        />
      </div>
    </section>
  );
}
