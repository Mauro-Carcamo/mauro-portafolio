import { useParams, Link } from "wouter";
import { PROJECTS } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KittypawCarousel } from "@/components/ui/kittypaw-carousel";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Proyecto no encontrado</h1>
          <Link href="/">
            <Button className="bg-secondary hover:bg-secondary/80">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al portfolio
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {project.slug === 'kittypaw' ? (
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-8">
                <div className="flex-1 text-center lg:text-left lg:max-w-2xl">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                  <p className="text-xl text-gray-200">{project.description}</p>
                </div>
                
                <div className="w-full lg:w-72 h-40 flex justify-center lg:mt-4">
                  <KittypawCarousel 
                    className="h-full w-full bg-white/10 backdrop-blur-sm rounded-lg shadow-lg" 
                    showControls={true}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto">{project.description}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Tecnologías utilizadas</h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-primary mb-6">Descripción del proyecto</h2>
            <div className="prose max-w-none text-gray-700 mb-8">
              {/* Contenido editable por proyecto */}
              {project.slug === 'kittypaw' && (
                <div>
                  <p className="text-lg mb-4">
                    Kittypaw! es una aplicación móvil innovadora diseñada para revolucionar el proceso de adopción de mascotas. 
                    La aplicación conecta refugios de animales, organizaciones de rescate y familias adoptantes a través de una 
                    plataforma intuitiva y moderna.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">Características principales:</h3>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li><strong>Sistema de matching inteligente:</strong> Algoritmo que empareja mascotas con familias basado en estilo de vida, experiencia y preferencias.</li>
                    <li><strong>Chat en tiempo real:</strong> Comunicación directa entre adoptantes y refugios para coordinar visitas y adopciones.</li>
                    <li><strong>Perfiles detallados:</strong> Información completa de cada mascota incluyendo personalidad, necesidades médicas y historial.</li>
                    <li><strong>Geolocalización:</strong> Encuentra mascotas disponibles cerca de tu ubicación.</li>
                    <li><strong>Proceso de adopción digital:</strong> Formularios, verificaciones y seguimiento completamente digitalizados.</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">Impacto social:</h3>
                  <p className="mb-4">
                    La aplicación ha facilitado más de 500 adopciones exitosas en su primer año, reduciendo el tiempo promedio 
                    de adopción de 6 semanas a 2 semanas y aumentando la tasa de adopción exitosa en un 40%.
                  </p>
                </div>
              )}

              {project.slug === 'prediccion-mortalidad' && (
                <div>
                  <p className="text-lg mb-4">
                    Este proyecto utiliza técnicas avanzadas de machine learning para analizar y predecir patrones de mortalidad 
                    en Chile, proporcionando insights valiosos para la planificación de políticas públicas de salud.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">Metodología:</h3>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Análisis de datos históricos de mortalidad del MINSAL</li>
                    <li>Implementación de modelos de Random Forest y XGBoost</li>
                    <li>Análisis de factores socioeconómicos y demográficos</li>
                    <li>Validación cruzada y métricas de rendimiento</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3">Resultados:</h3>
                  <p className="mb-4">
                    El modelo alcanzó una precisión del 87% en la predicción de patrones de mortalidad, 
                    identificando factores clave como edad, región geográfica y condiciones socioeconómicas.
                  </p>
                </div>
              )}

              {/* Agregar más contenido específico para otros proyectos */}
              {!['kittypaw', 'prediccion-mortalidad'].includes(project.slug) && (
                <div>
                  <p className="text-lg mb-4">
                    Información detallada del proyecto {project.title}. 
                  </p>
                  <p className="mb-4">
                    Este espacio está disponible para agregar información específica del proyecto, 
                    incluyendo metodología, resultados, desafíos enfrentados y lecciones aprendidas.
                  </p>
                  <p className="text-gray-600">
                    <em>Contenido en desarrollo - Puedes editar esta sección agregando información específica del proyecto.</em>
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button 
                asChild 
                className="bg-secondary hover:bg-secondary/80"
              >
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Ver código en GitHub
                </a>
              </Button>

              {project.slug === 'kittypaw' && (
                <Button 
                  variant="outline"
                  asChild
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver demo en vivo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Gallery o capturas de pantalla */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">Capturas del proyecto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Imagen del proyecto disponible pronto</p>
              </div>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Imagen del proyecto disponible pronto</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}