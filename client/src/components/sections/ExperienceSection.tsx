import { SectionTitle } from "@/components/ui/section-title";
import { TimelineItem } from "@/components/ui/timeline-item";
import { EXPERIENCE } from "@/lib/constants";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <SectionTitle>Experiencia Profesional</SectionTitle>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {EXPERIENCE.map((exp, index) => (
            <TimelineItem 
              key={index}
              company={exp.company}
              position={exp.position}
              period={exp.period}
              description={exp.description}
              roles={exp.roles}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
