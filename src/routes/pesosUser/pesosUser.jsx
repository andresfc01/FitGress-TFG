import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import Plantilla from "/src/components/plantilla/plantilla";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { deletePeso, getPesosUser, savePeso } from "../../services/pesos";
import Peso from "../../components/peso/peso";
import EvolucionPesosChart from "../../components/evolucionPesosChart/evolucionPesosChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const { user } = useContext(AppContext);
  const [id, setId] = useState(undefined);
  const [objetivo, setObjetivo] = useState(undefined);
  const [pesos, setPesos] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPeso, setNewPeso] = useState("");

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

  const handleEditPeso = (pesoId, newPeso) => {
    const updatedPesos = pesos.map((peso) => {
      if (peso._id === pesoId) {
        return { ...peso, peso: newPeso };
      }
      return peso;
    });
    setPesos(updatedPesos);

    const updatedPeso = updatedPesos.find((peso) => peso._id === pesoId);
    savePeso(updatedPeso, user.token);
  };

  const handleDeletePeso = (pesoId) => {
    const updatedPesos = pesos.filter((peso) => peso._id !== pesoId);
    setPesos(updatedPesos);
    deletePeso(pesoId, user.token);
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddPeso = async (e) => {
    e.preventDefault();

    // Llamar a savePeso para guardar el nuevo peso en el servidor
    try {
      const pesoData = {
        user: user._id,
        peso: newPeso,
        /* fecha: new Date().toISOString(), */
      };

      // Llamar a la función savePeso y guardar el resultado en una variable
      const result = await savePeso(pesoData, user.token);

      // Agregar el nuevo peso al array de pesos en el estado
      setPesos((prevPesos) => [result, ...prevPesos]);

      // Cerrar el modal y reiniciar el estado del nuevo peso
      setIsModalOpen(false);
      setNewPeso("");
    } catch (error) {
      console.error("Error al guardar el peso:", error);
      // Manejar el error de guardar el peso en el servidor
    }
  };

  return (
    <div className={styles.todo}>
      <div className={styles.btnAddPeso}>
        <button onClick={handleOpenModal}>
          {isModalOpen ? "Añade tu peso" : "+ Añadir peso"}
        </button>
      </div>

      {isModalOpen && (
        <form onSubmit={handleAddPeso} className={styles.addPeso}>
          <label>Peso:</label>
          <input
            type="number"
            value={newPeso}
            onChange={(e) => setNewPeso(parseInt(e.target.value))}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSave} /> Aceptar
          </button>
          <p onClick={() => setIsModalOpen(false)}>Cancelar</p>
        </form>
      )}
      <h2>Evolución pesos</h2>
      <EvolucionPesosChart pesos={pesos} />

      {pesos.length > 0 ? (
        <div className={styles.pesos}>
          <h2>Historial Pesos</h2>

          {pesos.map((peso, index) => {
            if (index < 10) {
              const pesoSiguiente =
                index < pesos.length - 1 ? pesos[index + 1] : null;
              return (
                <Peso
                  key={index}
                  peso={peso}
                  pesoAnt={pesoSiguiente}
                  objetivo={objetivo}
                  onEdit={handleEditPeso}
                  onDelete={handleDeletePeso}
                />
              );
            } else if (showAll) {
              const pesoSiguiente =
                index < pesos.length - 1 ? pesos[index + 1] : null;
              return (
                <Peso
                  key={index}
                  peso={peso}
                  pesoAnt={pesoSiguiente}
                  objetivo={objetivo}
                  onEdit={handleEditPeso}
                  onDelete={handleDeletePeso}
                />
              );
            }
          })}
          {pesos.length > 10 && (
            <div className={styles.pesos}>
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
        <p>No hay pesos registrados.</p>
      )}
    </div>
  );
}
