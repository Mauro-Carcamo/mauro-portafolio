# Mauricio Cárcamo - Portafolio Profesional

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

- **Eliminación del Formulario de Contacto:** Se ha eliminado completamente el formulario de contacto de la sección "Contacto".
- **Mejoras en el Dashboard de Mortalidad:**
    - **Refactorización del Código:** Se ha refactorizado la aplicación Shiny `version2.py` para mejorar su estructura y legibilidad.
    - **Externalización de CSS:** El código de estilos se ha movido a un archivo `styles.css` externo.
    - **Código Comentado:** Se han añadido comentarios al código para facilitar su mantenimiento.
    - **Modularización:** La lógica de carga de datos se ha movido a un archivo `helpers.py`.
    - **Gráficos Interactivos:** Se han reemplazado los gráficos estáticos de `matplotlib` por gráficos interactivos de `plotly`.
    - **Nuevo Filtro:** Se ha añadido un filtro para analizar los datos por enfermedad.
    - **Métricas de Modelo:** Se ha añadido el cálculo y visualización del Error Absoluto Medio (MAE) para el modelo ARIMA.
    - **Limpieza de Archivos:** Se han eliminado los archivos de dashboard antiguos y no utilizados.
- **Reestructuración del Repositorio del Proyecto de Mortalidad:** Se ha reorganizado la estructura de archivos del proyecto de mortalidad para seguir las mejores prácticas de la industria.

## Próximos Pasos

**1. Mejorar el README del Proyecto de Mortalidad:**
   - Incluir: resumen del proyecto, problema, dataset, metodología, resultados clave, cómo replicar, capturas/demos.

**2. Limpieza de los Notebooks:**
   - Dividir en notebooks bien organizados: exploración, preprocesamiento, modelado, evaluación.

**3. Desplegar el Proyecto en Vercel:**
   - Una vez completadas las mejoras, proceder con el despliegue del sitio en Vercel.

**4. Commit de los Cambios:**
   - Crear un commit con todos los arreglos y mejoras realizadas.
