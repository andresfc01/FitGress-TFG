import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { savePlantilla } from "../../services/plantillas";
import { useContext } from "react";
import { AppContext } from "../../App";
import { usePlantilla } from "../../hooks/usePlantilla";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faComment,
  faCommentDots,
  faPencil,
  faPlusCircle,
  faSave,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import Ejercicios from "../ejercicios/ejercicios";
import ReactSwitch from "react-switch";
import Comentario from "../comentario/comentario";

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
    handleCopiarPlantilla,
    handleClickComentarios,
    comentarios,
    seeComentarios,
    handleClickAddComentario,
    addComentario,
    handleSaveComentario,
    handleChangeComentario,
    comentario,
  } = usePlantilla({ id: plantilla._id, user });

  var sameUser = false;
  if (user) {
    sameUser = user._id === plantilla.user?._id || plantilla.user === user._id;
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
                <button
                  onClick={handleSavePlantilla}
                  className={styles.btnEditar}
                >
                  {editable ? (
                    <FontAwesomeIcon icon={faSave} />
                  ) : (
                    <FontAwesomeIcon icon={faPencil} />
                  )}
                </button>
              )}
            </>
          ) : (
            <>
              {showDetails && (
                <button onClick={handleCopiarPlantilla}>
                  Copiar plantilla
                </button>
              )}
            </>
          )}

          <div className={styles.plantilla}>
            {editable ? (
              <div className={styles.divNombreEdit}>
                <label htmlFor="">Nombre : </label>
                <input
                  value={newPlantilla.nombre}
                  onChange={handleChangeNombre}
                />
              </div>
            ) : (
              <h2>{newPlantilla.nombre}</h2>
            )}
            <img
              src={"http://localhost:3000/" + newPlantilla?.image?.imagePath}
              alt=""
              className={showDetails && styles.imgDetails}
            />

            <div className={styles.info}>
              {!editable && (
                <div className={styles.divDificultad}>
                  <label>Dificultad</label>
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
                </div>
              )}

              {editable && (
                <>
                  <label htmlFor="">Privado</label>
                  <ReactSwitch
                    checked={privado}
                    onChange={handleChangePrivado}
                    onColor="#1c76c5"
                  />
                  <label>Dificultad</label>
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
              {showDetails && (
                <a
                  onClick={handleClickComentarios}
                  className={styles.verComentarios}
                >
                  Ver comentarios <FontAwesomeIcon icon={faCommentDots} />
                </a>
              )}
            </div>

            {seeComentarios && showDetails && (
              <>
                <hr className={styles.lineaSeries} />
                <div className={styles.headerSeries}>
                  <h2 className={styles.titleSeries}>Comentarios</h2>
                  {!addComentario && (
                    <button onClick={handleClickAddComentario}>
                      + Comentar
                    </button>
                  )}
                </div>

                {addComentario && (
                  <div className={styles.addComentario}>
                    <label htmlFor="">Comentario : </label>
                    <input
                      type="text"
                      value={comentario}
                      onChange={handleChangeComentario}
                    />
                    <button onClick={handleSaveComentario}>
                      {/* <FontAwesomeIcon icon={faSave} />  */}Publicar
                    </button>
                    <a onClick={handleClickAddComentario}>Cancelar</a>
                  </div>
                )}

                <div className={styles.divComentarios}>
                  {comentarios &&
                    comentarios.map((comentario, cont) => (
                      <div key={cont}>
                        <Comentario comentario={comentario} />
                      </div>
                    ))}
                  {comentarios && (
                    <FontAwesomeIcon
                      icon={faArrowCircleUp}
                      onClick={handleClickComentarios}
                    ></FontAwesomeIcon>
                  )}
                  {comentarios && comentarios.length === 0 && (
                    <p>No hay comentarios en esta plantilla</p>
                  )}
                </div>
              </>
            )}

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
