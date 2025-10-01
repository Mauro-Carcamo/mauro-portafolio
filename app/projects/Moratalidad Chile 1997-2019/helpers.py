import pandas as pd
import os
from shiny import reactive

def load_data():
    """Loads and preprocesses the data."""
    try:
        csv_path = os.path.join(os.path.dirname(__file__), "036ei5wg8bzm6bfnggh2.csv")
        df = pd.read_csv(csv_path, encoding='utf-8')
        df = df.drop(columns=["diagnostico1", "total"], errors='ignore')
        return df
    except (FileNotFoundError, Exception) as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame()

def create_filtered_data_calc(df, input):
    """Creates a reactive calculation for filtered data."""
    @reactive.Calc
    def filtered_data():
        """Filters the main dataframe based on user inputs."""
        df_f = df.copy()
        min_year, max_year = input.year_range()
        df_f = df_f[(df_f['ano'] >= min_year) & (df_f['ano'] <= max_year)]
        if input.sexo_filter() != "Todos":
            df_f = df_f[df_f["sexo"] == input.sexo_filter()]
        if input.edad_filter() != "Todos":
            df_f = df_f[df_f["gru_edad"] == input.edad_filter()]
        if input.enfermedad_filter() != "Todos":
            df_f = df_f[df_f["nombre_enfermedad"] == input.enfermedad_filter()]
        return df_f
    return filtered_data
