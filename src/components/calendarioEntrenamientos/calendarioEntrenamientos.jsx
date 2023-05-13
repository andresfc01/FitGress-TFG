import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./styles.module.css"; // Importa los estilos CSS modulares

const CalendarioEntrenamientos = ({ entrenamientos }) => {
  const entrenamientosRealizados = entrenamientos.map(
    (entrenamiento) => entrenamiento.fecha.split("T")[0]
  );

  const fechaEsRealizada = (date) => {
    const fecha = date.toISOString().split("T")[0];
    return entrenamientosRealizados.includes(fecha);
  };

  const tileClassName = ({ date }) => {
    if (fechaEsRealizada(date)) {
      return styles["tile-selected"]; // Aplica la clase CSS modular para los días seleccionados
    }
    return null;
  };

  return (
    <div className={styles.divCalendario}>
      <Calendar
        tileClassName={tileClassName}
        selectRange={false}
        className={styles.calendario}
      />
    </div>
  );
};

export default CalendarioEntrenamientos;
