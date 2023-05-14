import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import EntrenamientosUser from "../entrenamientosUser/entrenamientosUser";
import PesosUser from "../pesosUser/pesosUser";
import MedidasUser from "../medidasUser/medidasUser";
import "react-calendar/dist/Calendar.css";
import CalendarioEntrenamientos from "../../components/calendarioEntrenamientos/calendarioEntrenamientos";
import { getEntrenosUser } from "../../services/entrenos";
import { usePerfil } from "../../hooks/usePerfil";

export default function App() {
  const { user } = useContext(AppContext);
  const rutaImg = "http://localhost:3000/" + user?.image?.imagePath;
  const {
    showEntrenamientos,
    showLogros,
    showMedidas,
    showPeso,
    handleClickEntrenamiento,
    handleClickLogros,
    handleClickMedida,
    handleClickPeso,
    entrenos,
  } = usePerfil({ userObj: user });

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
            <button onClick={handleClickPeso}>Peso</button>
            <button onClick={handleClickMedida}>Medidas</button>
            <button onClick={handleClickEntrenamiento}>Entrenamientos</button>
            <button onClick={handleClickLogros}>Logros</button>
          </div>
          {showEntrenamientos && (
            <>
              <div className={styles.calendario}>
                <CalendarioEntrenamientos
                  entrenamientos={entrenos ?? undefined}
                />
              </div>
              <div className={styles.otroContenido}>
                <h2>Historial entrenamientos</h2>
                <EntrenamientosUser />
              </div>
            </>
          )}

          {showLogros && (
            <>
              <h1>Logros</h1>
            </>
          )}

          {showMedidas && <MedidasUser />}

          {showPeso && <PesosUser />}
        </div>
      </div>
    )
  );
}
