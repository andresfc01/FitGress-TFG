import styles from "./styles.module.css";
import { AppContext } from "../../App";
import { useRealizarEntreno } from "../../hooks/useRealizarEntreno";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSort } from "@fortawesome/free-solid-svg-icons";
import Ejercicios from "../ejercicios/ejercicios";
import ReactSwitch from "react-switch";
import Temporizador from "../../components/temporizador/temporizador";
import { useContext } from "react";

export default function realizarEntreno({ idPlantilla } = props) {
  const { user } = useContext(AppContext);
  const {
    plantilla: plantillaEntreno,
    handleChangePesoObj,
    handleChangeRepsObj,
    handleSaveEntreno,
    selectedSerie,
    tiempo,
    mostrarTemporizador,
    handleMostrarTemporizador,
    handleTemporizadorDesaparecido,
    handleTerminarEntreno,
    onOptionChangeSensacion,
    sensacion,
    terminado,
    comentario,
    handleChangeComentario,
  } = useRealizarEntreno({ idPlantilla, user });

  const calculaTiempo = () => {
    let cont = 0;
    const tiempoPorEjercicio = 30;

    if (plantillaEntreno.series) {
      plantillaEntreno.series.forEach((serie) => {
        cont += serie.descanso + tiempoPorEjercicio;
      });
    }

    return cont / 60;
  };

  return (
    <>
      {plantillaEntreno && (
        <>
          <p>Tiempo transcurrido : {tiempo}</p>

          <div className={styles.plantilla}>
            <img
              src={
                "http://localhost:3000/" + plantillaEntreno?.image?.imagePath
              }
              alt=""
            />
            <div className={styles.info}>
              <h2>{plantillaEntreno.nombre}</h2>
              <small>
                Tiempo estimado :{" "}
                <strong>{Math.trunc(calculaTiempo())} min.</strong>
              </small>
            </div>

            <hr className={styles.lineaSeries} />
            <div className={styles.headerSeries}>
              <h2 className={styles.titleSeries}>Series</h2>
            </div>

            {plantillaEntreno.series && (
              <>
                <div className={styles.series}>
                  {plantillaEntreno.series.map((obj, count) => (
                    <div className={styles.divSerie} key={count}>
                      <div
                        className={
                          selectedSerie == count
                            ? `${styles.serie} ${styles.serieSelected}`
                            : `${styles.serie}`
                        }
                        id={count}
                        key={count}
                      >
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
                            <input
                              type="number"
                              value={obj.repsObj}
                              onChange={handleChangeRepsObj(count)}
                            />

                            <label htmlFor="">Peso</label>
                            <input
                              type="number"
                              value={obj.pesoObj}
                              onChange={handleChangePesoObj(count)}
                            />

                            <label htmlFor="">Descanso</label>
                            <p type="number">{obj.descanso}</p>
                          </div>
                        </div>
                      </div>

                      {selectedSerie === count && (
                        <>
                          <button onClick={handleMostrarTemporizador}>
                            Terminar Serie
                          </button>
                          {mostrarTemporizador && (
                            <Temporizador
                              onDesaparecido={handleTemporizadorDesaparecido}
                              tiempo={obj.descanso}
                            />
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <button onClick={handleTerminarEntreno}>
            Terminar Entrenamiento
          </button>

          {terminado && (
            <div className={styles.bg}>
              <div className={styles.divSensaciones}>
                <p>Sensaciones</p>
                <div className={styles.puntuacionSensaciones}>
                  <input
                    type="radio"
                    name="sensacion"
                    value="0"
                    id="mal"
                    checked={sensacion === 0}
                    onChange={onOptionChangeSensacion}
                  />
                  <label
                    htmlFor="mal"
                    className={sensacion === 0 ? styles.sensacionSelected : ""}
                  >
                    😢
                  </label>

                  <input
                    type="radio"
                    name="sensacion"
                    value="1"
                    id="normal"
                    checked={sensacion === 1}
                    onChange={onOptionChangeSensacion}
                  />
                  <label
                    htmlFor="normal"
                    className={sensacion === 1 ? styles.sensacionSelected : ""}
                  >
                    🙂
                  </label>

                  <input
                    type="radio"
                    name="sensacion"
                    value="2"
                    id="bien"
                    checked={sensacion === 2}
                    onChange={onOptionChangeSensacion}
                  />
                  <label
                    htmlFor="bien"
                    className={sensacion === 2 ? styles.sensacionSelected : ""}
                  >
                    😁
                  </label>
                </div>
                <label htmlFor="">Comentario (opcional)</label>
                <textarea
                  value={comentario}
                  onChange={handleChangeComentario}
                />

                <button onClick={handleSaveEntreno}>
                  Guardar Entrenamiento
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
