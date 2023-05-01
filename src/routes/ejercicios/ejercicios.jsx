import React, { useState, useEffect } from "react";
import Ejercicio from "../../components/ejercicio/ejercicio";
import style from "./styles.module.css";
import { searchEjercicios } from "../../services/ejercicios";
import { useEjercicios } from "../../hooks/useEjercicios";

export default function Ejercicios() {
  const { ejercicios, setSearch } = useEjercicios({ search: "", sort: true });

  const handleOnChange = (ev) => {
    setSearch(ev.target.value);
  };

  return (
    <>
      <h1>Ejercicios</h1>
      <input
        type="text"
        placeholder="Press de banca, sentadilla..."
        onChange={handleOnChange}
      />
      <div className={style.ejercicios}>
        {ejercicios.map((ejercicio) => (
          <Ejercicio ejercicio={ejercicio} />
        ))}
      </div>
    </>
  );
}
