import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export function isLogged() {
  const navigate = useNavigate();
  const { user, setShowAlert, setAlertText, setAlertTypeSuccess } =
    useContext(AppContext);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      setAlertText("Debes de iniciar sesión");
      setAlertTypeSuccess(false);
      setShowAlert(true);

      navigate("/login");
    }
  };

  return null; // Opcionalmente, puedes devolver algo aquí si es necesario
}
