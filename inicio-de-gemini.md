# Inicio de Gemini - Guía para Entender el Proyecto

Este documento sirve como punto de partida para analizar y comprender la estructura y funcionamiento del portafolio de Mauricio Cárcamo antes de utilizar Gemini para realizar modificaciones. A continuación, se enumeran los archivos y directorios clave que deben revisarse.

**Nota Importante:** La configuración inicial, el contenido y el código de este proyecto están completamente en español.

## 1. Flujo de Trabajo con Gemini (Instrucciones para el Inicio de Sesión)

Al comenzar una nueva sesión, es crucial seguir estos pasos para asegurar la continuidad y el contexto:

1.  **Leer `gemini.md` y `inicio-de-gemini.md`**: Antes de realizar cualquier acción, lee ambos documentos en su totalidad para comprender el estado actual del proyecto, las tareas pendientes y las lecciones aprendidas.
2.  **Proporcionar Resumen Inicial**: Como Gemini, debes proporcionar un resumen conciso de las últimas acciones realizadas en la sesión anterior.
3.  **Indicar Próximos Pasos**: A continuación, debes indicar cuáles son los siguientes pasos o tareas pendientes según el roadmap del proyecto.
4.  **Finalización de la Sesión**: Al finalizar la sesión de trabajo, actualiza ambos archivos `.md` con un resumen de los cambios realizados, la fecha y la hora de finalización.

## 2. Análisis Post-Mortem: Depuración de Shiny Express (Sesión del 28/09/2025)

Durante la integración del dashboard de mortalidad, nos encontramos con una serie de errores persistentes que dificultaron el desarrollo. Esta sección documenta la causa raíz y la solución final para referencia futura.

*   **El Problema Central**: La versión de `shiny` para Python utilizada en este proyecto (`1.4.0`) tiene una API para `shiny.express` que difiere sutilmente de la documentación más reciente y de otras versiones. La principal fuente de confusión fue cómo renderizar UI dinámica (plots, tablas, value boxes) en la interfaz.

*   **La Serie de Errores y Lecciones:**
    1.  `AttributeError: module 'shiny.express.ui' has no attribute 'output_*'`: Descubrimos que las funciones `output_ui`, `output_plot`, etc., no están disponibles directamente en el objeto `ui` de `shiny.express`.
    2.  `NameError: name 'mi_funcion' is not defined`: Ocurrió cuando intentamos llamar a una función de renderizado en la UI antes de que fuera definida en el script.
    3.  `TypeError: Renderer.__call__() missing ... argument: '_fn'`: Ocurrió cuando definimos las funciones de renderizado primero y luego las llamamos con paréntesis `()` en la UI. Esto se debe a que el decorador `@render` convierte la función en un objeto `Renderer` que no se puede llamar directamente.
    4.  `Duplicate output IDs were found`: Ocurrió cuando colocamos solo el nombre de la función (sin paréntesis) en la UI. Esto indica que Shiny intentaba renderizar el output dos veces: una automáticamente y otra por nuestra referencia explícita.

*   **La Solución Definitiva y Correcta:**
    La solución que finalmente funcionó fue una combinación precisa de los siguientes pasos:
    1.  **Importar desde `shiny.ui`**: Las funciones `output_*` (placeholders) deben importarse explícitamente desde el módulo `shiny.ui`.
        ```python
        from shiny.ui import output_ui, output_table, output_plot, output_text_verbatim
        ```
    2.  **Definir la UI con Placeholders**: En la sección de la UI, se debe usar la función `output_*` correspondiente, pasando como un string el **nombre** de la función de renderizado que se definirá más adelante.
        ```python
        output_plot("plot_descriptivo")
        ```
    3.  **Definir el Servidor y las Funciones `@render`**: Después de la UI, en la lógica del servidor, se definen las funciones de renderizado con el decorador `@render` y el nombre que coincide con el string usado en el placeholder.
        ```python
        @render.plot
        def plot_descriptivo():
            # ... lógica del gráfico ...
        ```
    Este patrón (UI con placeholders de string -> Servidor con funciones @render coincidentes) es el correcto para esta versión de Shiny.

## 3. Configuración y Dependencias

*   `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.js`

## 4. Estructura de la Aplicación (`app`)

*   `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
*   `app/projects/`: Contiene las subpáginas de cada proyecto.

## 5. Componentes Reutilizables (`components`)

*   `components/*.tsx`: Secciones principales de la página.
*   `components/ui/*.tsx`: Bloques de construcción básicos de la interfaz.

## 6. Activos Públicos (`public`)

*   `public/documents/`, `public/icons/technologies/`, `public/*.png`

## 7. Resumen del Proyecto

*   **`gemini.md`**: Proporciona un resumen completo del estado actual del proyecto. Es de lectura obligatoria.

## 8. Registro de Trabajo

*   **Inicio de Trabajo:** domingo, 28 de septiembre de 2025, 10:00 AM
*   **Fin de Trabajo:** domingo, 28 de septiembre de 2025, 14:00 PM
*   **Resumen:** Se integró el dashboard de mortalidad en el portafolio. El proceso implicó una depuración exhaustiva de la aplicación Shiny Express para hacerla compatible con el entorno del proyecto. Se corrigieron errores de compilación en Next.js y se limpiaron archivos obsoletos. La sesión concluyó con la documentación detallada del proceso de depuración para referencia futura.
