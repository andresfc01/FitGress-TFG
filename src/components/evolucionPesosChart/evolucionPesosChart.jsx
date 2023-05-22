import React, { useState } from "react";
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
  const [emptyData, setEmptyData] = useState(false);
  const [filteredPesos, setFilteredPesos] = useState(pesos);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const formatPeso = (peso) => `${peso}Kg`;

  // Obtener los valores mínimos y máximos del eje Y
  const valoresPeso = filteredPesos.map((item) => item.peso);
  const minY = Math.min(...valoresPeso);
  const maxY = Math.max(...valoresPeso);

  const handleFilter = (period) => {
    let filteredData = [...pesos].reverse(); // Copia los datos originales

    switch (period) {
      case "1M": {
        // Filtrar por 1 mes
        const periodStartDate = new Date();
        periodStartDate.setMonth(periodStartDate.getMonth() - 1);
        filteredData = filteredData.filter(
          (item) => new Date(item.fecha) >= periodStartDate
        );
        break;
      }
      case "3M": {
        // Filtrar por 3 meses
        const periodStartDate = new Date();
        periodStartDate.setMonth(periodStartDate.getMonth() - 3);
        filteredData = filteredData.filter(
          (item) => new Date(item.fecha) >= periodStartDate
        );
        break;
      }
      case "6M": {
        // Filtrar por 6 meses
        const periodStartDate = new Date();
        periodStartDate.setMonth(periodStartDate.getMonth() - 6);
        filteredData = filteredData.filter(
          (item) => new Date(item.fecha) >= periodStartDate
        );
        break;
      }
      case "1Y": {
        // Filtrar por 1 año
        const periodStartDate = new Date();
        periodStartDate.setFullYear(periodStartDate.getFullYear() - 1);
        filteredData = filteredData.filter(
          (item) => new Date(item.fecha) >= periodStartDate
        );
        break;
      }
      case "total": {
        // Sin filtrar, mostrar todos los datos
        break;
      }
      default:
        break;
    }

    // Verificar si los datos filtrados están vacíos
    setEmptyData(filteredData.length === 0 || filteredData.length === 1);

    // Actualizar los datos filtrados
    setFilteredPesos(filteredData);
  };

  return (
    <div className={styles.grafico}>
      <div className={styles.filtros}>
        <button onClick={() => handleFilter("1M")}>1 Mes</button>
        <button onClick={() => handleFilter("3M")}>3 Meses</button>
        <button onClick={() => handleFilter("6M")}>6 Meses</button>
        <button onClick={() => handleFilter("1Y")}>1 Año</button>
        <button onClick={() => handleFilter("total")}>Total</button>
      </div>
      {emptyData ? (
        <p>No hay datos disponibles para el período seleccionado.</p>
      ) : (
        <LineChart width={400} height={300} data={filteredPesos}>
          <XAxis
            dataKey="fecha"
            tickFormatter={formatDate}
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
            type="linear"
            dataKey="peso"
            stroke="var(--selection)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      )}
    </div>
  );
}
