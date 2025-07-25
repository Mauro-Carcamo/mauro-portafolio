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
- **2025-01-25**: Actualización de diseño y UX según feedback del usuario
  - Cambiada paleta de colores a púrpura profundo (#3B2F5F), púrpura rico (#9B59B6) y naranja cálido (#F39C12)
  - Eliminado formulario de contacto en sección Contact por solicitud del usuario
  - Reemplazados círculos de fondo por iconos directos más relevantes
  - Mejorada sección de contacto con enfoque en información de contacto directa
  - Optimizado popup de bienvenida con tamaño más pequeño y mejor centrado
  - Agregados logos sociales (LinkedIn, GitHub, Email) en sección Hero
  - Revertidos fondos al diseño original según preferencia del usuario

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
- Diseño: Profesional simplificado sin fondos complejos
- Colores: Esquema púrpura/naranja (#3B2F5F, #9B59B6, #F39C12)
- UI/UX: Popup pequeño y centrado, sin formularios de contacto, iconos directos en lugar de círculos

## Deployment Instructions
1. Hacer commit de todos los archivos al repositorio de GitHub
2. En GitHub: Settings > Pages
3. Seleccionar "Deploy from a branch"
4. Elegir rama "main" y carpeta "/ (root)"
5. El sitio estará disponible en: https://username.github.io/repository-name

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