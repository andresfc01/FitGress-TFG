import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import Plantilla from "/src/components/plantilla/plantilla";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getEntrenosUser } from "../../services/entrenos";
import Entreno from "../../components/entrenamiento/entrenamiento";

export default function App() {
  const { user } = useContext(AppContext);
  const [id, setId] = useState(undefined);
  const [entrenos, setEntrenos] = useState([]);

  useEffect(() => {
    const fetchEntrenos = async () => {
      try {
        const result = await getEntrenosUser(id);
        setEntrenos(result);
      } catch (error) {
        // Manejar errores de la petición
        console.error("Error al obtener las entrenos:", error);
      }
    };
    setId(user?._id);
    if (id) {
      fetchEntrenos();
    }
  }, [user, id]);

  return (
    <>
      <div className={styles.entrenos}>
        {entrenos.map((entreno, cont) => {
          return (
            <Link
              to={`/entreno/${entreno?._id}`}
              key={cont}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Entreno
                setShowUser={false}
                entreno={entreno}
                enableClick={true}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
