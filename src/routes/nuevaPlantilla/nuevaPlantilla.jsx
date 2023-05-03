import style from "./styles.module.css";
import NuevaPlantillaDatos from "../../components/nuevaPlantillaDatos/NuevaPlantillaDatos";
import { createContext, useState } from "react";
import React from "react";
import NuevaPlantillaEjercicios from "../../components/nuevaPlantillaEjercicios/NuevaPlantillaEjercicios";

export const contextPlantilla = createContext();

export default function NuevaPlantilla() {
  const [datosLogged, setDatosLogged] = useState(false);
  const [datos, setDatos] = useState({});

  return (
    <>
      <contextPlantilla.Provider
        value={{ datosLogged, setDatosLogged, datos, setDatos }}
      >
        {!datosLogged ? <NuevaPlantillaDatos /> : <NuevaPlantillaEjercicios />}
      </contextPlantilla.Provider>
    </>
  );
}
