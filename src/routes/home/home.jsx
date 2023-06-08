import { Link, useNavigate } from "react-router-dom";
import { getPlantillasMasUsadas } from "../../services/plantillas";
import Plantilla from "../../components/plantilla/plantilla";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logoHorizontal.png";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsProgress,
  faCalendar,
  faSignal,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const navigate = useNavigate();
  const [plantillas, setPlantillas] = useState(undefined);
  useEffect(() => {
    const fetchPlantillas = async () => {
      const plant = await getPlantillasMasUsadas();
      setPlantillas(plant);
    };
    fetchPlantillas();
  }, []);
  return (
    <div className={styles.home}>
      <section className={styles.cabeceraHome}>
        <img src={logo} alt="" />
        <h3>¡Mide y consigue tus objetivos físicos!</h3>
      </section>
      <section className={styles.beneficios}>
        <h2>Beneficios</h2>
        <div className={styles.beneficio}>
          <FontAwesomeIcon icon={faCalendar} />
          <div>
            <h3>Planifica tus entrenamientos</h3>
            <p>Haz tu rutina mas sencilla planificando todo tu progreso</p>
          </div>
        </div>
        <div className={styles.beneficio}>
          <FontAwesomeIcon icon={faBarsProgress} />
          <div>
            <h3>Progresa paso a paso</h3>
            <p>Observa tu progreso y avanza paso a paso</p>
          </div>
        </div>
        <div className={styles.beneficio}>
          <FontAwesomeIcon icon={faUser} />
          <div>
            <h3>Comparte tus plantillas</h3>
            <p>Comparte y prueba entrenamientos con tus amigos</p>
          </div>
        </div>
      </section>
      <section className={styles.llamadaAccion}>
        <p>Comienza tu camino hacia un estilo de vida saludable</p>
        <button className="btnPrincipal">
          <Link to="/register">Regístrate ahora</Link>
        </button>
      </section>
      <section className={styles.plantillas}>
        <h2>Plantillas de entrenamientos mas utilizadas</h2>
        <div>
          {plantillas &&
            plantillas.map((plantilla, cont) => {
              if (cont < 6) {
                return <Plantilla key={plantilla._id} plantilla={plantilla} />;
              }
            })}
        </div>
        {plantillas && plantillas.length > 5 && (
          <button
            className="btnPrincipal"
            onClick={() => navigate("/explorar")}
          >
            Explorar más
          </button>
        )}
      </section>
    </div>
  );
}
