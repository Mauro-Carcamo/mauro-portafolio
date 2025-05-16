import { SectionTitle } from "@/components/ui/section-title";
import { EDUCATION } from "@/lib/constants";
import { motion } from "framer-motion";

export default function EducationSection() {
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
    <section id="education" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Educación</SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div 
            className="bg-muted p-6 rounded-lg shadow-md"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-4 text-primary">Educación Formal</h3>
            
            {EDUCATION.formal.map((edu, index) => (
              <motion.div 
                key={index} 
                className={`mb-4 pb-4 ${index < EDUCATION.formal.length - 1 ? 'border-b border-gray-200' : ''}`}
                variants={item}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{edu.degree}</span>
                  <span className="text-secondary">{edu.year}</span>
                </div>
                <p className="text-gray-600">{edu.institution}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="bg-muted p-6 rounded-lg shadow-md"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-4 text-primary">Cursos y Certificaciones</h3>
            
            {EDUCATION.courses.map((course, index) => (
              <motion.div 
                key={index} 
                className={`mb-4 pb-4 ${index < EDUCATION.courses.length - 1 ? 'border-b border-gray-200' : ''}`}
                variants={item}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{course.name}</span>
                  <span className="text-secondary">{course.year}</span>
                </div>
                <p className="text-gray-600">{course.institution}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
