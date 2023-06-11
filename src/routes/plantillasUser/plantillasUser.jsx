import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import Plantilla from "/src/components/plantilla/plantilla";
import { usePlantillasUser } from "../../hooks/usePlantillasUser";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getPlantillasUser } from "../../services/plantillas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { isLogged } from "../../components/isLogged";

export default function App() {
  isLogged();
  const { user } = useContext(AppContext);
  const [id, setId] = useState(undefined);
  const [plantillas, setPlantillas] = useState([]);
  const [plantillasFiltradas, setPlantillasFiltradas] = useState([]);
  const [dificultadFiltro, setDificultadFiltro] = useState(null);
  const [cantidadDiasFiltro, setCantidadDiasFiltro] = useState(null);

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

  useEffect(() => {
    const filtrarPlantillas = () => {
      let filtradas = plantillas;

      // Aplicar filtro de dificultad
      if (dificultadFiltro !== null) {
        filtradas = filtradas.filter(
          (plantilla) => plantilla.dificultad === dificultadFiltro
        );
      }

      // Aplicar filtro de cantidad de días
      if (cantidadDiasFiltro !== null) {
        filtradas = filtradas.filter(
          (plantilla) => plantilla.diasSemana.length === cantidadDiasFiltro
        );
      }

      setPlantillasFiltradas(filtradas);
    };

    filtrarPlantillas();
  }, [dificultadFiltro, cantidadDiasFiltro, plantillas]);

  return (
    <div className={styles.plantillasUser}>
      <section>
        <h1>
          Plantillas entrenamiento <strong>{user?.username}</strong>
        </h1>
        <p>¡Mira tu rutinas de entrenamiento y empieza a entrenar💪!</p>
      </section>
      <section className={styles.filtros}>
        <div>
          <label htmlFor="">Dificultad</label>
          <select
            value={dificultadFiltro || ""}
            onChange={(e) => setDificultadFiltro(e.target.value || null)}
          >
            <option value="">Todas las dificultades</option>
            <option value="0">Fácil</option>
            <option value="1">Intermedia</option>
            <option value="2">Difícil</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Cantidad de dias</label>
          <select
            value={
              cantidadDiasFiltro !== null ? cantidadDiasFiltro.toString() : ""
            }
            onChange={(e) =>
              setCantidadDiasFiltro(parseInt(e.target.value) || null)
            }
          >
            <option value="">Cualquier cantidad de días</option>
            <option value="1">1 día</option>
            <option value="2">2 días</option>
            <option value="3">3 días</option>
            <option value="4">4 días</option>
            <option value="5">5 días</option>
            <option value="6">6 días</option>
            <option value="7">7 días</option>
          </select>
        </div>
        <button className="btnPrincipal">
          <Link to={"/nuevaPlantilla"}>
            <FontAwesomeIcon icon={faPlusCircle} /> Crear
          </Link>
        </button>
      </section>
      <section className={styles.plantillas}>
        {plantillasFiltradas && plantillasFiltradas.length > 0 ? (
          plantillasFiltradas.map((plantilla, cont) => {
            return (
              <Link
                to={`/plantilla/${plantilla?._id}`}
                key={cont}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Plantilla
                  setShowUser={false}
                  plantilla={plantilla}
                  enableClick={true}
                />
              </Link>
            );
          })
        ) : (
          <p>No se han encontrado plantillas</p>
        )}
      </section>
    </div>
  );
}
