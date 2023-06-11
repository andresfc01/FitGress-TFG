import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { getEntrenosUser } from "../services/entrenos";

export function usePerfil({ userObj }) {
  const [user, setUser] = useState(undefined);
  const [showPeso, setShowPeso] = useState(false);
  const [showMedidas, setShowMedidas] = useState(true);
  const [showEntrenamientos, setShowEntrenamientos] = useState(false);
  const [showLogros, setShowLogros] = useState(false);
  const [entrenos, setEntrenos] = useState([]);

  useEffect(() => {
    setUser(userObj);
  }, [userObj]);

  const fetchEntrenos = async () => {
    try {
      const result = await getEntrenosUser(user?._id);
      setEntrenos(result);
    } catch (error) {
      // Manejar errores de la petición
    }
  };

  useEffect(() => {
    if (showEntrenamientos && user?._id) {
      fetchEntrenos();
    }
  }, [showEntrenamientos, user]);

  const handleClickPeso = () => {
    !showPeso ? setShowPeso(true) : "";
    showMedidas ? setShowMedidas(false) : "";
    showEntrenamientos ? setShowEntrenamientos(false) : "";
    showLogros ? setShowLogros(false) : "";
  };
  const handleClickMedida = () => {
    showPeso ? setShowPeso(false) : "";
    !showMedidas ? setShowMedidas(true) : "";
    showEntrenamientos ? setShowEntrenamientos(false) : "";
    showLogros ? setShowLogros(false) : "";
  };
  const handleClickEntrenamiento = () => {
    showPeso ? setShowPeso(false) : "";
    showMedidas ? setShowMedidas(false) : "";
    !showEntrenamientos ? setShowEntrenamientos(true) : "";
    showLogros ? setShowLogros(false) : "";
  };
  const handleClickLogros = () => {
    showPeso ? setShowPeso(false) : "";
    showMedidas ? setShowMedidas(false) : "";
    showEntrenamientos ? setShowEntrenamientos(false) : "";
    !showLogros ? setShowLogros(true) : "";
  };

  return {
    showEntrenamientos,
    showLogros,
    showMedidas,
    showPeso,
    handleClickEntrenamiento,
    handleClickLogros,
    handleClickMedida,
    handleClickPeso,
    entrenos,
  };
}
