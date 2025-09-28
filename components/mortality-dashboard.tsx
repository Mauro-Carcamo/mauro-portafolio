import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

export function MortalityDashboard() {
  const [mortalityTrendData, setMortalityTrendData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/mortality-trend')
      .then(response => response.json())
      .then(data => setMortalityTrendData(data));
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
    </div>
  );
}
