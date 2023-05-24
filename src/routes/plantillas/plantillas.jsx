import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Plantilla from "/src/components/plantilla/plantilla";
import { useEffect, useState } from "react";
import { getPlantillas } from "../../services/plantillas";

export default function App() {
  const [plantillas, setPlantillas] = useState([]);

  useEffect(() => {
    const fetchPlantillas = async () => {
      try {
        const result = await getPlantillas();
        setPlantillas(result);
      } catch (error) {
        // Manejar errores de la petición
        console.error("Error al obtener las plantillas:", error);
      }
    };

    fetchPlantillas();
  }, []);

  return (
    <>
      <h1>Elige tu entrenamiento favorito!</h1>
      
      <div className={styles.plantillas}>
        {plantillas.map((plantilla, cont) => {
          return (
            <Link
              to={`/plantilla/${plantilla?._id}`}
              key={cont}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Plantilla
                setShowUser={true}
                plantilla={plantilla}
                enableClick={true}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
