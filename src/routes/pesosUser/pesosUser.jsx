import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import Plantilla from "/src/components/plantilla/plantilla";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getPesosUser } from "../../services/pesos";
import Peso from "../../components/peso/peso";
import EvolucionPesosChart from "../../components/evolucionPesosChart/evolucionPesosChart";

export default function App() {
  const { user } = useContext(AppContext);
  const [id, setId] = useState(undefined);
  const [objetivo, setObjetivo] = useState(undefined);
  const [pesos, setPesos] = useState([]);

  useEffect(() => {
    const fetchPesos = async () => {
      try {
        const result = await getPesosUser(id, user.token);
        setPesos(result);
      } catch (error) {
        // Manejar errores de la petición
        console.error("Error al obtener las pesos:", error);
      }
    };
    setId(user?._id);
    setObjetivo(user?.objetivoFisico);

    if (id) {
      fetchPesos();
    }
  }, [user, id, objetivo]);
  return (
    <>
      <EvolucionPesosChart pesos={pesos} />
      {pesos.length > 0 ? (
        <div className={styles.pesos}>
          {pesos.map((peso, index) => {
            const pesoSiguiente =
              index < pesos.length - 1 ? pesos[index + 1] : null;
            return (
              <Peso
                key={index}
                peso={peso}
                pesoAnt={pesoSiguiente}
                objetivo={objetivo}
              />
            );
          })}
        </div>
      ) : (
        <p>No hay pesos registrados.</p>
      )}
    </>
  );
}
