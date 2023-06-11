import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import EntrenamientosUser from "../entrenamientosUser/entrenamientosUser";
import PesosUser from "../pesosUser/pesosUser";
import MedidasUser from "../medidasUser/medidasUser";
import LogrosUser from "../logrosUser/logrosUser";
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
        <h1>Perfil</h1>
        <section className={styles.infoPersonal}>
          <div className={styles.datos}>
            <img
              src={
                user?.image?.imagePath
                  ? rutaImg
                  : "src/assets/images/perfilUser.jpg"
              }
              alt=""
            />
            <div>
              <h2>{user.username}</h2>
              <small>{user.email}</small>
            </div>
            <Link to={"/editPerfil"}>
              <p>⚙️</p>
            </Link>
          </div>

          <div className={styles.botones}>
            <p>Ver estadísticas</p>
            <button
              onClick={handleClickEntrenamiento}
              className={showEntrenamientos ? "btnPrincipal" : ""}
            >
              Entrenamientos
            </button>
            <button
              onClick={handleClickPeso}
              className={showPeso ? "btnPrincipal" : ""}
            >
              Peso
            </button>
            <button
              onClick={handleClickMedida}
              className={showMedidas ? "btnPrincipal" : ""}
            >
              Medidas
            </button>
            <button
              onClick={handleClickLogros}
              className={showLogros ? "btnPrincipal" : ""}
            >
              Logros
            </button>
          </div>
        </section>

        <section className={styles.contenido}>
          {showEntrenamientos && (
            <>
              <div className={styles.calendario}>
                <h2>Calendario entrenamientos</h2>
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

          {showLogros && <LogrosUser />}

          {showMedidas && <MedidasUser />}

          {showPeso && <PesosUser />}
        </section>
      </div>
    )
  );
}
