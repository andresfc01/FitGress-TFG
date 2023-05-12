import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getEntreno, getEntrenosUser } from "../../services/entrenos";
import Entreno from "../../components/entrenamiento/entrenamiento";

export default function App() {
  const { id } = useParams();
  const [entreno, setEntreno] = useState(undefined);
  console.log(entreno);

  useEffect(() => {
    const fetchEntreno = async () => {
      try {
        const result = await getEntreno(id);
        setEntreno(result);
      } catch (error) {
        // Manejar errores de la petición
        console.error("Error al obtener el entrenamiento : ", error);
      }
    };
    if (id) {
      fetchEntreno();
    }
  }, [id]);

  return <Entreno showDetails={true} entreno={entreno} />;
}
