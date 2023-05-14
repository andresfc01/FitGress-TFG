import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import Plantilla from "/src/components/plantilla/plantilla";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { deletePeso, getPesosUser, savePeso } from "../../services/pesos";
import Peso from "../../components/peso/peso";
import EvolucionPesosChart from "../../components/evolucionPesosChart/evolucionPesosChart";

export default function App() {
  const { user } = useContext(AppContext);
  const [id, setId] = useState(undefined);
  const [objetivo, setObjetivo] = useState(undefined);
  const [pesos, setPesos] = useState([]);

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
    console.log(pesoId);
    const updatedPesos = pesos.filter((peso) => peso._id !== pesoId);
    setPesos(updatedPesos);
    deletePeso(pesoId, user.token);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
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
    <>
      <button onClick={handleOpenModal}>Añadir peso</button>
      {isModalOpen && (
        <div>
          <form onSubmit={handleAddPeso}>
            <label>
              Peso:
              <input
                type="number"
                value={newPeso}
                onChange={(e) => setNewPeso(parseInt(e.target.value))}
              />
            </label>
            <button type="submit">Aceptar</button>
          </form>
        </div>
      )}

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
                onEdit={handleEditPeso}
                onDelete={handleDeletePeso}
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
