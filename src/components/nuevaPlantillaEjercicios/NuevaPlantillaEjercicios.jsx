import React, { useState, useEffect, useContext } from "react";
import style from "./styles.module.css";
import { useNuevaPlantillaEjercicios } from "../../hooks/useNuevaPlantilla";
import Ejercicios from "../ejercicios/ejercicios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faSave,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { contextPlantilla } from "../../routes/nuevaPlantilla/nuevaPlantilla";
import { AppContext } from "../../App";

export default function NuevaPlantillaEjercicios() {
  const {
    ejercicios,
    addEjercicio,
    handleAddEjercicio,
    handleEjercicioClick,
    deleteEjercicio,
    handleChangeDuracion,
    handleChangeRepsObj,
    handleChangePesoObj,
    selectedEjercicio,
    onDrop,
    onDragOver,
    onDragStart,
    handleDuplicateEjercicio,
    handleSave,
  } = useNuevaPlantillaEjercicios();

  const { datos } = useContext(contextPlantilla);
  const { user } = useContext(AppContext);

  return (
    <>
      <h2>Ejercicios Pantilla</h2>
      <button onClick={handleAddEjercicio}>+</button>

      {addEjercicio && (
        <Ejercicios
          modal={true}
          seleccionable={true}
          handleEjercicioClick={handleEjercicioClick}
        />
      )}

      <button
        onClick={handleSave({ ...datos, user: user._id }, user.token)}
        className={style.guardar}
      >
        <FontAwesomeIcon icon={faSave} /> Guardar
      </button>

      <div>
        {ejercicios.length == 0 ? (
          <p>De momento no hay ejercicios</p>
        ) : (
          <div className={style.ejercicios}>
            {ejercicios.map((obj, count) => (
              <div key={count} className={style.divEjercicio}>
                <div
                  className={
                    selectedEjercicio == obj
                      ? `${style.ejercicio} ${style.ejercicioOnDrag}`
                      : `${style.ejercicio}`
                  }
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  key={obj.id}
                  id={obj.id}
                  draggable
                  onDragStart={onDragStart(obj)}
                >
                  <FontAwesomeIcon icon={faSort} />
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
                      <input
                        type="number"
                        value={obj.repsObj}
                        onChange={handleChangeRepsObj(obj.id)}
                      />
                      <label htmlFor="">Peso obj</label>
                      <input
                        type="number"
                        value={obj.pesoObj}
                        onChange={handleChangePesoObj(obj.id)}
                      />
                      <label htmlFor="">Descanso</label>
                      <input
                        type="number"
                        value={obj.descanso}
                        onChange={handleChangeDuracion(obj.id)}
                      />
                    </div>
                  </div>
                  <span onClick={deleteEjercicio(obj.id)}>X</span>
                </div>

                <FontAwesomeIcon
                  icon={faPlusCircle}
                  onClick={handleDuplicateEjercicio(obj.id)}
                  className={style.duplicateEjercicio}
                />
                <hr className={style.lineaEjercicio} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
