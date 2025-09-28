import pandas as pd
import numpy as np
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.arima.model import ARIMA
from scipy import stats
import plotly.graph_objects as go
import plotly.express as px
from dash import Dash, dcc, html
from dash.dependencies import Input, Output
import dash_bootstrap_components as dbc

# Cargar y preparar los datos
df = pd.read_csv('036ei5wg8bzm6bfnggh2.csv')
df['ANO_DEF'] = pd.to_numeric(df['ANO_DEF'], errors='coerce')
df = df.dropna(subset=['ANO_DEF'])

# Calcular estadísticas clave
total_casos_val = len(df)
total_enfermedades_val = df['CAPITULO'].nunique()
periodo_val = f"{int(df['ANO_DEF'].min())}-{int(df['ANO_DEF'].max())}"
promedio_anual_val = len(df) / df['ANO_DEF'].nunique()

# Inicializar la aplicación Dash
app = Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Diseño de la aplicación
app.layout = dbc.Container([
    html.H1("📊 Análisis de Mortalidad - Chile 1997-2019", 
            className="text-center my-4"),
    
    html.P("""Esta aplicación proporciona un análisis detallado de las causas de mortalidad 
           en Chile durante el período 1997-2019. Explore las diferentes pestañas para 
           descubrir patrones, tendencias y estadísticas sobre las principales causas de 
           muerte en el país.""",
           className="text-center mb-4"),
    
    dbc.Tabs([
        dbc.Tab(label="🏠 Inicio", children=[
            dbc.Row([
                dbc.Col([
                    dbc.Card([
                        dbc.CardBody([
                            html.H4(f"{total_casos_val:,}", className="text-primary"),
                            html.P("Total de casos")
                        ])
                    ])
                ], width=3),
                dbc.Col([
                    dbc.Card([
                        dbc.CardBody([
                            html.H4(f"{total_enfermedades_val:,}", className="text-primary"),
                            html.P("Total de enfermedades")
                        ])
                    ])
                ], width=3),
                dbc.Col([
                    dbc.Card([
                        dbc.CardBody([
                            html.H4(periodo_val, className="text-primary"),
                            html.P("Período de análisis")
                        ])
                    ])
                ], width=3),
                dbc.Col([
                    dbc.Card([
                        dbc.CardBody([
                            html.H4(f"{promedio_anual_val:,.0f}", className="text-primary"),
                            html.P("Promedio anual de casos")
                        ])
                    ])
                ], width=3),
            ], className="mb-4"),
        ]),
        
        dbc.Tab(label="📈 Análisis Temporal", children=[
            dbc.Row([
                dbc.Col([
                    dbc.Card([
                        dbc.CardBody([
                            html.H4("Controles"),
                            dcc.Dropdown(
                                id='capitulo-dropdown',
                                options=[{'label': cap, 'value': cap} 
                                       for cap in sorted(df['CAPITULO'].unique())],
                                value=df['CAPITULO'].iloc[0],
                                className="mb-3"
                            ),
                            dcc.RangeSlider(
                                id='year-range',
                                min=df['ANO_DEF'].min(),
                                max=df['ANO_DEF'].max(),
                                value=[df['ANO_DEF'].min(), df['ANO_DEF'].max()],
                                marks={str(int(year)): str(int(year)) 
                                      for year in range(int(df['ANO_DEF'].min()), 
                                                      int(df['ANO_DEF'].max()) + 1)},
                                className="mb-3"
                            )
                        ])
                    ], className="mb-4")
                ])
            ]),
            dbc.Row([
                dbc.Col([
                    dbc.Card([
                        dbc.CardBody([
                            dcc.Graph(id='temporal-trend')
                        ])
                    ])
                ])
            ])
        ]),
        
        dbc.Tab(label="🔍 Análisis Estadístico", children=[
            dbc.Row([
                dbc.Col([
                    dbc.Card([
                        dbc.CardBody([
                            html.H4("Estadísticas Descriptivas"),
                            html.Div(id='stats-table')
                        ])
                    ])
                ], width=6),
                dbc.Col([
                    dbc.Card([
                        dbc.CardBody([
                            html.H4("Test de Estacionariedad"),
                            html.Div(id='adf-test')
                        ])
                    ])
                ], width=6)
            ], className="mb-4"),
            dbc.Row([
                dbc.Col([
                    dbc.Card([
                        dbc.CardBody([
                            html.H4("Descomposición de Series Temporales"),
                            dcc.Graph(id='decomposition-plot')
                        ])
                    ])
                ])
            ])
        ])
    ])
], fluid=True)

@app.callback(
    Output('temporal-trend', 'figure'),
    [Input('capitulo-dropdown', 'value'),
     Input('year-range', 'value')]
)
def update_temporal_trend(selected_capitulo, year_range):
    filtered_df = df[
        (df['CAPITULO'] == selected_capitulo) & 
        (df['ANO_DEF'] >= year_range[0]) & 
        (df['ANO_DEF'] <= year_range[1])
    ]
    
    yearly_counts = filtered_df.groupby('ANO_DEF').size().reset_index()
    yearly_counts.columns = ['Año', 'Casos']
    
    fig = px.line(yearly_counts, x='Año', y='Casos',
                  title=f'Tendencia temporal de mortalidad - {selected_capitulo}')
    fig.update_layout(
        template="plotly_white",
        xaxis_title="Año",
        yaxis_title="Número de casos"
    )
    return fig

@app.callback(
    [Output('stats-table', 'children'),
     Output('adf-test', 'children'),
     Output('decomposition-plot', 'figure')],
    [Input('capitulo-dropdown', 'value'),
     Input('year-range', 'value')]
)
def update_statistical_analysis(selected_capitulo, year_range):
    filtered_df = df[
        (df['CAPITULO'] == selected_capitulo) & 
        (df['ANO_DEF'] >= year_range[0]) & 
        (df['ANO_DEF'] <= year_range[1])
    ]
    
    yearly_counts = filtered_df.groupby('ANO_DEF').size()
    
    # Estadísticas descriptivas
    stats_df = pd.DataFrame({
        'Estadística': ['Media', 'Mediana', 'Desviación Estándar', 'Mínimo', 'Máximo'],
        'Valor': [
            f"{yearly_counts.mean():.2f}",
            f"{yearly_counts.median():.2f}",
            f"{yearly_counts.std():.2f}",
            f"{yearly_counts.min():.2f}",
            f"{yearly_counts.max():.2f}"
        ]
    })
    
    stats_table = dbc.Table.from_dataframe(
        stats_df, 
        striped=True, 
        bordered=True, 
        hover=True,
        className="mb-0"
    )
    
    # Test ADF
    adf_result = adfuller(yearly_counts)
    adf_text = html.Div([
        html.P(f"Estadístico ADF: {adf_result[0]:.4f}"),
        html.P(f"Valor p: {adf_result[1]:.4f}"),
        html.P("La serie es estacionaria" if adf_result[1] < 0.05 else "La serie no es estacionaria")
    ])
    
    # Descomposición
    decomposition = seasonal_decompose(yearly_counts, period=1)
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=yearly_counts.index, 
        y=decomposition.trend,
        mode='lines', 
        name='Tendencia'
    ))
    fig.add_trace(go.Scatter(
        x=yearly_counts.index, 
        y=decomposition.seasonal,
        mode='lines', 
        name='Estacionalidad'
    ))
    fig.add_trace(go.Scatter(
        x=yearly_counts.index, 
        y=decomposition.resid,
        mode='lines', 
        name='Residuos'
    ))
    
    fig.update_layout(
        title='Descomposición de la Serie Temporal',
        template="plotly_white",
        xaxis_title="Año",
        yaxis_title="Valor",
        height=600
    )
    
    return stats_table, adf_text, fig

if __name__ == '__main__':
    app.run_server(debug=True)
