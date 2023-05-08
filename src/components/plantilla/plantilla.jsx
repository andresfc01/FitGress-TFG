import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Plantilla({
  plantilla,
  showUser = false,
  showDetails = false,
  enableClick = false,
} = props) {
  const enumDias = ["L", "M", "X", "J", "V", "S", "D"];

  const calculaTiempo = () => {
    let cont = 0;
    const tiempoPorEjercicio = 30;
    plantilla.series.forEach((serie) => {
      cont += serie.descanso + tiempoPorEjercicio;
    });

    return cont / 60;
  };

  return (
    <>
      {plantilla && (
        <>
          <div className={styles.plantilla}>
            <img
              src={"http://localhost:3000/" + plantilla?.image?.imagePath}
              alt=""
            />
            <div className={styles.info}>
              <h2>{plantilla.nombre}</h2>
              <label htmlFor="">Dia/s de la Semana</label>
              <ul className={styles.diasSemana}>
                {enumDias.map((dia) => (
                  <li
                    key={dia}
                    className={
                      plantilla.diasSemana.indexOf(dia) > -1
                        ? styles.diaSelect
                        : ""
                    }
                    value={dia}
                    id={dia}
                  >
                    {dia}
                  </li>
                ))}
              </ul>
              <small>
                Tiempo estimado :{" "}
                <strong>{Math.trunc(calculaTiempo())} min.</strong>
              </small>
            </div>

            {showDetails && (
              <>
                <hr className={styles.lineaSeries} />
                <h2 className={styles.titleSeries}>Series</h2>
              </>
            )}

            {showDetails && (
              <div className={styles.series}>
                {plantilla.series.map((obj, count) => (
                  <div key={count} className={styles.serie}>
                    <video
                      src={
                        "http://localhost:3000/" + obj.ejercicio.image.imagePath
                      }
                      autoPlay
                      muted
                      type="video/mp4"
                      loop
                    />
                    <div>
                      <h3>{obj.ejercicio.nombre}</h3>
                      <div>
                        <label htmlFor="">Repeticiones obj</label>
                        <input type="number" value={obj.repsObj} />
                        <label htmlFor="">Peso obj</label>
                        <input type="number" value={obj.pesoObj} />
                        <label htmlFor="">Descanso</label>
                        <input type="number" value={obj.descanso} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {!showDetails && <hr className={styles.lineaEjercicio} />}
        </>
      )}
    </>
  );
}
