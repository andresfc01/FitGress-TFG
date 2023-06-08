import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BotonLogout() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    // redireccionar a la página de inicio u otra página según corresponda
  }

  return (
    <a onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar sesión
    </a>
  );
}
