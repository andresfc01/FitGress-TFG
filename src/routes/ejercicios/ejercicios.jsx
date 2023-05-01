import React, { useState, useEffect } from "react";
import Ejercicio from "../../components/ejercicio/ejercicio";
import style from "./styles.module.css";
import { searchEjercicios } from "../../services/ejercicios";
import { useEjercicios } from "../../hooks/useEjercicios";
import { Audio } from "react-loader-spinner";
import Loader from "../../components/loader/loaders";

export default function Ejercicios() {
  const {
    ejercicios,
    setSearch,
    gruposMusculares,
    grupoMuscular,
    setGrupoMuscular,
    loading,
  } = useEjercicios({
    search: "",
    sort: true,
  });

  const [filtroGrupo, setFiltroGrupo] = useState(false);

  const handleOnChange = (ev) => {
    setSearch(ev.target.value);
  };

  const handleClickGrupo = (ev) => {
    if (grupoMuscular !== ev.target.id) {
      setGrupoMuscular(ev.target.id);
    } else {
      setGrupoMuscular("");
    }
  };

  const handleClickGrupos = (ev) => {
    setFiltroGrupo(!filtroGrupo);
  };

  const pathImg = "http://localhost:3000/";
  return (
    <>
      <h1>Ejercicios</h1>
      <label htmlFor="">🔎Buscar por nombre</label>
      <input
        type="text"
        placeholder="Press de banca, sentadilla..."
        onChange={handleOnChange}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <button onClick={handleClickGrupos}>⚙️Grupos Musculares🧩</button>
          {filtroGrupo && (
            <div className={style.gruposMusculares}>
              {gruposMusculares.current.map((grupo) => (
                <nav
                  className={
                    grupoMuscular === grupo._id
                      ? `${style.grupoMuscular} ${style.grupoSelected}`
                      : style.grupoMuscular
                  }
                  key={grupo._id}
                  id={grupo._id}
                  onClick={handleClickGrupo}
                >
                  <h4 style={{ pointerEvents: "none" }}>{grupo.nombre}</h4>
                  <img style={{ pointerEvents: "none" }}src={pathImg + grupo?.image?.imagePath} alt="" />
                </nav>
              ))}
            </div>
          )}

          <div className={style.ejercicios}>
            {ejercicios.length == 0 ? (
              <p>No se han encontrado resultados</p>
            ) : (
              <>
                {ejercicios.map((ejercicio) => (
                  <Ejercicio key={ejercicio._id} ejercicio={ejercicio} />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
