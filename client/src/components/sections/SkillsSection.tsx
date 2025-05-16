import { SectionTitle } from "@/components/ui/section-title";
import { SkillBar } from "@/components/ui/skill-bar";
import { SKILLS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function SkillsSection() {
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
    <section id="skills" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <SectionTitle>Habilidades</SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-6 text-primary">Lenguajes de Programación</h3>
            
            {SKILLS.programmingLanguages.map((skill, index) => (
              <motion.div key={index} variants={item}>
                <SkillBar name={skill.name} level={skill.level} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-6 text-primary">Software y Herramientas</h3>
            
            {SKILLS.softwareTools.map((skill, index) => (
              <motion.div key={index} variants={item}>
                <SkillBar name={skill.name} level={skill.level} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-6 text-primary">Data Science</h3>
            
            {SKILLS.dataScience.map((skill, index) => (
              <motion.div key={index} variants={item}>
                <SkillBar name={skill.name} level={skill.level} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-6 text-primary">Habilidades Profesionales</h3>
            
            {SKILLS.professionalSkills.map((skill, index) => (
              <motion.div key={index} variants={item}>
                <SkillBar name={skill.name} level={skill.level} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
