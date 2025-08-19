# Proyecto Portfolio - Mauricio Cárcamo

## Overview
Portfolio profesional de Mauricio Cristian Cárcamo Díaz, especializado en Ciencia de Datos y Desarrollo Full Stack. El sitio web está construido con React + TypeScript + Vite y optimizado para GitHub Pages.

## Project Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (static build)

## Structure for GitHub Pages
```
/
├── index.html          # Archivo principal para GitHub Pages
├── assets/             # CSS, JS e imágenes compiladas
├── README.md           # Documentación del proyecto
├── .gitignore          # Configuración Git
└── client/             # Código fuente React (para desarrollo)
```

## Recent Changes
- **2025-01-25**: Actualización de diseño masculino y sistema de proyectos individuales
  - Cambiada paleta de colores a esquema masculino: azul oscuro (#2C3E50), azul acero (#34495E) y verde tecnológico (#27AE60)
  - Agregado proyecto "Kittypaw!" como nuevo proyecto destacado
  - Reorganizada sección de contacto con iconos sociales integrados en lista
  - Creado sistema de páginas individuales para cada proyecto (/proyecto/:slug)
  - Implementada navegación entre proyectos y portfolio principal
  - Agregada funcionalidad de rutas dinámicas para contenido detallado de proyectos
  - Creada nueva sección "Tecnologías y Herramientas" con todas las tecnologías de proyectos
  - Eliminados efectos hover en badges de tecnologías para mantenerlos estáticos
  - Proyecto compilado y configurado correctamente para GitHub Pages deployment
  - Archivos de producción listos en la raíz: index.html, assets/, attached_assets/
  - Referencias de archivos corregidas para rutas relativas (./assets/ en lugar de /assets/)
  - Eliminados botones de proyectos y contacto del hero section
  - Cambiado nombre a "Mauricio Cárcamo" (forma más corta y profesional)
  - Movidos iconos sociales arriba del nombre en hero section
  - Reducido tamaño de tarjetas de proyectos con grid más compacto (4 columnas en desktop)
  - Optimizada visualización de tecnologías mostrando solo las 3 primeras + contador

- **2025-01-25**: Reestructurado proyecto para GitHub Pages deployment
  - Movido index.html a la raíz del proyecto
  - Copiada carpeta assets/ compilada a la raíz
  - Actualizado index.html con referencias correctas a assets
  - Creado README.md con instrucciones de deployment
  - Configurado .gitignore para GitHub Pages

- **2025-01-25**: Portfolio completo implementado
  - Todas las secciones creadas: Hero, Projects, Experience, Education, Contact
  - Diseño responsivo optimizado
  - Animaciones y transiciones suaves
  - SEO optimizado

## User Preferences
- Idioma: Español
- Deployment: GitHub Pages
- Diseño: Portfolio masculino profesional con estética moderna
- Colores: Esquema masculino azul/verde (#2C3E50, #34495E, #27AE60)
- UI/UX: Iconos sociales integrados en contacto bajo "Sígueme en:", páginas individuales editables para proyectos
- Documentos: Visualización online en lugar de solo descarga
- Proyectos: Sistema de navegación individual con contenido detallado editable

## Deployment Instructions
1. Hacer commit de todos los archivos al repositorio de GitHub (especialmente index.html, assets/, attached_assets/, README.md)
2. En GitHub: Settings > Pages
3. Seleccionar "Deploy from a branch"
4. Elegir rama "main" y carpeta "/ (root)"
5. El sitio estará disponible en: https://username.github.io/repository-name

## Archivos de Producción Listos
- ✅ index.html - Archivo principal con rutas relativas corregidas
- ✅ assets/ - CSS, JS e imágenes compiladas
- ✅ attached_assets/ - Certificados y documentos PDF para visualización online
- ✅ README.md - Documentación actualizada del proyecto
- ✅ .gitignore - Configurado para preservar archivos de deployment

## Data Sources
- CV de Mauricio Cárcamo (PDF adjunto)
- Foto profesional (attached_assets/1706536613867.jpg)
- Enlaces a repositorios de GitHub de proyectos
- Información personal y profesional extraída del curriculum

## Technical Notes
- El proyecto original está en /client/ para desarrollo
- Los archivos de producción están en la raíz para GitHub Pages
- Para cambios: editar en /client/, hacer build, copiar assets/ a raíz
- El formulario de contacto es funcional pero requiere backend para envío real