import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { savePlantilla } from "../../services/plantillas";
import { useContext } from "react";
import { AppContext } from "../../App";
import { usePlantilla } from "../../hooks/usePlantilla";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSort } from "@fortawesome/free-solid-svg-icons";
import Ejercicios from "../ejercicios/ejercicios";
import ReactSwitch from "react-switch";

export default function Plantilla({
  plantilla,
  showUser = false,
  showDetails = false,
  enableClick = false,
} = props) {
  const { user } = useContext(AppContext);
  const {
    handleChangeDescanso,
    handleChangePesoObj,
    handleChangeRepsObj,
    handleSavePlantilla,
    enumDias,
    editable,
    plantilla: newPlantilla,
    onDragOver,
    onDrop,
    onDragStart,
    selectedSerie,
    handleDuplicateEjercicio,
    deleteEjercicio,
    addEjercicio,
    handleEjercicioClick,
    handleAddEjercicio,
    handleDiasSemana,
    handleChangeNombre,
    onOptionChangeDificultad,
    dificultad,
    privado,
    handleChangePrivado,
  } = usePlantilla({ id: plantilla._id, user });

  var sameUser = false;
  if (user) {
    sameUser = user._id === plantilla.user._id;
  }

  const calculaTiempo = () => {
    let cont = 0;
    const tiempoPorEjercicio = 30;

    if (newPlantilla.series) {
      newPlantilla.series.forEach((serie) => {
        cont += serie.descanso + tiempoPorEjercicio;
      });
    }
    return cont / 60;
  };

  return (
    <>
      {newPlantilla && (
        <>
          {sameUser ? (
            <>
              {showDetails && (
                <button onClick={handleSavePlantilla}>
                  {editable ? "Guardar" : "Editar"}
                </button>
              )}
            </>
          ) : (
            <button>Copiar plantilla</button>
          )}

          <div className={styles.plantilla}>
            <img
              src={"http://localhost:3000/" + newPlantilla?.image?.imagePath}
              alt=""
            />
            <div className={styles.info}>
              {editable ? (
                <input
                  value={newPlantilla.nombre}
                  onChange={handleChangeNombre}
                />
              ) : (
                <h2>{newPlantilla.nombre}</h2>
              )}

              {editable && (
                <>
                  <label htmlFor="">Privado</label>
                  <ReactSwitch
                    checked={privado}
                    onChange={handleChangePrivado}
                    onColor="#1c76c5"
                  />
                  <h3>Dificultad</h3>
                  <div className={styles.dificultad}>
                    <input
                      type="radio"
                      name="dificultad"
                      value="0"
                      id="Principiante"
                      checked={dificultad == 0}
                      onChange={onOptionChangeDificultad}
                    />
                    <label
                      htmlFor="Principiante"
                      className={
                        dificultad == 0 ? styles.dificultadSelected : ""
                      }
                    >
                      Principiante
                    </label>

                    <input
                      type="radio"
                      name="dificultad"
                      value="1"
                      id="Intermedio"
                      checked={dificultad == 1}
                      onChange={onOptionChangeDificultad}
                    />
                    <label
                      htmlFor="Intermedio"
                      className={
                        dificultad == 1 ? styles.dificultadSelected : ""
                      }
                    >
                      Intermedio
                    </label>

                    <input
                      type="radio"
                      name="dificultad"
                      value="2"
                      id="Experto"
                      checked={dificultad == 2}
                      onChange={onOptionChangeDificultad}
                    />
                    <label
                      htmlFor="Experto"
                      className={
                        dificultad == 2 ? styles.dificultadSelected : ""
                      }
                    >
                      Experto
                    </label>
                  </div>
                </>
              )}

              <label htmlFor="">Dia/s de la Semana</label>
              <ul className={styles.diasSemana}>
                {enumDias.map((dia) => (
                  <li
                    key={dia}
                    className={
                      newPlantilla.diasSemana
                        ? newPlantilla?.diasSemana.indexOf(dia) > -1
                          ? styles.diaSelect
                          : ""
                        : ""
                    }
                    onClick={editable ? handleDiasSemana : undefined}
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
                <div className={styles.headerSeries}>
                  <h2 className={styles.titleSeries}>Series</h2>
                  {editable && (
                    <button onClick={handleAddEjercicio}>+ Añadir</button>
                  )}
                </div>
              </>
            )}

            {addEjercicio && (
              <Ejercicios
                modal={true}
                seleccionable={true}
                handleEjercicioClick={handleEjercicioClick}
              />
            )}

            {showDetails && newPlantilla.series && (
              <>
                {" "}
                <div className={styles.series}>
                  {newPlantilla.series.map((obj, count) => (
                    <div key={count} className={styles.divSerie}>
                      <div
                        className={
                          selectedSerie == obj
                            ? `${styles.serie} ${styles.serieOnDrag}`
                            : `${styles.serie}`
                        }
                        onDragOver={editable ? onDragOver : undefined}
                        onDrop={editable ? onDrop : undefined}
                        id={count}
                        draggable={editable ? true : false}
                        onDragStart={editable ? onDragStart(obj) : undefined}
                      >
                        {editable && <FontAwesomeIcon icon={faSort} />}
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
                            {editable ? (
                              <input
                                type="number"
                                value={obj.repsObj}
                                onChange={handleChangeRepsObj(count)}
                              />
                            ) : (
                              <p>{obj.repsObj}</p>
                            )}
                            <label htmlFor="">Peso</label>
                            {editable ? (
                              <input
                                type="number"
                                value={obj.pesoObj}
                                onChange={handleChangePesoObj(count)}
                              />
                            ) : (
                              <p>{obj.pesoObj}</p>
                            )}
                            <label htmlFor="">Descanso</label>
                            {editable ? (
                              <input
                                type="number"
                                value={obj.descanso}
                                onChange={handleChangeDescanso(count)}
                              />
                            ) : (
                              <p>{obj.descanso}</p>
                            )}
                          </div>
                        </div>

                        {editable && (
                          <span
                            className={styles.deleteSerie}
                            onClick={deleteEjercicio(count)}
                          >
                            X
                          </span>
                        )}
                      </div>
                      {editable && (
                        <>
                          <FontAwesomeIcon
                            icon={faPlusCircle}
                            onClick={handleDuplicateEjercicio(count)}
                            className={styles.duplicateSerie}
                          />
                          <hr className={styles.lineaEjercicio} />
                        </>
                      )}
                    </div>
                  ))}
                </div>
                {sameUser && !editable && (
                  <Link
                    to={"/realizarEntreno/" + plantilla._id}
                    className={styles.btnEntrenar}
                  >
                    <button>Comenzar entrenamiento</button>
                  </Link>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
