import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export function esAdmin() {
  const navigate = useNavigate();
  const { user, setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const esAdmin =
        user?.roles &&
        user?.roles.length > 0 &&
        user?.roles.includes("640ed10308e23cd6654b5ebe");

      if (!esAdmin) {
        setAlertText("Debes de ser administrador");
        setAlertTypeSuccess(false);
        setShowAlert(true);
        navigate("/login");
      }
    };

    checkAdminStatus();
  }, [user]);

  return null; // Opcionalmente, puedes devolver algo aquí si es necesario
}
