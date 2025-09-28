import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useEffect, useState } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

export function MortalityDashboard() {
  const [mortalityTrendData, setMortalityTrendData] = useState([]);
  const [mortalityByAgeData, setMortalityByAgeData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/mortality-trend')
      .then(response => response.json())
      .then(data => setMortalityTrendData(data));

    fetch('http://localhost:8000/api/mortality-by-age')
      .then(response => response.json())
      .then(data => setMortalityByAgeData(data));
  }, []);

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Mortalidad (1997-2019)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mortalityTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ano" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="n" stroke="#8884d8" name="Nº de Muertes" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mortalidad por Grupo de Edad</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mortalityByAgeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="gru_edad" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="n" fill="#82ca9d" name="Nº de Muertes" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Distribución de Mortalidad por Edad</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mortalityByAgeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="n"
                nameKey="gru_edad"
                label={(entry) => `${entry.gru_edad}: ${(entry.percent * 100).toFixed(0)}%`}
              >
                {mortalityByAgeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
