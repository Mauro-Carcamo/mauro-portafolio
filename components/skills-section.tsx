import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TechnologyIcon } from "@/components/technology-icon"
import { SectionHeader } from "@/components/section-header"
import { SectionParallax } from "@/components/section-parallax"
import { ScrollReveal } from "@/components/scroll-reveal"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 75 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 87 },
        { name: "Express", level: 85 },
        { name: "Python", level: 80 },
        { name: "FastAPI", level: 78 },
        { name: "GraphQL", level: 72 },
      ],
    },
    {
      title: "Base de Datos",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 82 },
        { name: "Redis", level: 75 },
        { name: "Prisma", level: 88 },
        { name: "Supabase", level: 80 },
      ],
    },
    {
      title: "Herramientas",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 78 },
        { name: "AWS", level: 75 },
        { name: "Vercel", level: 92 },
        { name: "Figma", level: 85 },
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
                  <div className="flex flex-wrap justify-center gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="rounded-xl border border-border/50 bg-muted/30 p-2.5 shadow-sm">
                        <TechnologyIcon techName={skill.name} size={32} />
                      </div>
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
