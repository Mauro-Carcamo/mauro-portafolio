import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import seaborn as sns

def load_and_prepare_data(enfermedad_foco):
    """Carga y prepara los datos para la animación."""
    df = pd.read_csv("../data/raw/036ei5wg8bzm6bfnggh2.csv")
    df_enf = df[df["nombre_enfermedad"] == enfermedad_foco]
    df_anim = df_enf.groupby(["ano", "sexo"])["n"].sum().reset_index()
    return df_anim

def create_animation(df_anim, enfermedad_foco):
    """Crea y guarda la animación del gráfico de barras."""
    # Estilo y paleta de colores
    sns.set_style("whitegrid")
    plt.style.use('seaborn-v0_8-talk')
    colors = {"Hombre": "#3498db", "Mujer": "#e74c3c"}

    fig, ax = plt.subplots(figsize=(12, 7))

    def animate(year):
        ax.clear()
        subset = df_anim[df_anim["ano"] == year]
        
        # Dibuja las barras
        bars = ax.bar(subset["sexo"], subset["n"], color=[colors.get(s, '#3498db') for s in subset["sexo"]])

        # Añade etiquetas de valor sobre las barras
        for bar in bars:
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width() / 2., height + 100, f'{int(height):,}'.replace(",", "."),
                    ha='center', va='bottom', fontsize=12, fontweight='bold')

        # Configuración de los ejes y el título
        ax.set_title(f'{enfermedad_foco}\nAño: {year}', fontsize=18, fontweight='bold', pad=20)
        ax.set_ylabel("Número de Casos", fontsize=14, fontweight='bold')
        ax.set_xlabel("Sexo", fontsize=14, fontweight='bold')
        ax.set_ylim(0, df_anim["n"].max() * 1.1)
        ax.tick_params(axis='x', labelsize=12)
        ax.tick_params(axis='y', labelsize=12)
        ax.grid(axis='y', linestyle='--', alpha=0.7)
        
        # Mejora la estética general
        sns.despine(left=True)
        plt.tight_layout()

    # Crear la animación
    ani = animation.FuncAnimation(fig, animate, frames=sorted(df_anim["ano"].unique()), interval=500, repeat=False)

    # Convertir la animación a HTML
    print("Generando animación HTML... Esto puede tardar unos momentos.")
    html_output = ani.to_jshtml()

    # Guardar el HTML en un archivo
    with open("animacion_mortalidad.html", "w") as f:
        f.write(html_output)
    
    print("Animación guardada como 'animacion_mortalidad.html'")
