import { useEjercicios, useFiltro } from "../../hooks/useEjercicios";
import style from "./styles.module.css";
import Ejercicio from "../ejercicio/ejercicio";
import { useState } from "react";

export default function Ejercicios({
  modal,
  seleccionable,
  handleEjercicioClick,
}) {
  /* (seleccionable); */
  const { gruposMusculares, grupoMuscular, loading } = useEjercicios({
    search: "",
    sort: true,
  });

  const {
    filtroGrupo,
    handleClickGrupo,
    handleClickGrupos,
    handleOnChange,
    ejercicios,
    filteredEjercicios,
  } = useFiltro({
    search: "",
    sort: true,
  });

  const pathImg = "http://localhost:3000/";

  const [verTodo, setVerTodo] = useState(false);
  const [grupoActual, setGrupoActual] = useState("");
  const handleClickGrupoCambio = (ev) => {
    handleClickGrupo(ev);
    setGrupoActual(grupoActual !== ev.target.id ? ev.target.id : "");
  };

  return (
    <>
      <section className={style.filtros}>
        <div className={style.filtroGruposMusculares}>
          <button
            onClick={handleClickGrupos}
            className={filtroGrupo ? "btnPrincipal" : "btnSecundario"}
          >
            ⚙️Grupos Musculares🧩
          </button>
          {filtroGrupo && (
            <div className={style.gruposMusculares}>
              {gruposMusculares.map((grupo, count) => (
                <nav
                  className={
                    grupoActual === grupo._id
                      ? `${style.grupoMuscular} ${style.grupoSelected}`
                      : style.grupoMuscular
                  }
                  key={grupo._id}
                  id={grupo._id}
                  onClick={handleClickGrupoCambio}
                >
                  <h4 style={{ pointerEvents: "none" }}>{grupo.nombre}</h4>
                  <img
                    style={{ pointerEvents: "none" }}
                    src={pathImg + grupo?.image?.imagePath}
                    alt=""
                  />
                </nav>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="">🔎Buscar por nombre</label>
          <input
            type="text"
            placeholder="Press de banca, sentadilla..."
            onChange={handleOnChange}
          />
        </div>
      </section>

      <div className={style.ejercicios}>
        {ejercicios.length == 0 ? (
          <p>No se han encontrado resultados</p>
        ) : (
          <>
            {ejercicios.map((ejercicio, cont) => {
              if (cont < 8) {
                return (
                  <Ejercicio
                    key={ejercicio._id}
                    ejercicio={ejercicio}
                    handleEjercicioClick={handleEjercicioClick}
                  />
                );
              } else if (verTodo) {
                return (
                  <Ejercicio
                    key={ejercicio._id}
                    ejercicio={ejercicio}
                    handleEjercicioClick={handleEjercicioClick}
                  />
                );
              }
            })}
          </>
        )}
      </div>
      {ejercicios && ejercicios.length > 8 && (
        <div className={style.divMas}>
          <button className="btnPrincipal" onClick={() => setVerTodo(!verTodo)}>
            {verTodo ? "Ver menos" : "Ver mas"}
          </button>
        </div>
      )}
    </>
  );
}
