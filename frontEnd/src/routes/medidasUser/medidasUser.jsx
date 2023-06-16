import styles from "./styles.module.css";
import { Link, useParams } from "react-router-dom";
import Plantilla from "/src/components/plantilla/plantilla";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import {
  deleteMedida,
  getMedidasUser,
  saveMedida,
} from "../../services/medidas";
import Medida from "../../components/medida/medida";
import EvolucionMedidasChart from "../../components/evolucionMedidasChart/evolucionMedidasChart";
import { isLogged } from "../../components/isLogged";

const partesCuerpo = ["brazo", "muslo", "gemelo", "pecho", "cintura", "cadera"];

export default function App() {
  isLogged();
  const { setShowAlert, setAlertText } = useContext(AppContext);

  const { user } = useContext(AppContext);
  const [id, setId] = useState(undefined);
  const [objetivo, setObjetivo] = useState(undefined);
  const [medidas, setMedidas] = useState([]);
  const [ultimasMedidas, setUltimasMedidas] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMedida, setNewMedida] = useState("");
  const [selectedParte, setSelectedParte] = useState("");
  const [parte, setParte] = useState("");
  const [medidasParte, setMedidasParte] = useState("");

  useEffect(() => {
    const newMedidas = medidas.filter((medida) => medida.parte === parte);
    setMedidasParte(newMedidas);
  }, [parte, medidas]);

  useEffect(() => {
    const fetchMedidas = async () => {
      try {
        const result = await getMedidasUser(id, user.token);
        setMedidas([...result].reverse());
        setUltimasMedidas(obtenerUltimasMedidas(result));
      } catch (error) {
        // Manejar errores de la petición
        console.error("Error al obtener las medidas:", error);
      }
    };
    setId(user?._id);
    setObjetivo(user?.objetivoFisico);

    if (id) {
      fetchMedidas();
    }
  }, [user, id, objetivo]);

  const obtenerUltimasMedidas = (medidas) => {
    const ultimasMedidas = {};
    partesCuerpo.forEach((parte) => {
      const medidaParte = medidas.find((medida) => medida.parte === parte);
      if (medidaParte) {
        ultimasMedidas[parte] = medidaParte.medida;
      } else {
        ultimasMedidas[parte] = "No hay medida";
      }
    });
    return ultimasMedidas;
  };

  const handleEditMedida = (medidaId, newMedida) => {
    const updatedMedidas = medidas.map((medida) => {
      if (medida._id === medidaId) {
        return { ...medida, medida: newMedida };
      }
      return medida;
    });
    setMedidas(updatedMedidas);

    const updatedMedida = updatedMedidas.find(
      (medida) => medida._id === medidaId
    );
    const savedMedida = saveMedida(updatedMedida, user.token);
    if (savedMedida) {
      setAlertText("Medida guardada");
      setShowAlert(true);
    }
  };

  const handleDeleteMedida = (medidaId) => {
    const updatedMedidas = medidas.filter((medida) => medida._id !== medidaId);
    setMedidas(updatedMedidas);
    deleteMedida(medidaId, user.token);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddMedida = async (e) => {
    e.preventDefault();

    if (!selectedParte) {
      // Validar que se haya seleccionado una parte del cuerpo
      return;
    }

    // Llamar a saveMedida para guardar el nuevo medida en el servidor
    try {
      const medidaData = {
        user: user._id,
        parte: selectedParte, // Agregar la parte del cuerpo seleccionada
        medida: newMedida,
      };

      const result = await saveMedida(medidaData, user.token);

      if (result) {
        // Agregar el nuevo medida al array de medidas en el estado
        setMedidas([result, ...medidas]);
        setUltimasMedidas(obtenerUltimasMedidas([result, ...medidas]));

        // Cerrar el modal y reiniciar el estado del nuevo medida
        setIsModalOpen(false);
        setNewMedida("");
        setSelectedParte("");

        setAlertText("Medida guardada");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error al guardar el medida:", error);
      // Manejar el error de guardar el medida en el servidor
    }
  };

  return (
    <div className={styles.todo}>
      <div className={styles.divUltimasMedidas}>
        <p>Ultimas medidas</p>
        <div className={styles.ultimasMedidas}>
          {partesCuerpo.map((parte) => (
            <p key={parte}>
              {parte}: <strong>{ultimasMedidas[parte]}</strong>cm.
            </p>
          ))}
        </div>
      </div>

      <button onClick={handleOpenModal}>+ Añadir medida</button>
      {isModalOpen && (
        <form onSubmit={handleAddMedida} className={styles.addMedida}>
          <label>
            Parte del cuerpo:
            <select
              value={selectedParte}
              onChange={(e) => setSelectedParte(e.target.value)}
            >
              {partesCuerpo.map((parte) => (
                <option key={parte} value={parte}>
                  {parte}
                </option>
              ))}
            </select>
          </label>
          <label>
            Medida:
            <input
              type="number"
              value={newMedida}
              onChange={(e) => setNewMedida(parseInt(e.target.value))}
            />
          </label>
          <p type="submit" onClick={handleAddMedida}>
            ✅ Guardar
          </p>
          <p onClick={() => setIsModalOpen(false)}>Cancelar</p>
        </form>
      )}

      <label>
        Parte del cuerpo:
        <select value={parte} onChange={(e) => setParte(e.target.value)}>
          <option value="">Seleccionar parte del cuerpo</option>
          {partesCuerpo.map((parte) => (
            <option key={parte} value={parte}>
              {parte}
            </option>
          ))}
        </select>
      </label>

      {parte !== "" && (
        <>
          <EvolucionMedidasChart medidas={medidasParte} key={parte} />
          {medidasParte.length > 0 ? (
            <div className={styles.medidas}>
              <h2>Historial medidas {parte}</h2>
              {medidasParte.map((medida, index) => {
                const medidaSiguiente =
                  index < medidasParte.length - 1
                    ? medidasParte[index + 1]
                    : null;
                return (
                  <Medida
                    key={index}
                    medida={medida}
                    parte={parte}
                    medidaAnt={medidaSiguiente}
                    objetivo={objetivo}
                    onEdit={handleEditMedida}
                    onDelete={handleDeleteMedida}
                  />
                );
              })}
            </div>
          ) : (
            <p>No hay medidas registradas.</p>
          )}
        </>
      )}
    </div>
  );
}
