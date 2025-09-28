import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from shiny import App, ui, render, reactive

# ========================
# Cargar los datos
# ========================
df = pd.read_csv("036ei5wg8bzm6bfnggh2.csv")

# ========================
# Definir la interfaz de usuario
# ========================
app_ui = ui.page_fluid(
    ui.h2("Análisis de Diagnósticos"),
    ui.layout_sidebar(
        ui.sidebar(
            ui.input_selectize(
                "sexo", 
                "Sexo:", 
                choices=["Todos"] + df["sexo"].unique().tolist(),
                selected="Todos"
            ),
            ui.input_selectize(
                "grupo_edad", 
                "Grupo de Edad:", 
                choices=["Todos"] + df["gru_edad"].unique().tolist(),
                selected="Todos"
            ),
            ui.input_selectize(
                "ano", 
                "Año:", 
                choices=["Todos"] + df["ano"].unique().astype(str).tolist(),
                selected="Todos"
            )
        ),
        ui.output_plot("grafico"),
        ui.output_table("tabla")
    )
)

# ========================
# Definir la lógica del servidor
# ========================
def server(input, output, session):
    
    # Datos filtrados en base a las selecciones del usuario
    @reactive.Calc
    def datos_filtrados():
        df_filtrado = df.copy()
        if input.sexo() != "Todos":
            df_filtrado = df_filtrado[df_filtrado["sexo"] == input.sexo()]
        if input.grupo_edad() != "Todos":
            df_filtrado = df_filtrado[df_filtrado["gru_edad"] == input.grupo_edad()]
        if input.ano() != "Todos":
            df_filtrado = df_filtrado[df_filtrado["ano"].astype(str) == input.ano()]
        return df_filtrado
    
    # Gráfico
    @output
    @render.plot
    def grafico():
        df_plot = datos_filtrados()
        if df_plot.empty:
            fig, ax = plt.subplots()
            ax.text(0.5, 0.5, "No hay datos disponibles", 
                    ha="center", va="center", fontsize=14)
            ax.axis("off")
            return fig

        fig, ax = plt.subplots(figsize=(8, 5))
        sns.countplot(data=df_plot, x="nombre_enfermedad", order=df_plot["nombre_enfermedad"].value_counts().index, ax=ax)
        plt.xticks(rotation=90)
        ax.set_title("Distribución de Diagnósticos")
        ax.set_ylabel("Frecuencia")
        return fig

    # Tabla
    @output
    @render.table
    def tabla():
        df_tabla = datos_filtrados().groupby("nombre_enfermedad").size().reset_index(name="Frecuencia")
        return df_tabla.sort_values(by="Frecuencia", ascending=False)

# ========================
# Crear la app
# ========================
app = App(app_ui, server)
