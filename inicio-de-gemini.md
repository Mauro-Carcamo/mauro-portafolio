# Inicio de Gemini - Guía para Entender el Proyecto

Este documento sirve como punto de partida para analizar y comprender la estructura y funcionamiento del portafolio de Mauricio Cárcamo antes de utilizar Gemini para realizar modificaciones. A continuación, se enumeran los archivos y directorios clave que deben revisarse.

**Nota Importante:** La configuración inicial, el contenido y el código de este proyecto están completamente en español.

## 1. Configuración y Dependencias

Estos archivos definen la estructura del proyecto, sus dependencias y cómo se ejecuta.

*   **`package.json`**: Define los scripts de `npm` (como `dev`, `build`, `start`), las dependencias del proyecto (React, Next.js, Tailwind CSS, etc.) y otra metainformación. Es el punto de partida para entender qué tecnologías se utilizan.
*   **`next.config.mjs`**: Contiene la configuración específica de Next.js. Aquí se pueden definir reglas de redireccionamiento, optimización de imágenes y otras configuraciones avanzadas del framework.
*   **`tsconfig.json`**: Especifica las opciones del compilador de TypeScript. Es fundamental para entender cómo se transpila el código y qué reglas de tipado se aplican.
*   **`tailwind.config.js` / `postcss.config.mjs`**: Definen la configuración de Tailwind CSS, incluyendo la personalización de temas, colores, fuentes y plugins.

## 2. Estructura de la Aplicación (Directorio `app`)

Next.js utiliza un sistema de enrutamiento basado en el sistema de archivos. El directorio `app` es el corazón de la aplicación.

*   **`app/layout.tsx`**: Es el layout principal que envuelve a toda la aplicación. Aquí se definen elementos comunes como el `<html>`, `<body>`, y componentes persistentes como el `Header` y el `Footer`.
*   **`app/page.tsx`**: Corresponde a la página de inicio (`/`). Contiene la estructura principal de la página, ensamblando las diferentes secciones del portafolio.
*   **`app/globals.css`**: Archivo de estilos globales que se aplican a toda la aplicación.

### Páginas de Proyectos

*   **`app/projects/`**: Este directorio contiene las subpáginas para cada proyecto individual.
    *   `kittypaw/page.tsx`
    *   `mortality-prediction/page.tsx`
    *   `music-lyrics/page.tsx`
    *   `religious-texts/page.tsx`

## 3. Componentes Reutilizables (Directorio `components`)

Este es uno de los directorios más importantes para entender la arquitectura del frontend.

*   **`components/*.tsx`**: Contiene los componentes de alto nivel que representan las secciones principales de la página.
    *   `hero-section.tsx`
    *   `about-section.tsx`
    *   `projects-section.tsx`
    *   `skills-section.tsx`
    *   `experience-section.tsx`
    *   `education-section.tsx`
    *   `contact-section.tsx`
*   **`components/ui/*.tsx`**: Componentes de interfaz de usuario genéricos y reutilizables, muchos de ellos provenientes de `shadcn/ui` (ej. `Button`, `Card`, `Dialog`). Son los bloques de construcción básicos de la interfaz.
*   **`components/technology-icon.tsx`**: Un componente personalizado para mostrar los iconos de las tecnologías, importante para las secciones de habilidades y proyectos.

## 4. Activos Públicos (Directorio `public`)

Este directorio contiene todos los archivos estáticos que se sirven públicamente.

*   **`public/documents/*.pdf`**: Aquí se almacenan los certificados y el CV para su descarga.
*   **`public/icons/technologies/*.svg` / `*.png`**: Iconos de las tecnologías utilizadas en el portafolio.
*   **`public/*.png` / `*.jpg`**: Imágenes utilizadas en las diferentes secciones del sitio, como la foto de perfil y las imágenes de los proyectos.

## 5. Resumen del Proyecto

*   **`gemini.md`**: Este archivo proporciona un resumen completo del estado actual del proyecto, las funcionalidades implementadas, las tecnologías utilizadas y los próximos pasos. Es una lectura obligatoria para tener un contexto general antes de cualquier intervención.

## 6. Flujo de Trabajo con Gemini

*   **Resumen Inicial**: Al comenzar una sesión, Gemini debe proporcionar un resumen conciso de las últimas acciones realizadas.
*   **Próximos Pasos**: A continuación, Gemini debe indicar cuáles son los siguientes pasos o tareas pendientes.
*   **Finalización de la Sesión**: Al finalizar la sesión de trabajo, Gemini debe actualizar todos los archivos `.md` con un resumen de los cambios realizados, la fecha y la hora de finalización.

## 7. Registro de Trabajo

*   **Inicio de Trabajo:** domingo, 28 de septiembre de 2025, 10:00 AM

## 8. Workflow: Dashboard de Mortalidad en Chile

**Fase 1: Análisis y Extracción**
1.  Analizar el contenido del directorio `Moratalidad Chile 1997-2019`.
2.  Leer y analizar el Jupyter Notebook `proyeccion_muertes.ipynb` para entender el análisis y el dashboard existente.
3.  Extraer el código relevante para la generación de datos y visualizaciones del dashboard.

**Fase 2: Creación del Backend del Dashboard**
1.  Crear un nuevo script de Python para el backend del dashboard (e.g., `dashboard_server.py`).
2.  Utilizar una biblioteca como FastAPI para crear un servidor web.
3.  Crear endpoints en la API para servir los datos y las visualizaciones del dashboard.

**Fase 3: Integración con el Frontend**
1.  Crear un nuevo componente de React para el botón del dashboard en la página del proyecto.
2.  Agregar un icono de Python al botón.
3.  Configurar el botón para que abra el dashboard en una nueva pestaña.
4.  Crear una nueva página o componente para mostrar el dashboard, que consumirá los datos de la API del backend.

## Orden de Lectura Recomendado

1.  **`gemini.md`**: Para obtener una visión general y el estado actual del proyecto.
2.  **`package.json`**: Para entender las dependencias y scripts.
3.  **`app/layout.tsx` y `app/page.tsx`**: Para comprender la estructura principal de la página.
4.  **`components/`**: Explorar los componentes de sección para ver cómo está construida cada parte de la página.
5.  **`public/`**: Revisar los activos disponibles (imágenes, documentos).