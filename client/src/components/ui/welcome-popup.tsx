import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FolderOpen, GraduationCap, Briefcase, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomePopupProps {
  onNavigate: (section: string) => void;
}

export function WelcomePopup({ onNavigate }: WelcomePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("portfolioVisited");
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("portfolioVisited", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  const menuItems = [
    { name: "Proyectos", icon: FolderOpen, section: "#projects", color: "bg-blue-500" },
    { name: "Educación", icon: GraduationCap, section: "#education", color: "bg-green-500" },
    { name: "Experiencia", icon: Briefcase, section: "#experience", color: "bg-purple-500" },
    { name: "Contacto", icon: Mail, section: "#contact", color: "bg-orange-500" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
          >
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="text-center mb-8">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-primary mb-4"
              >
                ¡Gracias por llegar hasta acá! 🎉
              </motion.h2>
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600"
              >
                ¿Qué te gustaría explorar?
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigate(item.section)}
                  className="p-4 rounded-xl border-2 border-gray-200 hover:border-secondary transition-all duration-300 group"
                >
                  <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-base text-gray-800 group-hover:text-secondary transition-colors">
                    {item.name}
                  </h3>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8"
            >
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Explorar libremente
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}