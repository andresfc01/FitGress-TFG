import React, { useState, useEffect } from "react";
import Ejercicio from "../../components/ejercicio/ejercicio";
import style from "./styles.module.css";
import { searchEjercicios } from "../../services/ejercicios";
import { useEjercicios } from "../../hooks/useEjercicios";

export default function Ejercicios() {
  const {
    ejercicios,
    setSearch,
    gruposMusculares,
    grupoMuscular,
    setGrupoMuscular,
    loading,
  } = useEjercicios({
    search: "",
    sort: true,
  });
  const handleOnChange = (ev) => {
    setSearch(ev.target.value);
  };

  const handleClickGrupo = (ev) => {
    if (grupoMuscular !== ev.target.id) {
      setGrupoMuscular(ev.target.id);
    } else {
      setGrupoMuscular("");
    }
  };

  return (
    <>
      <h1>Ejercicios</h1>
      <input
        type="text"
        placeholder="Press de banca, sentadilla..."
        onChange={handleOnChange}
      />
      {loading ? (
        <h1>Cargado</h1>
      ) : (
        <>
          <div>
            {gruposMusculares.current.map((grupo) => (
              <span key={grupo._id} id={grupo._id} onClick={handleClickGrupo}>
                {grupo.nombre}
              </span>
            ))}
          </div>
          <div className={style.ejercicios}>
            {ejercicios.length == 0 ? (
              <p>No se han encontrado resultados</p>
            ) : (
              <>
                {ejercicios.map((ejercicio) => (
                  <Ejercicio key={ejercicio._id} ejercicio={ejercicio} />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
