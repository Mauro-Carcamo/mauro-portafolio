import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";
import profileImage from "@assets/1706536613867.jpg";

export default function HeroSection() {
  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-16 bg-data-pattern relative">
      <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/3 mb-8 md:mb-0 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={profileImage} 
              alt="Mauricio Cárcamo" 
              className="rounded-full w-56 h-56 object-cover border-4 border-accent shadow-lg" 
            />
          </motion.div>
          <motion.div 
            className="md:w-2/3 text-center md:text-left text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="font-bold text-4xl md:text-5xl mb-4">
              {PERSONAL_INFO.name.split(" ")[0]} {PERSONAL_INFO.name.split(" ")[1]}
            </h1>
            <h2 className="font-medium text-2xl md:text-3xl mb-4 text-accent">{PERSONAL_INFO.title}</h2>
            <p className="text-lg mb-6 max-w-2xl">{PERSONAL_INFO.shortBio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.a 
                href="#projects" 
                className="bg-accent hover:bg-opacity-80 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Ver Proyectos
              </motion.a>
              <motion.a 
                href="#contact" 
                className="bg-transparent border-2 border-white hover:border-accent hover:text-accent text-white font-medium py-2 px-6 rounded-md transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Contacto
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
