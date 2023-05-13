import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import EntrenamientosUser from "../entrenamientosUser/entrenamientosUser";
import "react-calendar/dist/Calendar.css";
import CalendarioEntrenamientos from "../../components/calendarioEntrenamientos/calendarioEntrenamientos";
import { getEntrenosUser } from "../../services/entrenos";

export default function App() {
  const { user } = useContext(AppContext);
  console.log(user);
  const rutaImg = "http://localhost:3000/" + user?.image?.imagePath;

  const [entrenos, setEntrenos] = useState([]);

  useEffect(() => {
    const fetchEntrenos = async () => {
      try {
        const result = await getEntrenosUser(user._id);
        setEntrenos(result);
      } catch (error) {
        // Manejar errores de la petición
        console.error("Error al obtener las entrenos:", error);
      }
    };
    if (user?._id) {
      fetchEntrenos();
    }
  }, [user]);

  const [entrenamientosRealizados, setEntrenamientosRealizados] = useState([]);

  return (
    user && (
      <div className={styles.perfil}>
        <div className={styles.infoPersonal}>
          <img src={rutaImg} alt="" />
          <div>
            <h2>{user.username}</h2>
            <small>{user.email}</small>
          </div>
          <p>⚙️</p>
        </div>

        <div className={styles.contenido}>
          <div className={styles.botones}>
            <p>Ver estadísticas</p>
            <button>Peso</button>
            <button>Medidas</button>
            <button>Entrenamientos</button>
            <button>Logros</button>
          </div>
          <div className={styles.calendario}>
            <CalendarioEntrenamientos entrenamientos={entrenos ?? undefined} />
          </div>
          <div className={styles.otroContenido}>
            <h2>Historial entrenamientos</h2>
            <EntrenamientosUser />
          </div>
        </div>
      </div>
    )
  );
}
