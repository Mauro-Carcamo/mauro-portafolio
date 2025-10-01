import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TechnologyIcon } from "@/components/technology-icon"

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
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Habilidades Técnicas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones robustas y escalables
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="text-lg text-center">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <TechnologyIcon techName={skill.name} size={32} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>
    </section>
  )
}
