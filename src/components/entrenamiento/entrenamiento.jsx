import styles from "./styles.module.css";

export default function Entreno({
  entreno,
  showUser = false,
  showDetails = false,
} = props) {
  console.log(entreno?.plantilla?.image?.imagePath);

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

  return (
    <div className={styles.entreno}>
      <img
        src={"http://localhost:3000/" + entreno?.plantilla?.image?.imagePath}
        alt=""
      />

      <div className={styles.info}>
        <p>
          <i>Fecha : {convertirFecha(entreno.fecha)}</i>
        </p>
        <h2>{entreno.plantilla.nombre}</h2>
        <small>
          Duracion : <strong>{entreno.duracion} min.</strong>
        </small>
      </div>
      <div className={styles.sensaciones}>
        {entreno.sensaciones == 0 && <>😢</>}
        {entreno.sensaciones == 1 && <>🙂</>}
        {entreno.sensaciones == 2 && <>😁</>}
      </div>
    </div>
  );
}
