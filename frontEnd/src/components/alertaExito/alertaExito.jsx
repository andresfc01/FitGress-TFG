import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import style from "./styles.module.css";
import {
  faCheckCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function App({
  texto = "Acción realizada con exito",
  tiempo = 4,
  tipoSuccess = true,
}) {
  const { setShowAlert } = useContext(AppContext);
  const [addFadeOut, setAddFadeOut] = useState(false);
  setTimeout(() => {
    setShowAlert(false);
  }, tiempo * 1000);
  setTimeout(() => {
    setAddFadeOut(true);
  }, (tiempo - 0.4) * 1000);
  return (
    <div
      className={`${tipoSuccess ? style.alertaExito : style.alertaError} ${
        addFadeOut && style.fadeOut
      }`}
    >
      <FontAwesomeIcon icon={faCheckCircle} /> {texto}
    </div>
  );
}
