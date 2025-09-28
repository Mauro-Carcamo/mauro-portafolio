import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.arima.model import ARIMA
from scipy import stats
import plotly.graph_objects as go
import plotly.express as px
from shiny import App, ui, render, reactive
import os

# =========================
# Cargar datos
# =========================
# Verificar si el archivo existe
csv_path = "./036ei5wg8bzm6bfnggh2.csv"
if not os.path.exists(csv_path):
    print(f"Error: Archivo {csv_path} no encontrado.")
    raise FileNotFoundError(f"El archivo {csv_path} no existe. Por favor, verifica la ruta.")

try:
    df = pd.read_csv(csv_path, encoding='utf-8')
    df = df.drop(columns=["diagnostico1", "total"], errors='ignore')
    df_agrupado = df.groupby(['gru_edad', 'sexo', 'ano', 'nombre_enfermedad'], as_index=False)['n'].sum()
    df = df.sort_values(by=['gru_edad', 'sexo'])
    df_agrupado = df_agrupado.sort_values(by='n', ascending=False)

    # Procesamiento adicional para estadísticas
    total_casos_val = df['n'].sum()
    total_enfermedades_val = df['nombre_enfermedad'].nunique()
    periodo_val = f"{df['ano'].min()} - {df['ano'].max()}"
    anios_unicos_val = df['ano'].nunique()

    # Estadísticas adicionales mejoradas
    casos_por_ano = df.groupby('ano')['n'].sum()
    tendencia_casos = ((casos_por_ano.iloc[-1] - casos_por_ano.iloc[0]) / casos_por_ano.iloc[0] * 100) if len(casos_por_ano) > 0 else 0
    enfermedad_mas_comun = df.groupby('nombre_enfermedad')['n'].sum().idxmax() if not df.empty else "N/A"
    casos_enfermedad_mas_comun = df.groupby('nombre_enfermedad')['n'].sum().max() if not df.empty else 0
    grupo_edad_mas_afectado = df.groupby('gru_edad')['n'].sum().idxmax() if not df.empty else "N/A"

except Exception as e:
    print(f"Error al procesar el archivo CSV: {str(e)}")
    raise

# =========================
# UI
# =========================
app_ui = ui.page_fluid(
    ui.tags.head(
        ui.tags.style("""
            .stat-number {
                font-size: 1.3rem !important;
                font-weight: 800;
                margin-bottom: 10px;
                text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
            }
            .stat-label {
                font-size: 0.9rem;
                color: #666;
                margin-bottom: 5px;
            }
            .main-title {
                color: #2c3e50;
                text-align: center;
                padding: 20px 0;
                margin-bottom: 30px;
                background: #ecf0f1;
                border-radius: 5px;
            }
            .subtitle {
                text-align: center;
                color: #7f8c8d;
                margin-bottom: 30px;
            }
            .main-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }
            @media (max-width: 768px) {
                .stat-number {
                    font-size: 1rem !important;
                }
            }
            @media (max-width: 480px) {
                .stat-number {
                    font-size: 0.9rem !important;
                }
                .stat-label {
                    font-size: 0.8rem !important;
                }
            }
        """)
    ),
    ui.div(
        ui.h1("📊 Análisis de Mortalidad - Chile 1997-2019", class_="main-title"),
        ui.p(
            "Dashboard interactivo de dataset mortalidad en Chile entre 1997 y 2019. "
            "Analice tendencias, distribuciones por sexo y grupo etario, y descubra insights "
            "a través de análisis estadísticos descriptivos, diagnósticos, predictivos y prescriptivos.",
            class_="subtitle"
        ),
        ui.navset_bar(
            ui.nav_item("🏠 Inicio",
                ui.div(
                    ui.row(
                        ui.column(3, 
                            ui.div(
                                ui.p(f"{total_casos_val:,}", class_="stat-number"),
                                ui.p("Total de casos", class_="stat-label"),
                                class_="stat-card"
                            )
                        ),
                        ui.column(3,
                            ui.div(
                                ui.p(f"{total_enfermedades_val:,}", class_="stat-number"),
                                ui.p("Total de enfermedades", class_="stat-label"),
                                class_="stat-card"
                            )
                        ),
                        ui.column(3,
                            ui.div(
                                ui.p(periodo_val, class_="stat-number"),
                                ui.p("Período", class_="stat-label"),
                                class_="stat-card"
                            )
                        ),
                        ui.column(3,
                            ui.div(
                                ui.p(f"{anios_unicos_val}", class_="stat-number"),
                                ui.p("Años únicos", class_="stat-label"),
                                class_="stat-card"
                            )
                        )
                    ),
                    ui.row(
                        ui.column(4,
                            ui.div(
                                ui.p(f"{tendencia_casos:.1f}%", class_="stat-number"),
                                ui.p("Tendencia de casos", class_="stat-label"),
                                class_="stat-card"
                            )
                        ),
                        ui.column(4,
                            ui.div(
                                ui.p(enfermedad_mas_comun, class_="stat-number"),
                                ui.p("Enfermedad más común", class_="stat-label"),
                                class_="stat-card"
                            )
                        ),
                        ui.column(4,
                            ui.div(
                                ui.p(grupo_edad_mas_afectado, class_="stat-number"),
                                ui.p("Grupo de edad más afectado", class_="stat-label"),
                                class_="stat-card"
                            )
                        )
                    )
                )
            ),
            ui.nav_item("📊 Descriptivo",
                ui.input_select("variable_descriptiva", "Seleccione variable:", 
                              ["sexo", "gru_edad", "nombre_enfermedad"]),
                ui.output_plot("plot_descriptivo")
            ),
            ui.nav_item("🔍 Diagnóstico",
                ui.input_select("variable_diagnostico", "Seleccione variable:", 
                              ["sexo", "gru_edad", "nombre_enfermedad"]),
                ui.output_plot("plot_diagnostico")
            ),
            ui.nav_item("📈 Predictivo",
                ui.input_select("variable_predictiva", "Seleccione variable:", 
                              ["total_casos", "por_enfermedad", "por_grupo_edad"]),
                ui.output_plot("plot_predictivo")
            ),
            ui.nav_item("💡 Prescriptivo",
                ui.input_select("variable_prescriptiva", "Seleccione variable:", 
                              ["recomendaciones_generales", "por_grupo_edad", "por_enfermedad"]),
                ui.output_plot("plot_prescriptivo")
            )
        ),
        class_="main-container"
    )
)

# =========================
# Server
# =========================
def server(input, output, session):
    @output
    @render.plot
    def plot_descriptivo():
        fig, ax = plt.subplots(figsize=(10, 6))
        if input.variable_descriptiva() == "sexo":
            sns.countplot(data=df, x="sexo", ax=ax)
            ax.set_title("Distribución por Sexo")
        elif input.variable_descriptiva() == "gru_edad":
            sns.countplot(data=df, x="gru_edad", ax=ax)
            ax.set_title("Distribución por Grupo de Edad")
            plt.xticks(rotation=45)
        else:
            top_10 = df_agrupado.groupby("nombre_enfermedad")["n"].sum().nlargest(10)
            sns.barplot(x=top_10.values, y=top_10.index, ax=ax)
            ax.set_title("Top 10 Enfermedades más Comunes")
        return fig

    @output
    @render.plot
    def plot_diagnostico():
        fig, ax = plt.subplots(figsize=(10, 6))
        if input.variable_diagnostico() == "sexo":
            sns.boxplot(data=df, x="sexo", y="n", ax=ax)
            ax.set_title("Distribución de Casos por Sexo")
        elif input.variable_diagnostico() == "gru_edad":
            sns.boxplot(data=df, x="gru_edad", y="n", ax=ax)
            ax.set_title("Distribución de Casos por Grupo de Edad")
            plt.xticks(rotation=45)
        else:
            top_10 = df_agrupado.groupby("nombre_enfermedad")["n"].sum().nlargest(10)
            sns.boxplot(data=df[df["nombre_enfermedad"].isin(top_10.index)], 
                       x="nombre_enfermedad", y="n", ax=ax)
            ax.set_title("Distribución de Casos para Top 10 Enfermedades")
            plt.xticks(rotation=45)
        return fig

    @output
    @render.plot
    def plot_predictivo():
        fig, ax = plt.subplots(figsize=(10, 6))
        if input.variable_predictiva() == "total_casos":
            casos_anuales = df.groupby("ano")["n"].sum()
            model = ARIMA(casos_anuales, order=(1,1,1))
            results = model.fit()
            forecast = results.forecast(steps=5)
            
            plt.plot(casos_anuales.index, casos_anuales.values, label='Histórico')
            plt.plot(range(casos_anuales.index[-1]+1, casos_anuales.index[-1]+6), 
                    forecast, label='Predicción', linestyle='--')
            plt.title("Predicción de Casos Totales")
            plt.legend()
        elif input.variable_predictiva() == "por_enfermedad":
            top_enfermedad = df_agrupado.groupby("nombre_enfermedad")["n"].sum().nlargest(1).index[0]
            casos_enfermedad = df[df["nombre_enfermedad"]==top_enfermedad].groupby("ano")["n"].sum()
            
            model = ARIMA(casos_enfermedad, order=(1,1,1))
            results = model.fit()
            forecast = results.forecast(steps=5)
            
            plt.plot(casos_enfermedad.index, casos_enfermedad.values, label='Histórico')
            plt.plot(range(casos_enfermedad.index[-1]+1, casos_enfermedad.index[-1]+6), 
                    forecast, label='Predicción', linestyle='--')
            plt.title(f"Predicción de Casos para {top_enfermedad}")
            plt.legend()
        else:
            top_grupo = df_agrupado.groupby("gru_edad")["n"].sum().nlargest(1).index[0]
            casos_grupo = df[df["gru_edad"]==top_grupo].groupby("ano")["n"].sum()
            
            model = ARIMA(casos_grupo, order=(1,1,1))
            results = model.fit()
            forecast = results.forecast(steps=5)
            
            plt.plot(casos_grupo.index, casos_grupo.values, label='Histórico')
            plt.plot(range(casos_grupo.index[-1]+1, casos_grupo.index[-1]+6), 
                    forecast, label='Predicción', linestyle='--')
            plt.title(f"Predicción de Casos para Grupo de Edad {top_grupo}")
            plt.legend()
        return fig

    @output
    @render.plot
    def plot_prescriptivo():
        fig, ax = plt.subplots(figsize=(10, 6))
        if input.variable_prescriptiva() == "recomendaciones_generales":
            tendencias = df.groupby("ano")["n"].sum().pct_change()
            plt.plot(tendencias.index, tendencias.values)
            plt.title("Tendencia Anual de Cambio en Casos")
            plt.axhline(y=0, color='r', linestyle='--')
        elif input.variable_prescriptiva() == "por_grupo_edad":
            grupos_riesgo = df.groupby("gru_edad")["n"].sum().sort_values(ascending=False)
            sns.barplot(x=grupos_riesgo.index, y=grupos_riesgo.values, ax=ax)
            plt.title("Grupos de Edad en Riesgo")
            plt.xticks(rotation=45)
        else:
            enfermedades_criticas = df.groupby("nombre_enfermedad")["n"].sum().nlargest(5)
            sns.barplot(x=enfermedades_criticas.values, y=enfermedades_criticas.index, ax=ax)
            plt.title("Enfermedades Críticas para Intervención")
        return fig

# =========================
# Run the application
# =========================
app = App(app_ui, server)

if __name__ == "__main__":
    app.run()