import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export async function isLogged() {
  const navigate = useNavigate();
  const { user } = await useContext(AppContext);

  const isLogged = user && user?.roles && user?.roles.length > 0;

  if (!isLogged) {
    navigate("/login");
  }
}
