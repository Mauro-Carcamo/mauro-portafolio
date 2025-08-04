import { Code2, Database, Palette, Wrench, Globe, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const libraryCategories = [
  {
    title: "Análisis de Datos",
    icon: BarChart3,
    color: "bg-blue-500",
    libraries: [
      "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", 
      "Plotly", "TensorFlow", "Keras", "XGBoost", "NLTK", "spaCy"
    ]
  },
  {
    title: "Desarrollo Web",
    icon: Globe,
    color: "bg-green-500",
    libraries: [
      "React", "Node.js", "Express", "FastAPI", "Flask", "Django", 
      "Bootstrap", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "TypeScript"
    ]
  },
  {
    title: "Bases de Datos",
    icon: Database,
    color: "bg-purple-500",
    libraries: [
      "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", 
      "Firebase", "Supabase", "SQLAlchemy", "Prisma", "Drizzle ORM"
    ]
  },
  {
    title: "Herramientas de Desarrollo",
    icon: Wrench,
    color: "bg-orange-500",
    libraries: [
      "Git", "Docker", "Linux", "Jupyter", "VS Code", "PyCharm", 
      "Postman", "Selenium", "BeautifulSoup", "Scrapy", "Apache Airflow"
    ]
  },
  {
    title: "Lenguajes de Programación",
    icon: Code2,
    color: "bg-indigo-500",
    libraries: [
      "Python", "R", "SQL", "JavaScript", "TypeScript", "Bash", 
      "Markdown", "JSON", "XML", "YAML"
    ]
  },
  {
    title: "Visualización",
    icon: Palette,
    color: "bg-pink-500",
    libraries: [
      "Tableau", "Power BI", "Google Data Studio", "Looker Studio", 
      "D3.js", "Chart.js", "Grafana", "Streamlit", "Dash", "Shiny"
    ]
  }
];

export default function Libraries() {
  return (
    <section id="librerias" className="py-20 bg-[var(--light-bg)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--accent-color)] mb-4 relative">
            Tecnologías y Librerías
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[var(--primary-color)] rounded"></div>
          </h2>
          <p className="text-lg text-[var(--accent-color)]/80 max-w-2xl mx-auto">
            Stack tecnológico y herramientas utilizadas en mis proyectos de ciencia de datos y desarrollo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {libraryCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="h-full bg-white border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-4 w-16 h-16 ${category.color} rounded-full flex items-center justify-center`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-[var(--accent-color)]">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.libraries.map((library) => (
                      <span 
                        key={library} 
                        className="px-3 py-1 bg-[var(--secondary-color)] text-[var(--accent-color)] rounded-full text-sm font-medium transition-all duration-200 hover:bg-[var(--primary-color)] hover:text-white cursor-default"
                      >
                        {library}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}