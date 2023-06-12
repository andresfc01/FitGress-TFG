import React, { useState, useEffect } from "react";
import style from "./styles.module.css";
import ReactSwitch from "react-switch";
import { useNuevaPlantillaDatos } from "../../hooks/useNuevaPlantilla";
import { useContext } from "react";

export default function NuevaPlantillaDatos({ datos }) {
  const {
    privado,
    dificultad,
    enumDias,
    nombre,
    image,
    urlImage,
    diasSemana,
    handleChangePrivado,
    handleChangeNombre,
    handleDiasSemana,
    onOptionChangeDificultad,
    handleChangeImage,
    handleSubmit,
    errors,
  } = useNuevaPlantillaDatos(datos);

  return (
    <>
      <h1>Creación Plantilla</h1>
      <div className="formulario">
        <label htmlFor="">Nombre plantilla</label>
        <input
          type="text"
          value={nombre}
          onChange={handleChangeNombre}
          placeholder="Entrenamiento pierna, fullbody..."
        />
        {errors.nombre && <p className="msgError">{errors.nombre}</p>}

        <label htmlFor="">Imagen</label>
        {urlImage && <img src={urlImage} />}
        <input type="file" name="" id="" onChange={handleChangeImage} />

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
        {errors.diasSemana && <p className="msgError">{errors.diasSemana}</p>}

        <label htmlFor="">Privado</label>
        <ReactSwitch
          checked={privado}
          onChange={handleChangePrivado}
          onColor="#1c76c5"
        />
        <label>Dificultad</label>
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

        <button onClick={handleSubmit}>Siguiente ➡️</button>
        {errors.envio && <p className="msgError">{errors.envio}</p>}
      </div>
    </>
  );
}
