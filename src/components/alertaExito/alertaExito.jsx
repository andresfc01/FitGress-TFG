import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import style from "./styles.module.css";
import {
  faCheckCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function App({ texto, tiempo, set }) {
  const [addFadeOut, setAddFadeOut] = useState(false);
  setTimeout(() => {
    set(false);
  }, tiempo * 1000);
  setTimeout(() => {
    setAddFadeOut(true);
  }, (tiempo - 0.4) * 1000);
  return (
    <div className={`${style.alertaExito} ${addFadeOut && style.fadeOut}`}>
      <FontAwesomeIcon icon={faCheckCircle} /> {texto}
    </div>
  );
}
