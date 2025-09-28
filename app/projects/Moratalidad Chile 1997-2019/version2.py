import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
from shiny.express import ui, render
from shiny import reactive
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller

# =========================
# Cargar datos y preparación inicial
# =========================
try:
    # FIX 1: Use absolute path for CSV file
    csv_path = os.path.join(os.path.dirname(__file__), "036ei5wg8bzm6bfnggh2.csv")
    df = pd.read_csv(csv_path, encoding='utf-8')
    df = df.drop(columns=["diagnostico1", "total"], errors='ignore')

    # =========================
    # UI con Shiny Express
    # =========================
    ui.page_opts(title="Dashboard de Análisis de Mortalidad - Chile 1997-2019", fillable=True)

    # Head y CSS (sin cambios)
    ui.tags.head(
        ui.tags.style('''
            :root {
                --primary: #2c3e50; --secondary: #34495e; --accent1: #1abc9c; --accent2: #3498db; --accent3: #9b59b6; --accent4: #e67e22; --accent5: #e74c3c; --light: #ecf0f1; --dark: #2c3e50; --text: #2c3e50; --text-light: #7f8c8d;
            }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; color: var(--text); line-height: 1.6; }
            .main-container { max-width: 1400px; margin: 0 auto; padding: 0 15px; }
            .main-title { text-align: center; color: var(--primary); margin: 20px 0 10px; font-size: 2.5rem; font-weight: 700; background: linear-gradient(135deg, var(--accent1), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 10px; }
            .subtitle { text-align: center; color: var(--text-light); margin-bottom: 30px; font-size: 1.1rem; max-width: 900px; margin-left: auto; margin-right: auto; }
            .content-panel { padding: 25px; border-radius: 12px; background-color: white; margin: 15px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.05); border: none; transition: transform 0.3s ease, box-shadow 0.3s ease; }
            .content-panel:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
            .section-header { color: var(--secondary); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 3px solid var(--accent2); font-size: 1.5rem; font-weight: 600; display: flex; align-items: center; }
            .info-list { list-style-type: none; padding-left: 0; }
            .info-list li { padding: 12px 18px; margin-bottom: 12px; background-color: var(--light); border-radius: 8px; border-left: 4px solid var(--accent1); font-size: 1.05rem; }
            .data-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .data-table th { background-color: var(--accent2); color: white; padding: 14px; text-align: left; font-size: 1.1rem; }
            .data-table td { padding: 12px 14px; border-bottom: 1px solid #ddd; font-size: 1.05rem; }
            .data-table tr:nth-child(even) { background-color: #f9f9f9; }
            .data-table tr:hover { background-color: #f1f1f1; }
            .plot-container { min-height: 400px; display: flex; align-items: center; justify-content: center; }
            .footer { text-align: center; margin-top: 40px; padding: 25px; color: var(--text-light); font-size: 0.95rem; border-top: 1px solid #ddd; background-color: var(--light); border-radius: 8px; }
        ''')
    )

    with ui.layout_sidebar():
        with ui.sidebar(title="Filtros Globales"):
            ui.input_slider(
                "year_range",
                "Rango de Años",
                min=int(df['ano'].min()),
                max=int(df['ano'].max()),
                value=(int(df['ano'].min()), int(df['ano'].max())),
                sep=""
            )
            ui.input_selectize(
                "sexo_filter",
                "Sexo",
                choices=["Todos"] + df["sexo"].unique().tolist(),
                selected="Todos"
            )
            ui.input_selectize(
                "edad_filter",
                "Grupo de Edad",
                choices=["Todos"] + sorted(df["gru_edad"].unique().tolist()),
                selected="Todos"
            )

        ui.h1("📊 Dashboard de Análisis de Mortalidad - Chile 1997-2019", class_="main-title")
        ui.p("Exploración integral de datos de mortalidad en Chile. Utilice los filtros para explorar los datos de forma dinámica.", class_="subtitle")

        with ui.navset_tab_card(id="nav_tabs"):
            with ui.nav_panel("🏠 Inicio"):
                with ui.layout_columns(col_widths={"sm": 6, "md": 3, "lg": 3}):
                    ui.ui_output("total_casos_box")
                    ui.ui_output("total_enfermedades_box")
                    ui.ui_output("periodo_analizado_box")
                    ui.ui_output("enfermedad_comun_box")

                with ui.layout_columns(col_widths={"sm": 12, "md": 6, "lg": 6}, gap="20px"):
                    with ui.div(class_="content-panel"):
                        ui.h4("📋 Metadatos del Dataset", class_="section-header")
                        ui.tags.ul(
                            ui.tags.li(ui.tags.strong("gru_edad"), " → Grupo etario"),
                            ui.tags.li(ui.tags.strong("sexo"), " → Sexo del paciente"),
                            ui.tags.li(ui.tags.strong("ano"), " → Año de registro"),
                            ui.tags.li(ui.tags.strong("nombre_enfermedad"), " → Nombre de la enfermedad"),
                            ui.tags.li(ui.tags.strong("n"), " → Número de casos"),
                            class_="info-list"
                        )
                    with ui.div(class_="content-panel"):
                        ui.h4("🔍 Variables en los Datos Filtrados", class_="section-header")
                        ui.ui_output("vars_info")

                with ui.div(class_="content-panel"):
                    ui.h4("📋 Resumen por Sexo y Grupo Etario", class_="section-header")
                    ui.output_table("resumen_inicio")

            with ui.nav_panel("📊 Descriptivo"):
                with ui.div(class_="content-panel"):
                    ui.h3("🔹 Análisis Descriptivo de Variables", class_="section-header")
                    ui.input_select("variable_descriptiva", "Seleccione variable para visualizar:", ["sexo", "gru_edad", "nombre_enfermedad"])
                    with ui.div(class_="plot-container"):
                        ui.output_plot("plot_descriptivo")

            with ui.nav_panel("🔍 Diagnóstico"):
                with ui.div(class_="content-panel"):
                    ui.h3("🔹 Análisis de Distribución (Box Plot)", class_="section-header")
                    ui.input_select("variable_diagnostico", "Seleccione variable para visualizar:", ["sexo", "gru_edad", "nombre_enfermedad"])
                    with ui.div(class_="plot-container"):
                        ui.output_plot("plot_diagnostico")

                with ui.div(class_="content-panel"):
                    ui.h3("🔹 Análisis de Serie Temporal (Casos Totales)", class_="section-header")
                    ui.p("Esta sección analiza la serie temporal de los casos totales para los datos filtrados.")
                    with ui.layout_columns():
                        with ui.div():
                            ui.h4("Test de Estacionariedad (Dickey-Fuller)", class_="section-header")
                            ui.output_text_verbatim("adf_test_results")
                        with ui.div():
                            ui.h4("Descomposición de Serie Temporal", class_="section-header")
                            with ui.div(class_="plot-container"):
                                ui.output_plot("decomposition_plot")

            with ui.nav_panel("🔮 Predictivo"):
                with ui.div(class_="content-panel"):
                    ui.h3("🔹 Predicción con Modelo ARIMA", class_="section-header")
                    ui.p("Se realiza una predicción a 5 años para el total de casos en los datos filtrados.")
                    with ui.div(class_="plot-container"):
                        ui.output_plot("plot_predictivo")

            with ui.nav_panel("💡 Prescriptivo"):
                with ui.div(class_="content-panel"):
                    ui.h3("🔹 Análisis para Recomendaciones", class_="section-header")
                    ui.input_select("variable_prescriptiva", "Seleccione análisis:", ["Tendencia Anual", "Grupos de Edad en Riesgo", "Enfermedades Críticas"])
                    with ui.div(class_="plot-container"):
                        ui.output_plot("plot_prescriptivo")

        ui.div(
            ui.tags.p(f"© 2024 - Dashboard de Análisis de Mortalidad Chile - Datos: 1997-2019"),
            class_="footer"
        )


    # =========================
    # Lógica del servidor (reactiva)
    # =========================
    @reactive.Calc
    def filtered_data():
        df_f = df.copy()
        min_year, max_year = ui.input.year_range()
        df_f = df_f[(df_f['ano'] >= min_year) & (df_f['ano'] <= max_year)]
        if ui.input.sexo_filter() != "Todos":
            df_f = df_f[df_f["sexo"] == ui.input.sexo_filter()]
        if ui.input.edad_filter() != "Todos":
            df_f = df_f[df_f["gru_edad"] == ui.input.edad_filter()]
        return df_f

    # --- Render UI para Value Boxes ---
    @render.ui
    def total_casos_box():
        total_casos = filtered_data()['n'].sum()
        return ui.value_box("Total de Casos", f"{total_casos:,}".replace(",", "."), style="background-color: var(--accent1); color: white;")

    @render.ui
    def total_enfermedades_box():
        total_enfermedades = filtered_data()['nombre_enfermedad'].nunique()
        return ui.value_box("Enfermedades Únicas", str(total_enfermedades), style="background-color: var(--accent2); color: white;")

    @render.ui
    def periodo_analizado_box():
        min_year, max_year = ui.input.year_range()
        return ui.value_box("Período Analizado", f"{min_year}-{max_year}", style="background-color: var(--accent3); color: white;")

    @render.ui
    def enfermedad_comun_box():
        data = filtered_data()
        if data.empty:
            comun = "N/A"
        else:
            comun = data.groupby('nombre_enfermedad')['n'].sum().idxmax()
        return ui.value_box("Enfermedad Más Común", comun, style="background-color: var(--accent4); color: white;")

    @render.ui
    def vars_info():
        data = filtered_data()
        return ui.tags.ul(
            ui.tags.li(f"Variables categóricas: gru_edad ({data['gru_edad'].nunique()} grupos), sexo ({data['sexo'].nunique()}), nombre_enfermedad ({data['nombre_enfermedad'].nunique()})."),
            ui.tags.li(f"Variables numéricas: ano ({data['ano'].nunique()} años), n (casos)."),
            class_="info-list"
        )

    # --- Render Tablas y Gráficos ---
    @render.table
    def resumen_inicio():
        data = filtered_data()
        if data.empty: return pd.DataFrame()
        tabla = data.groupby(["gru_edad", "sexo"]).size().reset_index(name="Cantidad").pivot(index="gru_edad", columns="sexo", values="Cantidad").fillna(0).reset_index()
        for col in tabla.columns:
            if col != "gru_edad":
                tabla[col] = tabla[col].apply(lambda x: f"{int(x):,}".replace(",", "."))
        return tabla

    @render.plot
    def plot_descriptivo():
        data = filtered_data()
        if data.empty: return
        fig, ax = plt.subplots(figsize=(12, 7))
        variable = ui.input.variable_descriptiva()
        if variable == "sexo":
            sns.countplot(data=data, x="sexo", ax=ax, palette='Set2', order=data['sexo'].value_counts().index)
            ax.set_title("Distribución de Casos por Sexo", fontsize=16)
        elif variable == "gru_edad":
            sns.countplot(data=data, x="gru_edad", ax=ax, palette='viridis', order=sorted(data['gru_edad'].unique()))
            ax.set_title("Distribución de Casos por Grupo de Edad", fontsize=16)
            plt.xticks(rotation=45)
        else:
            top_10 = data.groupby("nombre_enfermedad")["n"].sum().nlargest(10)
            sns.barplot(x=top_10.values, y=top_10.index, ax=ax, palette='cubehelix')
            ax.set_title("Top 10 Enfermedades más Comunes", fontsize=16)
        plt.tight_layout()
        return fig

    @render.plot
    def plot_diagnostico():
        data = filtered_data()
        if data.empty: return
        fig, ax = plt.subplots(figsize=(12, 7))
        variable = ui.input.variable_diagnostico()
        if variable == "sexo":
            sns.boxplot(data=data, x="sexo", y="n", ax=ax, palette='pastel')
        elif variable == "gru_edad":
            sns.boxplot(data=data, x="gru_edad", y="n", ax=ax, palette='YlOrBr', order=sorted(data['gru_edad'].unique()))
            plt.xticks(rotation=45)
        else:
            top_10_enf = data.groupby("nombre_enfermedad")["n"].sum().nlargest(10).index
            data_plot = data[data["nombre_enfermedad"].isin(top_10_enf)]
            sns.boxplot(data=data_plot, x="nombre_enfermedad", y="n", ax=ax, palette='Blues')
            plt.xticks(rotation=90)
        ax.set_title(f"Distribución de Casos (n) por {variable}", fontsize=16)
        plt.tight_layout()
        return fig

    @render.text
    def adf_test_results():
        data_ts = filtered_data().groupby("ano")["n"].sum()
        if len(data_ts) < 4: return "No hay suficientes datos para el test."
        adf_result = adfuller(data_ts)
        p_value = adf_result[1]
        conclusion = "Estacionaria (p < 0.05)" if p_value < 0.05 else "No Estacionaria (p >= 0.05)"
        return f"Estadístico ADF: {adf_result[0]:.2f}\np-valor: {p_value:.3f}\nConclusión: {conclusion}"

    @render.plot
    def decomposition_plot():
        data_ts = filtered_data().groupby("ano")["n"].sum()
        if len(data_ts) < 4: return
        period = 2 if len(data_ts) >= 4 else 1
        decomposition = seasonal_decompose(data_ts, model='additive', period=period)
        fig, (ax1, ax2, ax3, ax4) = plt.subplots(4, 1, figsize=(10, 8), sharex=True)
        decomposition.observed.plot(ax=ax1, ylabel='Observado')
        decomposition.trend.plot(ax=ax2, ylabel='Tendencia')
        decomposition.seasonal.plot(ax=ax3, ylabel='Estacionalidad')
        decomposition.resid.plot(ax=ax4, ylabel='Residual')
        fig.suptitle('Descomposición de la Serie Temporal', fontsize=16)
        plt.tight_layout(rect=[0, 0.03, 1, 0.95])
        return fig

    @render.plot
    def plot_predictivo():
        data_ts = filtered_data().groupby("ano")["n"].sum()
        if len(data_ts) < 4: return
        fig, ax = plt.subplots(figsize=(12, 7))
        try:
            model = ARIMA(data_ts, order=(1,1,1))
            results = model.fit()
            forecast = results.forecast(steps=5)
            ax.plot(data_ts.index, data_ts.values, label='Histórico', color='blue', marker='o')
            ax.plot(range(int(data_ts.index[-1])+1, int(data_ts.index[-1])+6), forecast, label='Predicción', linestyle='--', color='red', marker='x')
            ax.set_title("Predicción de Casos Totales (Próximos 5 años)", fontsize=16)
            ax.legend()
        except Exception as e:
            ax.text(0.5, 0.5, f"No se pudo generar el modelo ARIMA:\n{e}", ha='center', va='center', color='red')
        plt.tight_layout()
        return fig

    @render.plot
    def plot_prescriptivo():
        data = filtered_data()
        if data.empty: return
        fig, ax = plt.subplots(figsize=(12, 7))
        variable = ui.input.variable_prescriptiva()
        if variable == "Tendencia Anual":
            tendencias = data.groupby("ano")["n"].sum()
            ax.plot(tendencias.index, tendencias.values, color='#e67e22', marker='o')
            ax.set_title("Tendencia Anual de Casos Totales", fontsize=16)
        elif variable == "Grupos de Edad en Riesgo":
            grupos_riesgo = data.groupby("gru_edad")["n"].sum().sort_values(ascending=False).nlargest(10)
            sns.barplot(x=grupos_riesgo.values, y=grupos_riesgo.index, ax=ax, palette='Purples_r')
            ax.set_title("Top 10 Grupos de Edad en Riesgo", fontsize=16)
        else: # Enfermedades Críticas
            enfermedades_criticas = data.groupby("nombre_enfermedad")["n"].sum().nlargest(10)
            sns.barplot(x=enfermedades_criticas.values, y=enfermedades_criticas.index, ax=ax, palette='Reds_r')
            ax.set_title("Top 10 Enfermedades Críticas para Intervención", fontsize=16)
        plt.tight_layout()
        return fig

except (FileNotFoundError, Exception) as e:
    ui.page_opts(title="Error en la Aplicación", fillable=True)
    ui.div(
        ui.h1("Error Crítico"),
        ui.p(f"No se pudo cargar o procesar el archivo de datos: {e}"),
        style="color: red; font-size: 1.5rem; text-align: center; padding: 50px;"
    )
