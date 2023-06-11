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
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchEntrenos = async () => {
      try {
        const result = await getEntrenosUser(id);
        setEntrenos(result);
      } catch (error) {
        // Manejar errores de la petición
      }
    };
    setId(user?._id);
    if (id) {
      fetchEntrenos();
    }
  }, [user, id]);

  return (
    <>
      {entrenos.length > 0 ? (
        <div className={styles.entrenos}>
          {entrenos.map((entreno, cont) => {
            if (cont < 9) {
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
            } else if (showAll) {
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
            }
          })}
          {entrenos.length > 9 && (
            <div className={styles.entrenos}>
              <button
                onClick={() => setShowAll(!showAll)}
                className="btnPrincipal"
              >
                {showAll ? "Mostrar menos" : "Ver mas"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No hay entrenamientos registrados.</p>
      )}
    </>
  );
}
