# Mauricio Cárcamo - Portafolio Profesional

(Contenido anterior omitido por brevedad)

## Funcionamiento Verificado

- **Aplicación Shiny:** La aplicación Shiny para el proyecto de predicción de mortalidad ahora se carga y funciona correctamente dentro del portafolio. Se corrigió un error de puerto que impedía su visualización.
- **Enlaces del Sitio:**
    - Todos los enlaces de navegación interna (`#about`, `#projects`, etc.) funcionan correctamente.
    - Todos los enlaces a las páginas de los proyectos funcionan correctamente.
    - Todos los enlaces a redes sociales (GitHub, LinkedIn, WhatsApp, Email) funcionan correctamente.
    - El botón "Ver todos los proyectos en GitHub" ahora enlaza correctamente al perfil del usuario.
    - El botón "Descargar CV" ahora funciona y descarga el archivo `CV_Mauricio_Carcamo.pdf`.

## Errores Pendientes

1.  **Formulario de Contacto:** El botón "Enviar Mensaje" en el formulario de contacto sigue provocando una descarga no deseada del CV, a pesar de que la función de envío del formulario se ejecuta. La causa raíz de este comportamiento aún no se ha determinado.

## Próximos Pasos (Para la próxima sesión)

**1. Resolver Bug del Formulario de Contacto:**
   - Investigar y solucionar el problema que causa la descarga del CV al enviar el formulario de contacto.

**2. Desplegar el Proyecto en Vercel:**
   - Una vez solucionado el bug, proceder con el despliegue del sitio en Vercel.

   **Guía de Despliegue en Vercel:**

   **a. Crear una Cuenta en Vercel:**
      - Ir a [vercel.com](https://vercel.com) y registrarse.

   **b. Instalar la CLI de Vercel:**
      - Abrir la terminal y ejecutar: `npm install -g vercel`

   **c. Iniciar Sesión en Vercel:**
      - En la terminal, ejecutar: `vercel login`

   **d. Desplegar el Proyecto:**
      - Navegar a la raíz del proyecto (`D:\Escritorio\Proyectos Portafolio\Porfatolio`).
      - Ejecutar: `vercel`
      - Seguir las instrucciones de la CLI, aceptando los valores por defecto en la mayoría de los casos.

**3. Commit de los Cambios:**
   - Crear un commit con todos los arreglos y mejoras realizadas.
