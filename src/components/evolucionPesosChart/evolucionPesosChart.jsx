import React from "react";
import styles from "./styles.module.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function LineChartTabs({ pesos }) {
  if (!pesos || pesos.length === 0) {
    return null;
  }
  console.log(pesos.reverse());
  pesos = [...pesos].reverse();
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const formatPeso = (peso) => `${peso}Kg`;

  // Obtener los valores mínimos y máximos del eje Y
  const valoresPeso = pesos.map((item) => item.peso);
  const minY = Math.min(...valoresPeso);
  const maxY = Math.max(...valoresPeso);

  return (
    <div className={styles.grafico}>
      <LineChart
        width={800}
        height={400}
        data={pesos}
        /*  margin={{ top: 20, right: 30, left: 20, bottom: 20 }} */
      >
        <XAxis
          dataKey="fecha"
          tickFormatter={formatDate} // Formatear la fecha en el eje X
          tick={{ fill: "var(--text-main)" }}
        />
        <YAxis
          domain={[minY, maxY]}
          tickFormatter={formatPeso}
          tick={{ fill: "var(--text-main)" }}
        />
        <Tooltip />
        <Legend verticalAlign="top" align="right" />
        <Line
          type="linear" /* "monotone" */
          dataKey="peso"
          stroke="var(--selection)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </div>
  );
}
