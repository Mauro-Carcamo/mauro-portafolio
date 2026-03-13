# Mauricio Cárcamo - Portafolio Profesional

	(Actualización 2026-03-13 20:46 - America/Santiago)
	
	- Se actualizó el proyecto **Kittypau**: ruta `/projects/kittypau`, nuevo contenido, video demo y enlaces con iconos (LinkedIn, Instagram, YouTube y acceso a la app).
	- Se corrigió el build: `app/projects/kittypau/page.tsx` ahora es client component para compatibilidad con `react-scroll-parallax`.
	- Se ajustó `scripts/clean-next.js` para que el limpiado sea best-effort y no bloquee `npm run build` en Windows cuando `.next/trace` está bloqueado.
	- Deploy a producción en Vercel y push a Git (commit `b4ffbc2`).
	
	(Contenido anterior omitido por brevedad)

## Funcionamiento Verificado

- **Aplicación Shiny:** La aplicación Shiny para el proyecto de predicción de mortalidad ahora se carga y funciona correctamente dentro del portafolio. Se corrigió un error de puerto que impedía su visualización.
- **Enlaces del Sitio:**
    - Todos los enlaces de navegación interna (`#about`, `#projects`, etc.) funcionan correctamente.
    - Todos los enlaces a las páginas de los proyectos funcionan correctamente.
    - Todos los enlaces a redes sociales (GitHub, LinkedIn, WhatsApp, Email) funcionan correctamente.
    - El botón "Ver todos los proyectos en GitHub" ahora enlaza correctamente al perfil del usuario.
    - **Botón de Descarga de CV (Sección Hero):** El botón en la sección "Hero" para descargar el CV funciona correctamente, iniciando la descarga del archivo `CV_Mauricio_Carcamo.pdf`.

## Tareas Completadas

- **Reestructuración del Repositorio del Proyecto de Mortalidad:** Se ha reorganizado la estructura de archivos del proyecto de mortalidad para seguir las mejores prácticas de la industria (`data`, `notebooks`, `src`, `web_app`).
- **Mejoras en el Dashboard de Mortalidad:**
    - Se ha refactorizado y mejorado la aplicación Shiny, incluyendo la modularización del código, la externalización de CSS y la adición de comentarios.
    - Se han reemplazado los gráficos estáticos por versiones interactivas con `plotly`.
    - Se ha solucionado un error de renderizado implementando `shinywidgets`.
    - Se han añadido nuevas funcionalidades, como un filtro por enfermedad y la métrica MAE para el modelo ARIMA.
- **Limpieza de Notebooks:** Se ha consolidado y reorganizado el notebook de análisis exploratorio y modelado.
- **Creación de Animación:** Se ha creado un script que genera una animación interactiva en formato HTML.

## Próximos Pasos (Para la próxima sesión)

**1. Crear un pipeline reproducible:**
   - Convertir el código del notebook en scripts de Python (`01_data_preprocessing.py`, `02_feature_engineering.py`, etc.) para automatizar el flujo de trabajo.

**2. Mejorar el README del Proyecto de Mortalidad:**
   - Completar las secciones pendientes del archivo README.md con la descripción del proyecto, metodología y resultados.

**3. Desplegar el Proyecto en Vercel:**
   - Una vez completadas las mejoras, proceder con el despliegue del sitio en Vercel.
