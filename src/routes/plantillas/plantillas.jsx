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
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [showAll, setShowAll] = useState(false);

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
      if (nombreFiltro !== "") {
        filtradas = plantillas.filter((plantilla) =>
          plantilla.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
        );
      }

      setPlantillasFiltradas(filtradas);
    };

    filtrarPlantillas();
  }, [dificultadFiltro, cantidadDiasFiltro, plantillas, nombreFiltro]);

  return (
    <div className={styles.explorar}>
      <div>
        <h1>Elige tu entrenamiento favorito!</h1>
        <p>¡Filtra y busca los mejores entrenamientos para ti 😁!</p>
      </div>

      <section className={styles.filtros}>
        <div>
          <label htmlFor="">Nombre</label>
          <input
            value={nombreFiltro}
            onChange={(e) => setNombreFiltro(e.target.value)}
            placeholder="FullBody, Torso..."
          />
        </div>
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
      </section>
      <section className={styles.plantillas}>
        {plantillasFiltradas?.length > 0 ? (
          <>
            {plantillasFiltradas.map((plantilla, cont) => {
              if (cont < 8) {
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
              } else if (showAll) {
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
              }
            })}
            {plantillasFiltradas.length > 9 && (
              <div className={styles.plantillas}>
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="btnPrincipal"
                >
                  {showAll ? "Mostrar menos" : "Ver mas"}
                </button>
              </div>
            )}
          </>
        ) : (
          <p>No se ha encontrado plantillas.</p>
        )}
      </section>

      <section className={styles.llamadaAccion}>
        <p>¿No encuentras lo qur buscas?</p>
        <Link className="btnSecundario" to={"/nuevaPlantilla"}>
          Crear Plantilla
        </Link>
      </section>
    </div>
  );
}
