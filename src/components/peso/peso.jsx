import styles from "./styles.module.css";

export default function Peso({ peso, pesoAnt, objetivo } = props) {
  function convertirFecha(fechaString) {
    var fecha = new Date(fechaString); // Crea un objeto Date a partir de la cadena de fecha

    var dia = fecha.getDate(); // Obtiene el día del mes
    var mes = fecha.getMonth() + 1; // Obtiene el mes (recuerda que los meses van de 0 a 11)
    var anio = fecha.getFullYear().toString().slice(-2); // Obtiene el año y toma los últimos dos dígitos

    // Asegúrate de que el día y el mes tengan siempre dos dígitos
    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }

    var fechaConvertida = dia + "/" + mes + "/" + anio; // Crea la cadena de fecha en el nuevo formato
    return fechaConvertida;
  }

  const diferencia = pesoAnt ? peso.peso - pesoAnt.peso : null;
  let clasePeso = "";

  if (objetivo === "Perdida grasa") {
    clasePeso = diferencia < 0 ? 1 : 0;
  } else if (objetivo === "Ganancia peso") {
    clasePeso = diferencia > 0 ? 1 : 0;
  }

  return (
    peso && (
      <div className={styles.peso}>
        <p>{peso.peso}</p>
        <small>{convertirFecha(peso.fecha)}</small>
        <p
          className={
            clasePeso === 1 ? styles.pesoCorrecto : styles.pesoIncorrecto
          }
        >
          {diferencia > 0 ? `+${diferencia}kg.` : `${diferencia}kg.`}
        </p>
      </div>
    )
  );
}
