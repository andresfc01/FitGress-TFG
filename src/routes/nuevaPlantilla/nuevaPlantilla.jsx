import React, { useState, useEffect } from "react";
import style from "./styles.module.css";
import ReactSwitch from "react-switch";
import { useNuevaPlantillaDatos } from "../../hooks/useNuevaPlantilla";

export default function NuevaPlantilla() {
  const {
    privado,
    dificultad,
    enumDias,
    nombre,
    image,
    diasSemana,
    handleChangePrivado,
    handleChangeNombre,
    handleDiasSemana,
    onOptionChangeDificultad,
  } = useNuevaPlantillaDatos();

  console.log(diasSemana);

  return (
    <>
      <h1>Ejercicios</h1>

      <label htmlFor="">Nombre plantilla</label>
      <input
        type="text"
        value={nombre}
        onChange={handleChangeNombre}
        placeholder="Entrenamiento pierna, fullbody..."
      />

      <label htmlFor="">Imagen</label>
      <input type="file" name="" id="" />

      <label htmlFor="">Dia/s de la Semana</label>
      <ul className={style.diasSemana}>
        {enumDias.map((dia) => (
          <li
            key={dia}
            className={diasSemana.indexOf(dia) > -1 ? style.diaSelect : ""}
            onClick={handleDiasSemana}
            value={dia}
            id={dia}
          >
            {dia}
          </li>
        ))}
      </ul>

      <label htmlFor="">Privado</label>
      <ReactSwitch
        checked={privado}
        onChange={handleChangePrivado}
        onColor="#1c76c5"
      />
      <h3>Dificultad</h3>
      <div className={style.dificultad}>
        <input
          type="radio"
          name="dificultad"
          value="0"
          id="Principiante"
          checked={dificultad === 0}
          onChange={onOptionChangeDificultad}
        />
        <label
          htmlFor="Principiante"
          className={dificultad === 0 ? style.dificultadSelected : ""}
        >
          Principiante
        </label>

        <input
          type="radio"
          name="dificultad"
          value="1"
          id="Intermedio"
          checked={dificultad === 1}
          onChange={onOptionChangeDificultad}
        />
        <label
          htmlFor="Intermedio"
          className={dificultad === 1 ? style.dificultadSelected : ""}
        >
          Intermedio
        </label>

        <input
          type="radio"
          name="dificultad"
          value="2"
          id="Experto"
          checked={dificultad === 2}
          onChange={onOptionChangeDificultad}
        />
        <label
          htmlFor="Experto"
          className={dificultad === 2 ? style.dificultadSelected : ""}
        >
          Experto
        </label>
      </div>

      <button>Siguiente ➡️</button>
    </>
  );
}
