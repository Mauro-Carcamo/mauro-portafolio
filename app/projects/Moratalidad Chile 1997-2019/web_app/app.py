from shinywidgets import render_widget, output_widget

# =============================================================================
# LIBRERÍAS Y CONFIGURACIÓN INICIAL
# =============================================================================
import pandas as pd
import numpy as np
import os
from shiny.express import ui, render, input
from shiny import reactive
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller
from helpers import load_data, create_filtered_data_calc
import plotly.express as px
from plotly.subplots import make_subplots
import plotly.graph_objects as go
from sklearn.metrics import mean_absolute_error

# =============================================================================
# CARGA Y PROCESAMIENTO DE DATOS
# =============================================================================
df = load_data()

# =============================================================================
# CÁLCULO REACTIVO PARA DATOS FILTRADOS
# =============================================================================
if not df.empty:
    filtered_data = create_filtered_data_calc(df, input)

# =============================================================================
# DEFINICIÓN DE LA INTERFAZ DE USUARIO (UI)
# =============================================================================
if not df.empty:
    # Opciones generales de la página.
    ui.page_opts(title="Dashboard de Análisis de Mortalidad - Chile 1997-2019", fillable=True)

    # Carga la hoja de estilos externa.
    ui.tags.head(
        ui.tags.link(rel="stylesheet", href="styles.css")
    )

    mae = reactive.Value(0)

    # --- Layout Principal con Sidebar ---
    with ui.layout_sidebar():
        # --- Barra Lateral de Filtros ---
        with ui.sidebar(title="Filtros Globales"):
            ui.input_slider("year_range", "Rango de Años", min=int(df['ano'].min()), max=int(df['ano'].max()), value=(int(df['ano'].min()), int(df['ano'].max())), sep="")
            ui.input_selectize("sexo_filter", "Sexo", choices=["Todos"] + df["sexo"].unique().tolist(), selected="Todos")
            ui.input_selectize("edad_filter", "Grupo de Edad", choices=["Todos"] + sorted(df["gru_edad"].unique().tolist()), selected="Todos")
            ui.input_selectize("enfermedad_filter", "Enfermedad", choices=["Todos"] + df["nombre_enfermedad"].unique().tolist(), selected="Todos")

        # --- Contenido Principal ---
        ui.h1("📊 Dashboard de Análisis de Mortalidad - Chile 1997-2019", class_="main-title")
        ui.p("Exploración integral de datos de mortalidad en Chile. Utilice los filtros para explorar los datos de forma dinámica.", class_="subtitle")

        # --- Pestañas de Navegación ---
        with ui.navset_card_tab(id="nav_tabs"):
            # --- Pestaña: Inicio ---
            with ui.nav_panel("🏠 Inicio"):
                # --- Value Boxes (KPIs) ---
                with ui.layout_columns(col_widths={"sm": 6, "md": 3, "lg": 3}):
                    @render.ui
                    def total_casos_box():
                        return ui.value_box(title="Total de Casos", value=f"{filtered_data()['n'].sum():,}".replace(",", "."), style="background-color: var(--accent1); color: white;")

                    @render.ui
                    def total_enfermedades_box():
                        return ui.value_box(title="Enfermedades Únicas", value=str(filtered_data()['nombre_enfermedad'].nunique()), style="background-color: var(--accent2); color: white;")

                    @render.ui
                    def periodo_analizado_box():
                        min_year, max_year = input.year_range()
                        return ui.value_box(title="Período Analizado", value=f"{min_year}-{max_year}", style="background-color: var(--accent3); color: white;")

                    @render.ui
                    def enfermedad_comun_box():
                        data = filtered_data()
                        comun = "N/A" if data.empty else data.groupby('nombre_enfermedad')['n'].sum().idxmax()
                        return ui.value_box(title="Enfermedad Más Común", value=comun, style="background-color: var(--accent4); color: white;")

                # --- Información del Dataset ---
                with ui.layout_columns(col_widths={"sm": 12, "md": 6, "lg": 6}, gap="20px"):
                    with ui.div(class_="content-panel"):
                        ui.h4("📋 Metadatos del Dataset", class_="section-header")
                        ui.tags.ul(ui.tags.li(ui.tags.strong("gru_edad"), " → Grupo etario"), ui.tags.li(ui.tags.strong("sexo"), " → Sexo del paciente"), ui.tags.li(ui.tags.strong("ano"), " → Año de registro"), ui.tags.li(ui.tags.strong("nombre_enfermedad"), " → Nombre de la enfermedad"), ui.tags.li(ui.tags.strong("n"), " → Número de casos"), class_="info-list")
                    with ui.div(class_="content-panel"):
                        ui.h4("🔍 Variables en los Datos Filtrados", class_="section-header")
                        @render.ui
                        def vars_info():
                            data = filtered_data()
                            return ui.tags.ul(ui.tags.li(f"Variables categóricas: gru_edad ({data['gru_edad'].nunique()} grupos), sexo ({data['sexo'].nunique()}), nombre_enfermedad ({data['nombre_enfermedad'].nunique()})."), ui.tags.li(f"Variables numéricas: ano ({data['ano'].nunique()} años), n (casos)."), class_="info-list")

                # --- Tabla Resumen ---
                with ui.div(class_="content-panel"):
                    ui.h4("📋 Resumen por Sexo y Grupo Etario", class_="section-header")
                    @render.table
                    def resumen_inicio():
                        data = filtered_data()
                        if data.empty: return pd.DataFrame()
                        tabla = data.groupby(["gru_edad", "sexo"]).size().reset_index(name="Cantidad").pivot(index="gru_edad", columns="sexo", values="Cantidad").fillna(0).reset_index()
                        for col in tabla.columns:
                            if col != "gru_edad":
                                tabla[col] = tabla[col].apply(lambda x: f"{int(x):,}".replace(",", "."))
                        return tabla

            # --- Pestaña: Descriptivo ---
            with ui.nav_panel("📊 Descriptivo"):
                with ui.div(class_="content-panel"):
                    ui.h3("🔹 Análisis Descriptivo de Variables", class_="section-header")
                    ui.input_select("variable_descriptiva", "Seleccione variable para visualizar:", ["sexo", "gru_edad", "nombre_enfermedad"])
                    output_widget("plot_descriptivo")

                    @render_widget
                    def plot_descriptivo():
                        data = filtered_data()
                        if data.empty: return
                        variable = input.variable_descriptiva()
                        if variable == "sexo":
                            fig = px.bar(data, x="sexo", title="Distribución de Casos por Sexo")
                        elif variable == "gru_edad":
                            fig = px.bar(data, x="gru_edad", title="Distribución de Casos por Grupo de Edad")
                        else:
                            top_10 = data.groupby("nombre_enfermedad")["n"].sum().nlargest(10).reset_index()
                            fig = px.bar(top_10, x="n", y="nombre_enfermedad", orientation='h', title="Top 10 Enfermedades más Comunes")
                        return fig

            # --- Pestaña: Diagnóstico ---
            with ui.nav_panel("🔍 Diagnóstico"):
                with ui.div(class_="content-panel"):
                    ui.h3("🔹 Análisis de Distribución (Box Plot)", class_="section-header")
                    ui.input_select("variable_diagnostico", "Seleccione variable para visualizar:", ["sexo", "gru_edad", "nombre_enfermedad"])
                    output_widget("plot_diagnostico")

                    @render_widget
                    def plot_diagnostico():
                        data = filtered_data()
                        if data.empty: return
                        variable = input.variable_diagnostico()
                        if variable == "sexo":
                            fig = px.box(data, x="sexo", y="n", title="Distribución de Casos por Sexo")
                        elif variable == "gru_edad":
                            fig = px.box(data, x="gru_edad", y="n", title="Distribución de Casos por Grupo de Edad")
                        else:
                            top_10_enf = data.groupby("nombre_enfermedad")["n"].sum().nlargest(10).index
                            data_plot = data[data["nombre_enfermedad"].isin(top_10_enf)]
                            fig = px.box(data_plot, x="nombre_enfermedad", y="n", title="Distribución de Casos para Top 10 Enfermedades")
                        return fig

                # --- Análisis de Series Temporales ---
                with ui.div(class_="content-panel"):
                    ui.h3("🔹 Análisis de Serie Temporal (Casos Totales)", class_="section-header")
                    ui.p("Esta sección analiza la serie temporal de los casos totales para los datos filtrados.")
                    with ui.layout_columns():
                        with ui.div():
                            ui.h4("Test de Estacionariedad (Dickey-Fuller)", class_="section-header")
                            @render.text
                            def adf_test_results():
                                data_ts = filtered_data().groupby("ano")["n"].sum()
                                if len(data_ts) < 4: return "No hay suficientes datos para el test."
                                adf_result = adfuller(data_ts)
                                p_value = adf_result[1]
                                conclusion = "Estacionaria (p < 0.05)" if p_value < 0.05 else "No Estacionaria (p >= 0.05)"
                                return f"Estadístico ADF: {adf_result[0]:.2f}\
p-valor: {p_value:.3f}\
Conclusión: {conclusion}"
                        with ui.div():
                            ui.h4("Descomposición de Serie Temporal", class_="section-header")
                            output_widget("decomposition_plot")

                            @render_widget
                            def decomposition_plot():
                                data_ts = filtered_data().groupby("ano")["n"].sum()
                                if len(data_ts) < 4: return
                                period = 2 if len(data_ts) >= 4 else 1
                                decomposition = seasonal_decompose(data_ts, model='additive', period=period)
                                
                                fig = make_subplots(rows=4, cols=1, shared_xaxes=True, subplot_titles=("Observado", "Tendencia", "Estacionalidad", "Residual"))
                                fig.add_trace(go.Scatter(x=decomposition.observed.index, y=decomposition.observed, mode='lines', name='Observado'), row=1, col=1)
                                fig.add_trace(go.Scatter(x=decomposition.trend.index, y=decomposition.trend, mode='lines', name='Tendencia'), row=2, col=1)
                                fig.add_trace(go.Scatter(x=decomposition.seasonal.index, y=decomposition.seasonal, mode='lines', name='Estacionalidad'), row=3, col=1)
                                fig.add_trace(go.Scatter(x=decomposition.resid.index, y=decomposition.resid, mode='lines', name='Residual'), row=4, col=1)
                                
                                fig.update_layout(title_text='Descomposición de la Serie Temporal', height=600)
                                return fig

            # --- Pestaña: Predictivo ---
            with ui.nav_panel("🔮 Predictivo"):
                with ui.div(class_="content-panel"):
                    ui.h3("🔹 Predicción con Modelo ARIMA", class_="section-header")
                    ui.p("Se realiza una predicción a 5 años para el total de casos en los datos filtrados.")
                    output_widget("plot_predictivo")

                    @render_widget
                    def plot_predictivo():
                        data_ts = filtered_data().groupby("ano")["n"].sum()
                        if len(data_ts) < 4: return
                        
                        try:
                            model = ARIMA(data_ts, order=(1,1,1))
                            results = model.fit()
                            forecast = results.forecast(steps=5)
                            mae.set(mean_absolute_error(data_ts, results.fittedvalues))
                            
                            fig = go.Figure()
                            fig.add_trace(go.Scatter(x=data_ts.index, y=data_ts.values, mode='lines+markers', name='Histórico'))
                            fig.add_trace(go.Scatter(x=list(range(int(data_ts.index[-1])+1, int(data_ts.index[-1])+6)), y=forecast, mode='lines+markers', name='Predicción', line=dict(dash='dash')))
                            fig.update_layout(title_text='Predicción de Casos Totales (Próximos 5 años)')
                            return fig
                        except Exception as e:
                            mae.set(0)
                            # Create an empty plot with error message
                            fig = go.Figure()
                            fig.update_layout(
                                xaxis_visible=False,
                                yaxis_visible=False,
                                annotations=[
                                    dict(
                                        text=f"No se pudo generar el modelo ARIMA:<br>{e}",
                                        xref="paper",
                                        yref="paper",
                                        showarrow=False,
                                        font=dict(
                                            size=16,
                                            color="red"
                                        )
                                    )
                                ]
                            )
                            return fig
                    ui.h4("Evaluación del Modelo")
                    @render.text
                    def mae_text():
                        return f"Error Absoluto Medio (MAE): {mae.get():.2f}"

            # --- Pestaña: Prescriptivo ---
            with ui.nav_panel("💡 Prescriptivo"):
                with ui.div(class_="content-panel"):
                    ui.h3("🔹 Análisis para Recomendaciones", class_="section-header")
                    ui.input_select("variable_prescriptiva", "Seleccione análisis:", ["Tendencia Anual", "Grupos de Edad en Riesgo", "Enfermedades Críticas"])
                    output_widget("plot_prescriptivo")

                    @render_widget
                    def plot_prescriptivo():
                        data = filtered_data()
                        if data.empty: return
                        variable = input.variable_prescriptiva()
                        if variable == "Tendencia Anual":
                            tendencias = data.groupby("ano")["n"].sum().reset_index()
                            fig = px.line(tendencias, x="ano", y="n", title="Tendencia Anual de Casos Totales", markers=True)
                        elif variable == "Grupos de Edad en Riesgo":
                            grupos_riesgo = data.groupby("gru_edad")["n"].sum().sort_values(ascending=False).nlargest(10).reset_index()
                            fig = px.bar(grupos_riesgo, x="n", y="gru_edad", orientation='h', title="Top 10 Grupos de Edad en Riesgo")
                        else: # Enfermedades Críticas
                            enfermedades_criticas = data.groupby("nombre_enfermedad")["n"].sum().nlargest(10).reset_index()
                            fig = px.bar(enfermedades_criticas, x="n", y="nombre_enfermedad", orientation='h', title="Top 10 Enfermedades Críticas para Intervención")
                        return fig

        # --- Footer ---
        ui.div(
            ui.tags.p(f"© 2024 - Dashboard de Análisis de Mortalidad Chile - Datos: 1997-2019"),
            class_="footer"
        )