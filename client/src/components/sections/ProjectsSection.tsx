import { SectionTitle } from "@/components/ui/section-title";
import { PROJECTS } from "@/lib/constants";
import { motion } from "framer-motion";
import { 
  ExternalLink,
  Github
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KittypawCarousel } from "@/components/ui/kittypaw-carousel";

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
  
  

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Exploraciones</SectionTitle>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={index}
              className="project-card bg-white rounded-lg overflow-hidden shadow-md border border-gray-200"
              variants={item}
              whileHover={{ 
                y: -3,
                boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1), 0 8px 8px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <div className="h-32 bg-secondary bg-opacity-10 flex items-center justify-center overflow-hidden">
                {project.slug === 'kittypaw' ? (
                  <KittypawCarousel />
                ) : (
                <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-primary">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="bg-secondary/10 text-secondary border border-secondary/20 text-xs px-2 py-1">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs px-2 py-1">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2 text-sm">
                  <a 
                    href={`/proyecto/${project.slug}`} 
                    className="inline-flex items-center gap-1 font-medium text-secondary hover:text-accent transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>Ver más</span>
                  </a>
                  <span className="text-gray-400">|</span>
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-gray-600 hover:text-secondary transition-colors"
                  >
                    <Github size={14} />
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
