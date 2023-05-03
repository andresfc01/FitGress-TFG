import { useEjercicios, useFiltro } from "../../hooks/useEjercicios";
import style from "./styles.module.css";
import Ejercicio from "../ejercicio/ejercicio";

export default function Ejercicios() {
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
  } = useFiltro({
    search: "",
    sort: true,
  });

  const pathImg = "http://localhost:3000/";

  return (
    <>
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
                  <img
                    style={{ pointerEvents: "none" }}
                    src={pathImg + grupo?.image?.imagePath}
                    alt=""
                  />
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
