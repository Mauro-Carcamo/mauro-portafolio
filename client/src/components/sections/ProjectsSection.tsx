import { SectionTitle } from "@/components/ui/section-title";
import { PROJECTS } from "@/lib/constants";
import { motion } from "framer-motion";
import { 
  BarChart, 
  BookOpen, 
  Music, 
  ExternalLink,
  Github,
  Target
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProjectsSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "chart-line":
        return <BarChart className="h-16 w-16" />;
      case "book":
        return <BookOpen className="h-16 w-16" />;
      case "music":
        return <Music className="h-16 w-16" />;
      case "target":
        return <Target className="h-16 w-16" />;
      default:
        return <BarChart className="h-16 w-16" />;
    }
  };

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Proyectos</SectionTitle>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={index}
              className="project-card bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200"
              variants={item}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <div className="h-48 bg-secondary bg-opacity-10 flex items-center justify-center">
                {getIcon(project.icon)}
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2 text-primary">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="bg-secondary/10 text-secondary border border-secondary/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a 
                    href={`/proyecto/${project.slug}`} 
                    className="inline-flex items-center gap-2 font-medium text-secondary hover:text-accent transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Ver más</span>
                  </a>
                  <span className="text-gray-400">|</span>
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-gray-600 hover:text-secondary transition-colors"
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
