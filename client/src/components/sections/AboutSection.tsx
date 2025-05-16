import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { ABOUT_ME, SERVICES } from "@/lib/constants";
import { 
  BarChart,
  Code,
  UsersRound
} from "lucide-react";

export default function AboutSection() {
  const icons = {
    "chart-line": <BarChart className="h-8 w-8" />,
    "code": <Code className="h-8 w-8" />,
    "users-cog": <UsersRound className="h-8 w-8" />
  };
  
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
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Sobre Mí</SectionTitle>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg mb-6">{ABOUT_ME.paragraph1}</p>
          <p className="text-lg mb-6">{ABOUT_ME.paragraph2}</p>
          <p className="text-lg">{ABOUT_ME.paragraph3}</p>
        </motion.div>
        
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {SERVICES.map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-muted p-6 rounded-lg shadow-md"
              variants={item}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4 text-secondary">
                {service.icon && icons[service.icon as keyof typeof icons]}
                <h3 className="font-semibold text-xl ml-4">{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
