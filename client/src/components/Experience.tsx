import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    period: "Sep 2024 - Dic 2024",
    title: "Coordinador de Proyecto",
    company: "Consultora Epojé",
    description: "Gestión integral del proyecto Escuela de Formación Sindical para el Ministerio del Trabajo. Responsable de planificación, diseño de módulos formativos, automatización de comunicaciones y seguimiento de indicadores clave de participación y aprendizaje.",
    tags: ["Gestión de Proyectos", "Automatización", "WhatsApp API"]
  },
  {
    period: "Abr 2024 - Ago 2024",
    title: "Community Manager & Analista de Datos",
    company: "Agencia I-Brain Digital",
    description: "Creación de contenido y gestión de redes sociales para empresas de diversos sectores. Análisis de datos mediante Meta Business Suite para optimización de campañas digitales y mejora del alcance de marcas.",
    tags: ["Meta Business Suite", "Social Media Analytics", "Marketing Digital"]
  },
  {
    period: "Sep 2023 - Dic 2023",
    title: "Asesor en Datos",
    company: "Nadar Ediciones",
    description: "Análisis integral de ventas y costos con vinculación de datos de redes sociales. Desarrollo de dashboard en Google Looker Studio para identificación de tendencias y optimización de estrategias comerciales.",
    tags: ["Google Looker Studio", "Análisis de Ventas", "Social Media Data"]
  },
  {
    period: "Abr 2018 - Ago 2022",
    title: "Especialista en Datos y Coaching",
    company: "Conectados S.A.",
    description: "Diseño de dashboards para monitoreo de métricas comerciales, coordinación de capacitación nacional e internacional, desarrollo de estrategias de ventas basadas en datos. Gestión de equipos y optimización de procesos operativos.",
    tags: ["Google Data Studio", "Gestión de Equipos", "KPIs Comerciales", "Capacitación"]
  },
  {
    period: "Sep 2022 - Ene 2023",
    title: "Consultor de Datos",
    company: "Universidad Diego Portales",
    description: "Apoyo en procesos de acreditación mediante automatización de descarga de documentos utilizando técnicas de web scraping. Creación y revisión de documentación técnica para postítulos de Medicina.",
    tags: ["Web Scraping", "Python", "Automatización"]
  }
];

export default function Experience() {
  return (
    <section id="experiencia" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--accent-color)] mb-4 relative">
            Experiencia Profesional
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[var(--primary-color)] rounded"></div>
          </h2>
        </div>

        <div className="timeline">
          {experiences.map((experience, index) => (
            <Card
              key={index}
              className="timeline-item bg-white border-0 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="text-[var(--primary-color)] font-semibold text-sm mb-2">
                  {experience.period}
                </div>
                <h3 className="font-semibold text-[var(--accent-color)] text-xl mb-2">
                  {experience.title}
                </h3>
                <div className="text-[var(--primary-color)] font-medium mb-3">
                  {experience.company}
                </div>
                <p className="text-[var(--accent-color)]/80 leading-relaxed mb-4">
                  {experience.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
