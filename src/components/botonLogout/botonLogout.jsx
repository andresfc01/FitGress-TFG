import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

export default function BotonLogout() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    // redireccionar a la página de inicio u otra página según corresponda
  }

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}
