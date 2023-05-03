import style from "./styles.module.css";
import NuevaPlantillaDatos from "../../components/nuevaPlantillaDatos/NuevaPlantillaDatos";
import { createContext, useState } from "react";
import React from "react";

export const contextPlantilla = createContext();

export default function NuevaPlantilla() {
  const [datosLogged, setDatosLogged] = useState(false);
  const [datos, setDatos] = useState({});

  return (
    <>
      <contextPlantilla.Provider
        value={{ datosLogged, setDatosLogged, datos, setDatos }}
      >
        {!datosLogged ? <NuevaPlantillaDatos /> : <h1>sadasd</h1>}
      </contextPlantilla.Provider>
    </>
  );
}
