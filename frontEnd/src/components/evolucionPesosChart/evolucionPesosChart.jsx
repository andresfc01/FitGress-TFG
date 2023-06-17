import React, { useEffect, useState } from "react";
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
  const [period, setPeriod] = useState("");

  useEffect(() => {
    handleFilter();
  }, [period]);

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

  const handleFilter = () => {
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
    <>
      {period == "" && (
        <p className={styles.selecPeriodo}>Selecciona un periodo</p>
      )}
      <div className={styles.grafico}>
        <div className={styles.filtros}>
          <button
            onClick={() => setPeriod("1M")}
            className={period == "1M" ? "btnPrincipal" : ""}
          >
            1 Mes
          </button>
          <button
            onClick={() => setPeriod("3M")}
            className={period == "3M" ? "btnPrincipal" : ""}
          >
            3 Meses
          </button>
          <button
            onClick={() => setPeriod("6M")}
            className={period == "6M" ? "btnPrincipal" : ""}
          >
            6 Meses
          </button>
          <button
            onClick={() => setPeriod("1Y")}
            className={period == "1Y" ? "btnPrincipal" : ""}
          >
            1 Año
          </button>
          <button
            onClick={() => setPeriod("total")}
            className={period == "total" ? "btnPrincipal" : ""}
          >
            Total
          </button>
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
    </>
  );
}
