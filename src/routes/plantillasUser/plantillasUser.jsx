import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import Plantilla from "/src/components/plantilla/plantilla";
import { usePlantillasUser } from "../../hooks/usePlantillasUser";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getPlantillasUser } from "../../services/plantillas";

export default function App() {
  const { user } = useContext(AppContext);
  const [id, setId] = useState(undefined);
  const [plantillas, setPlantillas] = useState([]);

  useEffect(() => {
    const fetchPlantillas = async () => {
      try {
        const result = await getPlantillasUser(id);
        setPlantillas(result);
      } catch (error) {
        // Manejar errores de la petición
        console.error("Error al obtener las plantillas:", error);
      }
    };
    setId(user?._id);
    if (id) {
      fetchPlantillas();
    }
  }, [user, id]);

  return (
    <>
      <div>
        {plantillas.map((plantilla, cont) => {
          return (
            <Plantilla key={cont} setShowUser={false} plantilla={plantilla} />
          );
        })}
      </div>
    </>
  );
}
