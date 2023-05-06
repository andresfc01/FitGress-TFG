import React, { useState, useEffect } from "react";
import style from "./styles.module.css";
import { useNuevaPlantillaEjercicios } from "../../hooks/useNuevaPlantilla";
import Ejercicios from "../ejercicios/ejercicios";

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
    setSelectedEjercicio,
    onDrop,
    onDragOver,
    onDragStart,
  } = useNuevaPlantillaEjercicios();
  console.log(ejercicios);
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

      <div>
        {/* for de los ejercicios que haya */}
        {ejercicios.length == 0 ? (
          <p>De momento no hay ejercicios</p>
        ) : (
          <div onDragOver={onDragOver} onDrop={onDrop}>
            {ejercicios.map((obj) => (
              <div
                className={style.ejercicio}
                key={obj.id}
                id={obj.id}
                draggable
                onDragStart={onDragStart(obj)}
              >
                <video
                  src={"http://localhost:3000/" + obj.ejercicio.image.imagePath}
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
            ))}
          </div>
        )}
      </div>
    </>
  );
}
