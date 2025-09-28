import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
from shiny.express import ui, render
from statsmodels.tsa.arima.model import ARIMA

# =========================
# Cargar datos y preparación
# =========================
csv_path = "./036ei5wg8bzm6bfnggh2.csv"
try:
    df = pd.read_csv(csv_path, encoding='utf-8')
    df = df.drop(columns=["diagnostico1", "total"], errors='ignore')
    
    df_agrupado = df.groupby(['gru_edad', 'sexo', 'ano', 'nombre_enfermedad'], as_index=False)['n'].sum()
    
    # Procesamiento para estadísticas y gráficos
    total_casos_val = df['n'].sum()
    total_enfermedades_val = df['nombre_enfermedad'].nunique()
    periodo_val = f"{df['ano'].min()} - {df['ano'].max()}"
    anios_unicos_val = df['ano'].nunique()
    
    casos_por_ano = df.groupby('ano')['n'].sum()
    tendencia_casos = ((casos_por_ano.iloc[-1] - casos_por_ano.iloc[0]) / casos_por_ano.iloc[0] * 100) if len(casos_por_ano) > 0 else 0
    enfermedad_mas_comun = df_agrupado.groupby('nombre_enfermedad')['n'].sum().idxmax() if not df_agrupado.empty else "N/A"
    grupo_edad_mas_afectado = df_agrupado.groupby('gru_edad')['n'].sum().idxmax() if not df_agrupado.empty else "N/A"
    
    resumen_sg = df.groupby(["gru_edad", "sexo"]).size().reset_index(name="Cantidad").pivot(index="gru_edad", columns="sexo", values="Cantidad").fillna(0).reset_index()

except FileNotFoundError:
    ui.page_fluid(
        ui.div("Error: El archivo CSV no se encontró. Por favor, asegúrate de que '036ei5wg8bzm6bfnggh2.csv' esté en la misma carpeta.", style="color: red; font-size: 1.5rem; text-align: center; padding: 50px;")
    )
    raise
except Exception as e:
    ui.page_fluid(
        ui.div(f"Error al procesar el archivo CSV: {str(e)}", style="color: red; font-size: 1.5rem; text-align: center; padding: 50px;")
    )
    raise

# =========================
# UI with Shiny Express
# =========================
ui.tags.head(
    ui.tags.style("""
        :root {
            --primary: #2c3e50; --secondary: #34495e; --accent1: #1abc9c; --accent2: #3498db; --accent3: #9b59b6; --accent4: #e67e22; --accent5: #e74c3c; --light: #ecf0f1; --dark: #2c3e50; --text: #2c3e50; --text-light: #7f8c8d;
        }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; color: var(--text); line-height: 1.6; }
        .main-container { max-width: 1400px; margin: 0 auto; padding: 0 15px; }
        .main-title { text-align: center; color: var(--primary); margin: 20px 0 10px; font-size: 2.5rem; font-weight: 700; background: linear-gradient(135deg, var(--accent1), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 10px; }
        .subtitle { text-align: center; color: var(--text-light); margin-bottom: 30px; font-size: 1.1rem; max-width: 900px; margin-left: auto; margin-right: auto; }
        .nav-tabs { background-color: var(--primary); border-radius: 12px; padding: 12px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .nav-tabs > li > a { color: white !important; font-size: 16px; padding: 14px 24px; margin: 6px; border-radius: 8px; transition: all 0.3s ease; font-weight: 600; }
        .nav-tabs > li:nth-child(1) > a { background-color: var(--accent1); }
        .nav-tabs > li:nth-child(2) > a { background-color: var(--accent2); }
        .nav-tabs > li:nth-child(3) > a { background-color: var(--accent3); }
        .nav-tabs > li:nth-child(4) > a { background-color: var(--accent4); }
        .nav-tabs > li:nth-child(5) > a { background-color: var(--accent5); }
        .nav-tabs > li.active > a { background-color: #000000 !important; color: white !important; }
        .nav-tabs > li > a:hover { transform: translateY(-3px); box-shadow: 0 6px 12px rgba(0,0,0,0.15); text-decoration: none; }
        .content-panel { padding: 25px; border-radius: 12px; background-color: white; margin: 15px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.05); border: none; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .content-panel:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
        .section-header { color: var(--secondary); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 3px solid var(--accent2); font-size: 1.5rem; font-weight: 600; display: flex; align-items: center; }
        .section-header i { margin-right: 10px; font-size: 1.3rem; }
        .stat-card { text-align: center; padding: 30px 20px !important; border-radius: 12px; background: linear-gradient(135deg, var(--accent2), var(--accent1)) !important; color: white; box-shadow: 0 6px 12px rgba(0,0,0,0.15); min-height: 140px; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: all 0.3s ease; }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 16px rgba(0,0,0,0.2); }
        .stat-number { font-size: 2.8rem !important; font-weight: 800; margin-bottom: 10px; text-shadow: 1px 1px 3px rgba(0,0,0,0.2); }
        .stat-label { font-size: 1.2rem !important; opacity: 0.95; margin: 0; font-weight: 600; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 0; }
        .info-list { list-style-type: none; padding-left: 0; }
        .info-list li { padding: 12px 18px; margin-bottom: 12px; background-color: var(--light); border-radius: 8px; border-left: 4px solid var(--accent1); font-size: 1.05rem; }
        .data-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .data-table th { background-color: var(--accent2); color: white; padding: 14px; text-align: left; font-size: 1.1rem; }
        .data-table td { padding: 12px 14px; border-bottom: 1px solid #ddd; font-size: 1.05rem; }
        .data-table tr:nth-child(even) { background-color: #f9f9f9; }
        .data-table tr:hover { background-color: #f1f1f1; }
        .plot-container { min-height: 400px; display: flex; align-items: center; justify-content: center; }
        .footer { text-align: center; margin-top: 40px; padding: 25px; color: var(--text-light); font-size: 0.95rem; border-top: 1px solid #ddd; background-color: var(--light); border-radius: 8px; }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .stat-number { font-size: 2.4rem !important; } .stat-label { font-size: 1.1rem !important; } }
        @media (max-width: 768px) { .main-title { font-size: 2rem; } .nav-tabs > li > a { padding: 12px 20px; font-size: 14px; } .stats-grid { grid-template-columns: 1fr; } .stat-card { padding: 25px 15px !important; min-height: 120px; } .stat-number { font-size: 2.2rem !important; } .content-panel { padding: 20px; } }
        @media (max-width: 480px) { .stat-number { font-size: 2rem !important; } .stat-label { font-size: 1rem !important; } }
    """)
)

ui.div(
    ui.h1("📊 Dashboard de Análisis de Mortalidad - Chile 1997-2019", class_="main-title"),
    ui.p("Exploración integral de datos de mortalidad en Chile entre 1997 y 2019.", class_="subtitle"),
    
    ui.nav_panel("🏠 Inicio",
        ui.div(
            ui.h4("📈 Resumen Ejecutivo", class_="section-header"),
            ui.div(
                ui.layout_columns(
                    ui.value_box(
                        "Total de Casos",
                        ui.div(f"{total_casos_val:,}".replace(",", "."), style="font-size: 2.8rem; font-weight: bold;"),
                        style="background-color: var(--accent1); color: white;",
                        full_screen=True
                    ),
                    ui.value_box(
                        "Enfermedades Únicas",
                        ui.div(str(total_enfermedades_val), style="font-size: 2.8rem; font-weight: bold;"),
                        style="background-color: var(--accent2); color: white;",
                        full_screen=True
                    ),
                    ui.value_box(
                        "Período Analizado",
                        ui.div(periodo_val, style="font-size: 2.8rem; font-weight: bold;"),
                        style="background-color: var(--accent3); color: white;",
                        full_screen=True
                    ),
                    ui.value_box(
                        "Años de Datos",
                        ui.div(str(anios_unicos_val), style="font-size: 2.8rem; font-weight: bold;"),
                        style="background-color: var(--accent4); color: white;",
                        full_screen=True
                    ),
                    col_widths={"sm": 6, "md": 3, "lg": 3},
                )
            ),
            class_="content-panel"
        ),
        ui.layout_columns(
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
            ),
            ui.div(
                ui.h4("🔍 Clasificación de Variables", class_="section-header"),
                ui.tags.ul(
                    ui.tags.li(f"Variables categóricas: gru_edad ({df['gru_edad'].nunique()} grupos), sexo ({df['sexo'].nunique()}), nombre_enfermedad ({df['nombre_enfermedad'].nunique()})."),
                    ui.tags.li(f"Variables numéricas: ano ({df['ano'].nunique()} años), n (casos)."),
                    class_="info-list"
                ),
                class_="content-panel"
            ),
            col_widths={"sm": 12, "md": 6, "lg": 6},
            gap="20px"
        ),
        ui.div(
            ui.h4("📋 Resumen por Sexo y Grupo Etario", class_="section-header"),
            ui.output_table("resumen_inicio"),
            class_="content-panel"
        ),
    ),
    
    ui.nav_panel("📊 Descriptivo",
        ui.div(
            ui.h3("🔹 Estadísticas Descriptivas", class_="section-header"),
            ui.layout_columns(
                ui.div(
                    ui.input_select("variable_descriptiva", "Seleccione variable:", ["sexo", "gru_edad", "nombre_enfermedad"]),
                    ui.output_plot("plot_descriptivo"),
                    class_="content-panel"
                )
            )
        ),
    ),
    
    ui.nav_panel("🔍 Diagnóstico",
        ui.div(
            ui.h3("🔹 Estadísticas Diagnósticas", class_="section-header"),
            ui.layout_columns(
                ui.div(
                    ui.input_select("variable_diagnostico", "Seleccione variable:", ["sexo", "gru_edad", "nombre_enfermedad"]),
                    ui.output_plot("plot_diagnostico"),
                    class_="content-panel"
                )
            )
        ),
    ),
    
    ui.nav_panel("🔮 Predictivo",
        ui.div(
            ui.h3("🔹 Estadísticas Predictivas", class_="section-header"),
            ui.layout_columns(
                ui.div(
                    ui.input_select("variable_predictiva", "Seleccione variable:", ["total_casos", "por_enfermedad", "por_grupo_edad"]),
                    ui.output_plot("plot_predictivo"),
                    class_="content-panel"
                )
            )
        ),
    ),
    
    ui.nav_panel("💡 Prescriptivo",
        ui.div(
            ui.h3("🔹 Estadísticas Prescriptivas", class_="section-header"),
            ui.layout_columns(
                ui.div(
                    ui.input_select("variable_prescriptiva", "Seleccione variable:", ["recomendaciones_generales", "por_grupo_edad", "por_enfermedad"]),
                    ui.output_plot("plot_prescriptivo"),
                    class_="content-panel"
                )
            )
        ),
    ),
    id="nav_tabs",
    class_="main-container"
)

ui.div(
    ui.tags.p(f"© 2024 - Dashboard de Análisis de Mortalidad Chile - Datos: 1997-2019"),
    class_="footer"
),

# Lógica del servidor con Shiny Express
# =========================
@render.table
def resumen_inicio():
    tabla_resumen = resumen_sg.copy()
    for col in tabla_resumen.columns:
        if col != "gru_edad":
            tabla_resumen[col] = tabla_resumen[col].apply(lambda x: f"{int(x):,}".replace(",", "."))
    return tabla_resumen

@render.plot
def plot_descriptivo():
    fig, ax = plt.subplots(figsize=(10, 6))
    if ui.input.variable_descriptiva() == "sexo":
        sns.countplot(data=df, x="sexo", ax=ax, palette='Set2')
        ax.set_title("Distribución de Casos por Sexo", fontsize=16)
        ax.set_xlabel("Sexo", fontsize=12)
        ax.set_ylabel("Número de Casos", fontsize=12)
    elif ui.input.variable_descriptiva() == "gru_edad":
        sns.countplot(data=df, x="gru_edad", ax=ax, palette='viridis')
        ax.set_title("Distribución de Casos por Grupo de Edad", fontsize=16)
        ax.set_xlabel("Grupo de Edad", fontsize=12)
        ax.set_ylabel("Número de Casos", fontsize=12)
        plt.xticks(rotation=45)
    else:
        top_10 = df_agrupado.groupby("nombre_enfermedad")["n"].sum().nlargest(10)
        sns.barplot(x=top_10.values, y=top_10.index, ax=ax, palette='cubehelix')
        ax.set_title("Top 10 Enfermedades más Comunes", fontsize=16)
        ax.set_xlabel("Número de Casos", fontsize=12)
        ax.set_ylabel("Enfermedad", fontsize=12)
    plt.tight_layout()
    return fig

@render.plot
def plot_diagnostico():
    fig, ax = plt.subplots(figsize=(10, 6))
    if ui.input.variable_diagnostico() == "sexo":
        sns.boxplot(data=df, x="sexo", y="n", ax=ax, palette='pastel')
        ax.set_title("Distribución de Casos por Sexo", fontsize=16)
    elif ui.input.variable_diagnostico() == "gru_edad":
        sns.boxplot(data=df, x="gru_edad", y="n", ax=ax, palette='YlOrBr')
        ax.set_title("Distribución de Casos por Grupo de Edad", fontsize=16)
        plt.xticks(rotation=45)
    else:
        top_10 = df_agrupado.groupby("nombre_enfermedad")["n"].sum().nlargest(10).index
        data_plot = df[df["nombre_enfermedad"].isin(top_10)]
        sns.boxplot(data=data_plot, x="nombre_enfermedad", y="n", ax=ax, palette='Blues')
        ax.set_title("Distribución de Casos para Top 10 Enfermedades", fontsize=16)
        plt.xticks(rotation=90)
    plt.tight_layout()
    return fig

@render.plot
def plot_predictivo():
    fig, ax = plt.subplots(figsize=(10, 6))
    
    if ui.input.variable_predictiva() == "total_casos":
        casos_anuales = df.groupby("ano")["n"].sum().reset_index()
        casos_anuales = casos_anuales.set_index('ano')
        try:
            model = ARIMA(casos_anuales['n'], order=(1,1,1))
            results = model.fit()
            forecast = results.forecast(steps=5)
            plt.plot(casos_anuales.index, casos_anuales.values, label='Histórico', color='blue', marker='o')
            plt.plot(range(casos_anuales.index[-1]+1, casos_anuales.index[-1]+6), forecast, label='Predicción', linestyle='--', color='red', marker='x')
            plt.title("Predicción de Casos Totales (Próximos 5 años)", fontsize=16)
            plt.legend()
        except Exception as e:
            ax.text(0.5, 0.5, f"No se pudo generar el modelo de predicción: {e}", ha='center', va='center', fontsize=12, color='red')
            ax.set_visible(False)
            
    elif ui.input.variable_predictiva() == "por_enfermedad":
        top_enfermedad = df_agrupado.groupby("nombre_enfermedad")["n"].sum().nlargest(1).index[0]
        casos_enfermedad = df[df["nombre_enfermedad"] == top_enfermedad].groupby("ano")["n"].sum().reset_index()
        casos_enfermedad = casos_enfermedad.set_index('ano')
        try:
            model = ARIMA(casos_enfermedad['n'], order=(1,1,1))
            results = model.fit()
            forecast = results.forecast(steps=5)
            plt.plot(casos_enfermedad.index, casos_enfermedad.values, label='Histórico', color='blue', marker='o')
            plt.plot(range(casos_enfermedad.index[-1]+1, casos_enfermedad.index[-1]+6), forecast, label='Predicción', linestyle='--', color='red', marker='x')
            plt.title(f"Predicción de Casos para {top_enfermedad} (Próximos 5 años)", fontsize=16)
            plt.legend()
        except Exception as e:
            ax.text(0.5, 0.5, f"No se pudo generar el modelo de predicción: {e}", ha='center', va='center', fontsize=12, color='red')
            ax.set_visible(False)
            
    else: # por_grupo_edad
        top_grupo = df_agrupado.groupby("gru_edad")["n"].sum().nlargest(1).index[0]
        casos_grupo = df[df["gru_edad"] == top_grupo].groupby("ano")["n"].sum().reset_index()
        casos_grupo = casos_grupo.set_index('ano')
        try:
            model = ARIMA(casos_grupo['n'], order=(1,1,1))
            results = model.fit()
            forecast = results.forecast(steps=5)
            plt.plot(casos_grupo.index, casos_grupo.values, label='Histórico', color='blue', marker='o')
            plt.plot(range(casos_grupo.index[-1]+1, casos_grupo.index[-1]+6), forecast, label='Predicción', linestyle='--', color='red', marker='x')
            plt.title(f"Predicción de Casos para Grupo de Edad {top_grupo} (Próximos 5 años)", fontsize=16)
            plt.legend()
        except Exception as e:
            ax.text(0.5, 0.5, f"No se pudo generar el modelo de predicción: {e}", ha='center', va='center', fontsize=12, color='red')
            ax.set_visible(False)
            
    plt.tight_layout()
    return fig

@render.plot
def plot_prescriptivo():
    fig, ax = plt.subplots(figsize=(10, 6))
    if ui.input.variable_prescriptiva() == "recomendaciones_generales":
        tendencias = df.groupby("ano")["n"].sum()
        ax.plot(tendencias.index, tendencias.values, color='#e67e22', marker='o')
        ax.set_title("Tendencia Anual de Casos Totales", fontsize=16)
        ax.set_xlabel("Año", fontsize=12)
        ax.set_ylabel("Número de Casos", fontsize=12)
        ax.grid(axis='y', alpha=0.3, linestyle='--')
    elif ui.input.variable_prescriptiva() == "por_grupo_edad":
        grupos_riesgo = df.groupby("gru_edad")["n"].sum().sort_values(ascending=False).nlargest(10)
        sns.barplot(x=grupos_riesgo.index, y=grupos_riesgo.values, ax=ax, palette='Purples')
        ax.set_title("Top 10 Grupos de Edad en Riesgo (total de casos)", fontsize=16)
        ax.set_xlabel("Grupo de Edad", fontsize=12)
        ax.set_ylabel("Número de Casos", fontsize=12)
        plt.xticks(rotation=45)
    else:
        enfermedades_criticas = df.groupby("nombre_enfermedad")["n"].sum().nlargest(5)
        sns.barplot(x=enfermedades_criticas.values, y=enfermedades_criticas.index, ax=ax, palette='Reds')
        ax.set_title("Top 5 Enfermedades Críticas para Intervención", fontsize=16)
        ax.set_xlabel("Número de Casos", fontsize=12)
        ax.set_ylabel("Enfermedad", fontsize=12)
    plt.tight_layout()
    return fig