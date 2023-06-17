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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function LineChartTabs({ pesos }) {
  const [emptyData, setEmptyData] = useState(false);
  const [filteredPesos, setFilteredPesos] = useState(pesos);
  const [period, setPeriod] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    handleFilter();
  }, [period, startDate, endDate]);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

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

    if (startDate && endDate) {
      filteredData = filteredData.filter(
        (item) =>
          new Date(item.fecha) >= startDate && new Date(item.fecha) <= endDate
      );
    }

    // Generar datos fake
    if (filteredData.length > 0) {
      const minDate = new Date(
        Math.min(...filteredData.map((peso) => new Date(peso.fecha)))
      );
      const maxDate = new Date(
        Math.max(...filteredData.map((peso) => new Date(peso.fecha)))
      );

      // Generar pesos ficticios entre las fechas existentes
      const generatedData = [];
      const currentDate = new Date(filteredData[0].fecha);

      while (currentDate <= new Date()) {
        const dataItem = filteredData.find(
          (item) =>
            new Date(item.fecha).setHours(0, 0, 0, 0) ===
            currentDate.setHours(0, 0, 0, 0)
        );

        if (dataItem) {
          generatedData.push(dataItem);
        } else {
          const previousData = filteredData.find(
            (item) => new Date(item.fecha) < currentDate
          );
          const nextData = filteredData.find(
            (item) => new Date(item.fecha) > currentDate
          );

          if (previousData && nextData) {
            const previousDate = new Date(previousData.fecha);
            const nextDate = new Date(nextData.fecha);
            const timeDiff = nextDate.getTime() - previousDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            const pesoDiff = nextData.peso - previousData.peso;
            const pesoPerDay = pesoDiff / daysDiff;
            const daysSincePrevious = Math.ceil(
              (currentDate.getTime() - previousDate.getTime()) /
                (1000 * 3600 * 24)
            );
            const generatedPeso =
              previousData.peso + pesoPerDay * daysSincePrevious;

            generatedData.push({
              fecha: currentDate.toISOString(),
              peso: generatedPeso,
            });
          }
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      filteredData = generatedData;
    }

    // Verificar si los datos filtrados están vacíos
    setEmptyData(filteredData.length === 0 || filteredData.length === 1);

    // Actualizar los datos filtrados
    setFilteredPesos(filteredData);
  };

  const formatPeso = (peso) => `${peso.toFixed(1)}Kg`;

  const handlePeriodClick = (selectedPeriod) => {
    setPeriod(selectedPeriod);
    setStartDate(null);
    setEndDate(null);
  };
  
  const handleDateSelection = (date) => {
    if (startDate === null) {
      setStartDate(date);
    } else if (endDate === null && date !== startDate) {
      setEndDate(date);
    } else {
      // Ambas fechas están seleccionadas, deseleccionarlas
      setStartDate(null);
      setEndDate(null);
    }

    if (period !== "") {
      setPeriod("");
    }
  };

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <>
      {period === "" && (
        <p className={styles.selecPeriodo}>Selecciona un periodo</p>
      )}
      <div className={styles.filtroFechas}>
        <label htmlFor="">Fecha inicio</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleDateSelection(date)}
          placeholderText="Fecha de inicio"
          dateFormat="dd/MM/yyyy"
          className={styles.datePicker}
          onClick={() => clearDates()}
        />
        <label htmlFor="">Fecha fin</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => handleDateSelection(date)}
          placeholderText="Fecha de fin"
          dateFormat="dd/MM/yyyy"
          className={styles.datePicker}
          onClick={() => clearDates()}
        />
      </div>
      <div className={styles.grafico}>
        <div className={styles.filtros}>
          <button
            onClick={() => handlePeriodClick("1M")}
            className={period === "1M" ? "btnPrincipal" : ""}
          >
            1 Mes
          </button>
          <button
            onClick={() => handlePeriodClick("3M")}
            className={period === "3M" ? "btnPrincipal" : ""}
          >
            3 Meses
          </button>
          <button
            onClick={() => handlePeriodClick("6M")}
            className={period === "6M" ? "btnPrincipal" : ""}
          >
            6 Meses
          </button>
          <button
            onClick={() => handlePeriodClick("1Y")}
            className={period === "1Y" ? "btnPrincipal" : ""}
          >
            1 Año
          </button>
          <button
            onClick={() => handlePeriodClick("total")}
            className={period === "total" ? "btnPrincipal" : ""}
          >
            Total
          </button>
        </div>

        {emptyData ? (
          <p>No hay datos disponibles para el período seleccionado.</p>
        ) : (
          filteredPesos && (
            <LineChart width={400} height={300} data={filteredPesos}>
              <CartesianGrid strokeDasharray="6 6" opacity={0.3} />
              <XAxis
                dataKey="fecha"
                tickFormatter={(fecha) => formatDate(fecha)}
                tick={{ fill: "var(--text-main)" }}
                type="category"
              />
              <YAxis
                domain={["dataMin", "dataMax"]}
                tickFormatter={formatPeso}
                tick={{ fill: "var(--text-main)" }}
              />
              <Tooltip
                labelFormatter={(label) => formatDate(label)}
                formatter={(value) => `${formatPeso(value)}`}
                labelStyle={{ color: "var(--background-input)" }}
              />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="linear"
                dataKey="peso"
                stroke="var(--selection)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )
        )}
      </div>
    </>
  );
}
