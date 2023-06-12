import styles from "./styles.module.css";

export default function Entreno({ entreno, showDetails = false } = props) {
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
    entreno && (
      <div
        className={styles.entreno}
        /* style={showDetails && { "padding-top": "2rem" }} */
      >
        <img
          src={"http://localhost:3000/" + entreno?.plantilla?.image?.imagePath}
          alt=""
        />

        <div className={styles.info}>
          <p>
            <i>Fecha : {convertirFecha(entreno?.fecha)}</i>
          </p>
          <h2>{entreno?.plantilla?.nombre}</h2>
          <small>
            Duracion : <strong>{entreno?.duracion} min.</strong>
          </small>
        </div>
        <div className={styles.sensaciones}>
          {entreno.sensaciones === 0 && <>😢</>}
          {entreno.sensaciones === 1 && <>🙂</>}
          {entreno.sensaciones === 2 && <>😁</>}
        </div>

        {showDetails && (
          <>
            <hr className={styles.lineaSeries} />
            <div className={styles.headerSeries}>
              <h2 className={styles.titleSeries}>Series</h2>
            </div>
          </>
        )}

        {showDetails && entreno.series && (
          <>
            <div className={styles.series}>
              {entreno.series.map((obj, count) => (
                <div key={count} className={styles.divSerie}>
                  <div className={styles.serie} id={count}>
                    <video
                      src={
                        "http://localhost:3000/" +
                        obj.ejercicio?.image?.imagePath
                      }
                      autoPlay
                      muted
                      type="video/mp4"
                      loop
                    />
                    <div>
                      <h3>{obj.ejercicio.nombre}</h3>
                      <div>
                        <label htmlFor="">Repeticiones</label>
                        <p>{obj.reps}</p>
                        <label htmlFor="">Peso</label>
                        <p>{obj.peso}</p>
                        <label htmlFor="">Descanso</label>
                        <p>{obj.descanso}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    )
  );
}
