import { useEffect } from "react";
import { useState } from "react";
import { getPlantilla, getPlantillasUser } from "../services/plantillas";

export function usePlantilla({ id }) {
  const [plantilla, setPlantilla] = useState(undefined);

  useEffect(() => {
    const fetchPlantilla = async (id) => {
      setPlantilla(await getPlantilla(id));
    };
    fetchPlantilla(id);
  }, []);

  return {
    plantilla,
  };
}
