import { useEffect, useRef } from "react";
import { getPlantillasUser } from "../services/plantillas";

export function usePlantillasUser({ userId }) {
  const plantillasRef = useRef([]);

 
  useEffect(() => {
    const fetchPlantillas = async () => {
      const plantillas = await getPlantillasUser(userId);
      plantillasRef.current = plantillas;
    };

    if (userId) {
      fetchPlantillas();
    }
  }, []);

  return { plantillas: plantillasRef.current, handleClickPlantilla };
}
