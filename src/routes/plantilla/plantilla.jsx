import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { usePlantilla } from "../../hooks/usePlantilla";
import Plantilla from "../../components/plantilla/plantilla";

export default function App() {
  const { id } = useParams();
  const { plantilla } = usePlantilla({ id });

  return (
    <>
      {plantilla ? (
        <Plantilla
          setShowUser={true}
          showDetails={true}
          plantilla={plantilla}
        />
      ) : (
        <p>No se encuentra la plantilla</p>
      )}
    </>
  );
}
