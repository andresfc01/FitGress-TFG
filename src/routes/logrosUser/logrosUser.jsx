import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getLogros } from "../../services/logros";
import { getMedidasUser } from "../../services/medidas";
import { getEntrenosUser } from "../../services/entrenos";
import Logro from "../../components/logro/logro";
import { getPesosUser } from "../../services/pesos";

export default function App() {
  const { user } = useContext(AppContext);
  const [logros, setLogros] = useState(undefined);
  const [pesos, setPesos] = useState(undefined);
  const [entrenamientos, setEntrenamientos] = useState(undefined);
  const [medidas, setMedidas] = useState(undefined);
  const [logrosPeso, setLogrosPeso] = useState(undefined);
  const [logrosPesoCant, setLogrosPesoCant] = useState(undefined);
  const [logrosPesoPorcent, setLogrosPesoPorcent] = useState(undefined);
  const [logrosEntrenamiento, setLogrosEntrenamiento] = useState(undefined);
  const [logrosMedida, setLogrosMedida] = useState(undefined);

  useEffect(() => {
    if (logrosPeso) {
      const lPesoCant = logrosPeso.filter(
        (logro) => logro.subCategoria === "cant"
      );
      setLogrosPesoCant(lPesoCant);
      const lPesoPorcent = logrosPeso.filter(
        (logro) => logro.subCategoria === "porcent"
      );
      setLogrosPesoPorcent(lPesoPorcent);
    }
  }, [logrosPeso]);

  useEffect(() => {
    const fetchLogros = async () => {
      try {
        const result = await getLogros();
        setLogros(result);
      } catch (error) {
        console.error("Error al obtener las logros:", error);
      }
    };

    fetchLogros();
    const fetchPesos = async () => {
      try {
        const result = await getPesosUser(user?._id, user?.token);
        setPesos(result);
      } catch (error) {
        console.error("Error al obtener los pesos:", error);
      }
    };
    fetchPesos();

    const fetchMedidas = async () => {
      try {
        const result = await getMedidasUser(user?._id, user?.token);
        setMedidas(result);
      } catch (error) {
        console.error("Error al obtener las medidas:", error);
      }
    };
    fetchMedidas();

    const fetchEntrenamientos = async () => {
      try {
        const result = await getEntrenosUser(user?._id, user?.token);
        setEntrenamientos(result);
      } catch (error) {
        console.error("Error al obtener los entrenos :", error);
      }
    };
    fetchEntrenamientos();
  }, []);

  useEffect(() => {
    if (logros) {
      const logrosP = logros.filter((logro) => logro.categoria === "peso");
      const logrosE = logros.filter(
        (logro) => logro.categoria === "entrenamiento"
      );
      const logrosM = logros.filter((logro) => logro.categoria === "medida");
      setLogrosPeso(logrosP);
      setLogrosEntrenamiento(logrosE);
      setLogrosMedida(logrosM);
    }
  }, [logros]);
  console.log(user);
  return (
    <div className={styles.divLogros}>
      {logrosPeso && pesos && (
        <>
          <h2>Logros Pesos</h2>

          <h4>
            Cantidad de kg{" "}
            {user?.objetivoFisico === "Perdida grasa" ? "perdidos" : ""}
            {user?.objetivoFisico === "Ganancia de peso" ? "ganados" : ""}.
          </h4>
          <div className={styles.logros}>
            {logrosPesoCant.map((logro) => {
              return (
                <Logro
                  key={logro.nombre}
                  logro={logro}
                  datos={pesos}
                  objetivo={user?.objetivoFisico}
                  pesoObjetivo={user?.pesoObjetivo}
                />
              );
            })}
          </div>
          <h4>
            Porcentaje de kg{" "}
            {user?.objetivoFisico === "Perdida Grasa" && "perdidos"}
            {user?.objetivoFisico === "Ganancia de peso" && "ganados"} para tu
            objetivo físico.
          </h4>
          <div className={styles.logros}>
            {logrosPesoPorcent.map((logro) => {
              return (
                <Logro
                  key={logro.nombre}
                  logro={logro}
                  datos={pesos}
                  objetivo={user?.objetivoFisico}
                  pesoObjetivo={user?.pesoObjetivo}
                />
              );
            })}
          </div>
        </>
      )}

      {logrosEntrenamiento && entrenamientos && (
        <>
          <h2>Logros Entrenamientos</h2>
          <h4>Cantidad de entrenamientos realizados</h4>
          <div className={styles.logros}>
            {logrosEntrenamiento.map((logro) => {
              return (
                <Logro
                  key={logro.nombre}
                  logro={logro}
                  datos={entrenamientos}
                  objetivo={user?.objetivoFisico}
                />
              );
            })}
          </div>
        </>
      )}

      {logrosMedida && medidas && (
        <>
          <h2>Logros Medidas</h2>
          <h4>
            Cantidad de cm{" "}
            {user?.objetivoFisico === "Perdida grasa" ? "perdidos" : ""}
            {user?.objetivoFisico === "Ganancia de peso" ? "ganados" : ""}.
          </h4>
          <div className={styles.logros}>
            {logrosMedida.map((logro) => {
              return (
                <Logro
                  key={logro.nombre}
                  logro={logro}
                  datos={medidas}
                  objetivo={user?.objetivoFisico}
                  pesoObjetivo={user?.pesoObjetivo}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
