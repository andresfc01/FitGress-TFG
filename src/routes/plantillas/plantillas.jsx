import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Plantilla from "/src/components/plantilla/plantilla";
import { useEffect, useState } from "react";
import { getPlantillas } from "../../services/plantillas";

export default function App() {
  const [plantillas, setPlantillas] = useState([]);
  const [plantillasFiltradas, setPlantillasFiltradas] = useState([]);
  const [dificultadFiltro, setDificultadFiltro] = useState(null);
  const [cantidadDiasFiltro, setCantidadDiasFiltro] = useState(null);

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
    <>
      <h1>Elige tu entrenamiento favorito!</h1>
      <div>
        <select
          value={dificultadFiltro || ""}
          onChange={(e) => setDificultadFiltro(e.target.value || null)}
        >
          <option value="">Todas las dificultades</option>
          <option value="0">Fácil</option>
          <option value="1">Intermedia</option>
          <option value="2">Difícil</option>
        </select>
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
      <div className={styles.plantillas}>
        {plantillasFiltradas?.length > 0 ? (
          <>
            {plantillasFiltradas.map((plantilla, cont) => {
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
          </>
        ) : (
          <p>No se ha encontrado plantillas.</p>
        )}
      </div>
    </>
  );
}
