import pandas as pd
from shiny import App, ui, render
import matplotlib.pyplot as plt
import numpy as np

# =========================
# Cargar datos
# =========================
df = pd.read_csv("./036ei5wg8bzm6bfnggh2.csv")
df = df.drop(columns=["diagnostico1", "total"])  # Eliminamos columnas que no usaremos
df_agrupado = df.groupby(['gru_edad', 'sexo', 'ano', 'nombre_enfermedad'], as_index=False)['n'].sum()
df = df.sort_values(by=['gru_edad', 'sexo'])
df_agrupado = df_agrupado.sort_values(by='n', ascending=False)

# Procesamiento adicional para estadísticas
total_casos_val = df['n'].sum()
total_enfermedades_val = df['nombre_enfermedad'].nunique()
periodo_val = f"{df['ano'].min()} - {df['ano'].max()}"
anios_unicos_val = df['ano'].nunique()

# =========================
# UI
# =========================
app_ui = ui.page_fluid(
    ui.tags.head(
        ui.tags.style("""
            :root {
                --primary: #2c3e50;
                --secondary: #34495e;
                --accent1: #1abc9c;
                --accent2: #3498db;
                --accent3: #9b59b6;
                --accent4: #e67e22;
                --accent5: #e74c3c;
                --light: #ecf0f1;
                --dark: #2c3e50;
                --text: #2c3e50;
                --text-light: #7f8c8d;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f8f9fa;
                color: var(--text);
                line-height: 1.6;
            }
            
            .main-container {
                max-width: 1400px;
                margin: 0 auto;
                padding: 0 15px;
            }
            
            .main-title {
                text-align: center;
                color: var(--primary);
                margin: 20px 0 10px;
                font-size: 2.5rem;
                font-weight: 700;
                background: linear-gradient(135deg, var(--accent1), var(--accent2));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                padding: 10px;
            }
            
            .subtitle {
                text-align: center;
                color: var(--text-light);
                margin-bottom: 30px;
                font-size: 1.1rem;
                max-width: 900px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .nav-tabs {
                background-color: var(--primary);
                border-radius: 12px;
                padding: 12px;
                margin-bottom: 25px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .nav-tabs > li > a {
                color: white !important;
                font-size: 16px;
                padding: 14px 24px;
                margin: 6px;
                border-radius: 8px;
                transition: all 0.3s ease;
                font-weight: 600;
            }
            
            .nav-tabs > li:nth-child(1) > a { background-color: var(--accent1); }
            .nav-tabs > li:nth-child(2) > a { background-color: var(--accent2); }
            .nav-tabs > li:nth-child(3) > a { background-color: var(--accent3); }
            .nav-tabs > li:nth-child(4) > a { background-color: var(--accent4); }
            .nav-tabs > li:nth-child(5) > a { background-color: var(--accent5); }
            
            /* SOLO CAMBIO: Cuadro seleccionado en negro */
            .nav-tabs > li.active > a {
                background-color: #000000 !important;
                color: white !important;
            }
            
            .nav-tabs > li > a:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 12px rgba(0,0,0,0.15);
                text-decoration: none;
            }
            
            .content-panel {
                padding: 25px;
                border-radius: 12px;
                background-color: white;
                margin: 15px 0;
                box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                border: none;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .content-panel:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            }
            
            .section-header {
                color: var(--secondary);
                margin-bottom: 20px;
                padding-bottom: 12px;
                border-bottom: 3px solid var(--accent2);
                font-size: 1.5rem;
                font-weight: 600;
                display: flex;
                align-items: center;
            }
            
            .section-header i {
                margin-right: 10px;
                font-size: 1.3rem;
            }
            
            /* STAT CARDS MEJORADAS */
            .stat-card {
                text-align: center;
                padding: 30px 20px !important;
                border-radius: 12px;
                background: linear-gradient(135deg, var(--accent2), var(--accent1)) !important;
                color: white;
                box-shadow: 0 6px 12px rgba(0,0,0,0.15);
                min-height: 140px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: all 0.3s ease;
            }
            
            .stat-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            }
            
            .stat-number {
                font-size: 2.8rem !important;
                font-weight: 800;
                margin-bottom: 10px;
                text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
            }
            
            .stat-label {
                font-size: 1.2rem !important;
                opacity: 0.95;
                margin: 0;
                font-weight: 600;
            }
            
            /* Contenedor para stats */
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 0;
            }
            
            .info-list {
                list-style-type: none;
                padding-left: 0;
            }
            
            .info-list li {
                padding: 12px 18px;
                margin-bottom: 12px;
                background-color: var(--light);
                border-radius: 8px;
                border-left: 4px solid var(--accent1);
                font-size: 1.05rem;
            }
            
            .data-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
            }
            
            .data-table th {
                background-color: var(--accent2);
                color: white;
                padding: 14px;
                text-align: left;
                font-size: 1.1rem;
            }
            
            .data-table td {
                padding: 12px 14px;
                border-bottom: 1px solid #ddd;
                font-size: 1.05rem;
            }
            
            .data-table tr:nth-child(even) {
                background-color: #f9f9f9;
            }
            
            .data-table tr:hover {
                background-color: #f1f1f1;
            }
            
            /* Mejoras para gráficos */
            .plot-container {
                min-height: 400px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .footer {
                text-align: center;
                margin-top: 40px;
                padding: 25px;
                color: var(--text-light);
                font-size: 0.95rem;
                border-top: 1px solid #ddd;
                background-color: var(--light);
                border-radius: 8px;
            }
            
            @media (max-width: 1024px) {
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .stat-number {
                    font-size: 2.4rem !important;
                }
                
                .stat-label {
                    font-size: 1.1rem !important;
                }
            }
            
            @media (max-width: 768px) {
                .main-title {
                    font-size: 2rem;
                }
                
                .nav-tabs > li > a {
                    padding: 12px 20px;
                    font-size: 14px;
                }
                
                .stats-grid {
                    grid-template-columns: 1fr;
                }
                
                .stat-card {
                    padding: 25px 15px !important;
                    min-height: 120px;
                }
                
                .stat-number {
                    font-size: 2.2rem !important;
                }
                
                .content-panel {
                    padding: 20px;
                }
            }
            
            @media (max-width: 480px) {
                .stat-number {
                    font-size: 2rem !important;
                }
                
                .stat-label {
                    font-size: 1rem !important;
                }
            }
        """)
    ),

    ui.div(
        ui.h1("📊 Dashboard de Análisis de Mortalidad - Chile 1997-2019", class_="main-title"),
        ui.p(
            "Exploración integral de datos de mortalidad en Chile entre 1997 y 2019. "
            "Analice tendencias, distribuciones por sexo y grupo etario, y descubra insights "
            "a través de análisis estadísticos descriptivos, diagnósticos, predictivos y prescriptivos.",
            class_="subtitle"
        ),
        
        ui.navset_tab(
            ui.nav_panel(
                "🏠 Inicio",
                ui.div(
                    ui.h4("📈 Resumen Ejecutivo", class_="section-header"),
                    ui.div(
                        ui.layout_columns(
                            ui.column(12, ui.div(
                                ui.div(
                                    ui.div(ui.h4(ui.output_text("total_casos"), class_="stat-number"), ui.p("Total de casos", class_="stat-label"), class_="stat-card"),
                                    ui.div(ui.h4(ui.output_text("total_enfermedades"), class_="stat-number"), ui.p("Enfermedades únicas", class_="stat-label"), class_="stat-card"),
                                    ui.div(ui.h4(ui.output_text("periodo_analizado"), class_="stat-number"), ui.p("Período analizado", class_="stat-label"), class_="stat-card"),
                                    ui.div(ui.h4(ui.output_text("total_anios"), class_="stat-number"), ui.p("Años de datos", class_="stat-label"), class_="stat-card"),
                                    class_="stats-grid"
                                )
                            ))
                        )
                    ),
                    class_="content-panel"
                ),
                
                ui.layout_columns(
                    ui.column(
                        6,
                        ui.div(
                            ui.h4("📋 Metadatos del Dataset", class_="section-header"),
                            ui.tags.ul(
                                ui.tags.li(ui.tags.strong("gru_edad"), " → Grupo etario (ej: '00-04', '05-09')"),
                                ui.tags.li(ui.tags.strong("sexo"), " → Sexo del paciente (Mujer, Hombre)"),
                                ui.tags.li(ui.tags.strong("ano"), " → Año de registro"),
                                ui.tags.li(ui.tags.strong("nombre_enfermedad"), " → Nombre de la enfermedad"),
                                ui.tags.li(ui.tags.strong("n"), " → Número de casos diagnosticados"),
                                class_="info-list"
                            ),
                            class_="content-panel"
                        )
                    ),
                    ui.column(
                        6,
                        ui.div(
                            ui.h4("🔍 Clasificación de Variables", class_="section-header"),
                            ui.tags.ul(
                                ui.tags.li(ui.output_text("vars_categoricas")),
                                ui.tags.li(ui.output_text("vars_numericas")),
                                class_="info-list"
                            ),
                            class_="content-panel"
                        )
                    ),
                    gap="20px"
                ),
                
                ui.layout_columns(
                    ui.column(
                        6,
                        ui.div(
                            ui.h4("📊 Distribución por Sexo", class_="section-header"),
                            ui.div(ui.output_plot("sexo_plot"), class_="plot-container"),
                            class_="content-panel"
                        )
                    ),
                    ui.column(
                        6,
                        ui.div(
                            ui.h4("👥 Distribución por Grupo Etario", class_="section-header"),
                            ui.div(ui.output_plot("edad_plot"), class_="plot-container"),
                            class_="content-panel"
                        )
                    ),
                    gap="20px"
                ),
                
                ui.div(
                    ui.h4("📋 Resumen por Sexo y Grupo Etario", class_="section-header"),
                    ui.output_table("resumen_inicio"),
                    class_="content-panel"
                ),
                value="inicio"
            ),
            ui.nav_panel("📊 Descriptivo", 
                ui.div(
                    ui.h3("🔹 Estadísticas Descriptivas", class_="section-header"),
                    ui.p("Aquí irán las estadísticas descriptivas..."),
                    class_="content-panel"
                ),
                value="descriptivo"
            ),
            ui.nav_panel("🔍 Diagnóstico", 
                ui.div(
                    ui.h3("🔹 Estadísticas Diagnósticas / Inferenciales", class_="section-header"),
                    ui.p("Aquí irán las estadísticas inferenciales..."),
                    class_="content-panel"
                ),
                value="diagnostico"
            ),
            ui.nav_panel("🔮 Predictivo", 
                ui.div(
                    ui.h3("🔹 Estadísticas Predictivas", class_="section-header"),
                    ui.p("Aquí irán las estadísticas predictivas..."),
                    class_="content-panel"
                ),
                value="predictivo"
            ),
            ui.nav_panel("💡 Prescriptivo", 
                ui.div(
                    ui.h3("🔹 Estadísticas Prescriptivas", class_="section-header"),
                    ui.p("Aquí irán las estadísticas prescriptivas..."),
                    class_="content-panel"
                ),
                value="prescriptivo"
            ),
            id="nav_tabs"
        ),
        
        ui.div(
            ui.tags.p(f"© 2024 - Dashboard de Análisis de Mortalidad Chile - Datos: 1997-2019"),
            class_="footer"
        ),
        class_="main-container"
    )
)

# =========================
# Servidor
# =========================
def server(input, output, session):
    @output
    @render.text
    def total_casos():
        return f"{total_casos_val:,}".replace(",", ".")
    
    @output
    @render.text
    def total_enfermedades():
        return str(total_enfermedades_val)
    
    @output
    @render.text
    def periodo_analizado():
        return periodo_val
    
    @output
    @render.text
    def total_anios():
        return str(anios_unicos_val)
    
    @output
    @render.table
    def resumen_inicio():
        tabla = (
            df.groupby(["gru_edad", "sexo"])
            .size()
            .reset_index(name="Cantidad")
            .pivot(index="gru_edad", columns="sexo", values="Cantidad")
            .fillna(0)
            .reset_index()
        )
        # Formatear números con separadores de miles
        for col in tabla.columns:
            if col != "gru_edad":
                tabla[col] = tabla[col].apply(lambda x: f"{int(x):,}".replace(",", "."))
        return tabla
    
    @output
    @render.text
    def vars_categoricas():
        return f"Variables categóricas: gru_edad ({df['gru_edad'].nunique()} grupos), sexo ({df['sexo'].nunique()}), nombre_enfermedad ({df['nombre_enfermedad'].nunique()})."
    
    @output
    @render.text
    def vars_numericas():
        return f"Variables numéricas: ano ({df['ano'].nunique()} años), n (casos)."
    
    @output
    @render.plot
    def sexo_plot():
        sexo_counts = df['sexo'].value_counts()
        fig, ax = plt.subplots(figsize=(10, 8))  # Tamaño aumentado
        
        colors = ['#3498db', '#e74c3c']
        wedges, texts, autotexts = ax.pie(sexo_counts.values, labels=sexo_counts.index, autopct='%1.1f%%',
                                        colors=colors, startangle=90, textprops={'fontsize': 14})
        
        # Mejorar el estilo de los textos
        for autotext in autotexts:
            autotext.set_color('white')
            autotext.set_fontweight('bold')
            autotext.set_fontsize(14)
        
        for text in texts:
            text.set_fontsize(14)
            text.set_fontweight('bold')
        
        ax.set_title('Distribución por Sexo', fontsize=18, fontweight='bold', pad=25)
        ax.axis('equal')
        plt.tight_layout()
        return fig
    
    @output
    @render.plot
    def edad_plot():
        edad_counts = df['gru_edad'].value_counts().sort_index()
        fig, ax = plt.subplots(figsize=(14, 8))  # Tamaño aumentado
        bars = ax.bar(edad_counts.index, edad_counts.values, color='#1abc9c', alpha=0.8, edgecolor='white', linewidth=1)
        
        # Añadir valores en las barras
        for bar in bars:
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height + max(edad_counts.values)*0.01,
                    f'{int(height):,}'.replace(",", "."),
                    ha='center', va='bottom', fontsize=12, fontweight='bold')
        
        ax.set_title('Distribución por Grupo Etario', fontsize=18, fontweight='bold', pad=25)
        ax.set_xlabel('Grupo Etario', fontsize=14, fontweight='bold')
        ax.set_ylabel('Número de Casos', fontsize=14, fontweight='bold')
        ax.tick_params(axis='x', rotation=45, labelsize=12)
        ax.tick_params(axis='y', labelsize=12)
        ax.grid(axis='y', alpha=0.3, linestyle='--')
        plt.tight_layout()
        return fig

# =========================
# Ejecutar app
# =========================
app = App(app_ui, server)

if __name__ == "__main__":
    app.run()