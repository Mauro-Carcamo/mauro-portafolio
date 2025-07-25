import { SectionTitle } from "@/components/ui/section-title";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function TechnologiesSection() {
  const technologies = {
    "Lenguajes de Programación": [
      "Python", "R", "JavaScript", "TypeScript", "SQL", "HTML/CSS"
    ],
    "Frameworks y Librerías": [
      "React", "React Native", "Node.js", "Flask", "TensorFlow", "Scikit-learn", 
      "XGBoost", "Pandas", "NumPy", "NLTK", "Transformers", "BERT"
    ],
    "Bases de Datos": [
      "MongoDB", "PostgreSQL", "MySQL"
    ],
    "Herramientas de Visualización": [
      "Tableau", "Plotly", "Dash", "ggplot2", "Google Looker Studio", "Power BI"
    ],
    "Herramientas de Desarrollo": [
      "GitHub", "Visual Studio Code", "RStudio", "Jupyter", "Docker", "Git"
    ],
    "Tecnologías Web": [
      "Socket.io", "APIs REST", "Vite", "Tailwind CSS"
    ],
    "Análisis y Machine Learning": [
      "Machine Learning", "Deep Learning", "NLP", "Data Analysis", 
      "Web Scraping", "Text Analysis", "Random Forest", "Statistical Analysis"
    ]
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="technologies" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <SectionTitle>Tecnologías y Herramientas</SectionTitle>
        
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {Object.entries(technologies).map(([category, techs], categoryIndex) => (
            <motion.div 
              key={categoryIndex}
              className="mb-8"
              variants={item}
            >
              <h3 className="text-xl font-semibold text-primary mb-4">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {techs.map((tech, techIndex) => (
                  <Badge 
                    key={techIndex} 
                    variant="secondary" 
                    className="bg-white text-secondary border border-secondary/20 px-4 py-2 text-sm font-medium"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}