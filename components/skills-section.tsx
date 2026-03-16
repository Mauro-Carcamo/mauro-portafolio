import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { SectionParallax } from "@/components/section-parallax"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SkillTooltipIcon } from "@/components/skill-tooltip-icon"

export function SkillsSection() {
  const descriptions: Record<string, string> = {
    React: "LibrerÃ­a para crear interfaces con componentes.",
    "Next.js": "Framework de React para apps rÃ¡pidas con rutas y buen SEO.",
    TypeScript: "JavaScript con tipos para evitar errores.",
    "Tailwind CSS": "CSS por clases para diseÃ±ar rÃ¡pido y consistente.",
    "Vue.js": "Framework para interfaces web reactivas.",
    "Node.js": "JavaScript en el servidor.",
    Express: "Framework minimalista para APIs en Node.js.",
    Python: "Lenguaje versÃ¡til para datos y backend.",
    FastAPI: "Framework Python para APIs rÃ¡pidas y modernas.",
    GraphQL: "API donde pides exactamente los datos que necesitas.",
    PostgreSQL: "Base de datos relacional robusta.",
    MongoDB: "Base de datos NoSQL basada en documentos.",
    Redis: "Base en memoria para cachÃ© y colas.",
    Prisma: "ORM para trabajar con BD desde TypeScript.",
    Supabase: "Backend listo: Postgres + Auth + Storage.",
    Git: "Control de versiones para tu cÃ³digo.",
    Docker: "Contenedores para correr apps igual en cualquier entorno.",
    AWS: "Servicios cloud para infraestructura.",
    Vercel: "Hosting y despliegue (ideal para Next.js).",
    Figma: "DiseÃ±o y prototipado de interfaces.",
  }

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React" },
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Vue.js" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js" },
        { name: "Express" },
        { name: "Python" },
        { name: "FastAPI" },
        { name: "GraphQL" },
      ],
    },
    {
      title: "Base de Datos",
      skills: [
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "Redis" },
        { name: "Prisma" },
        { name: "Supabase" },
      ],
    },
    {
      title: "Herramientas",
      skills: [
        { name: "Git" },
        { name: "Docker" },
        { name: "AWS" },
        { name: "Vercel" },
        { name: "Figma" },
      ],
    },
  ]


  return (
    <section
      id="skills"
      className="relative py-14 sm:py-20 bg-muted/30"
    >
      <SectionParallax variant="muted" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              className="mb-12 sm:mb-16"
              eyebrow="Stack"
              title={
                <>
                  Habilidades <span className="text-primary">Técnicas</span>
                </>
              }
              description="Tecnologías y herramientas que uso para crear soluciones robustas y escalables."
            />
          </ScrollReveal>

          <ScrollReveal delayMs={80}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="h-full rounded-2xl border border-border/60 bg-background/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-center tracking-tight">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-center gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillTooltipIcon
                        key={skillIndex}
                        techName={skill.name}
                        description={descriptions[skill.name] ?? "TecnologÃ­a usada en mis proyectos."}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </ScrollReveal>


        </div>
      </div>
    </section>
  )
}
