import style from "./styles.module.css";
import NuevaPlantillaDatos from "../../components/nuevaPlantillaDatos/NuevaPlantillaDatos";
import { createContext, useState } from "react";
import React from "react";
import NuevaPlantillaEjercicios from "../../components/nuevaPlantillaEjercicios/NuevaPlantillaEjercicios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { isLogged } from "../../components/isLogged";

export const contextPlantilla = createContext();

export default function NuevaPlantilla() {
  isLogged();
  const [datosLogged, setDatosLogged] = useState(false);
  const [datos, setDatos] = useState({});
  return (
    <>
      <contextPlantilla.Provider
        value={{ datosLogged, setDatosLogged, datos, setDatos }}
      >
        {!datosLogged ? (
          <NuevaPlantillaDatos datos={datos} />
        ) : (
          <>
            <span onClick={() => setDatosLogged(false)}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Volver
            </span>
            <NuevaPlantillaEjercicios />
          </>
        )}
      </contextPlantilla.Provider>
    </>
  );
}
