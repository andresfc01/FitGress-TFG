import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export async function esAdmin() {
  const navigate = useNavigate();
  const { user } = await useContext(AppContext);

  const esAdmin =
    user?.roles &&
    user?.roles.length > 0 &&
    user?.roles.includes("640ed10308e23cd6654b5ebe");

  if (!esAdmin) {
    navigate("/login");
  }
}
