import styles from "./styles.module.css";

export default function Plantilla({
  plantilla,
  showUser = false,
  showDetails = false,
} = props) {
  const enumDias = ["L", "M", "X", "J", "V", "S", "D"];

  const calculaTiempo = () => {
    let cont = 0;
    const tiempoPorEjercicio = 30;
    plantilla.series.forEach((serie) => {
      cont += serie.descanso + tiempoPorEjercicio;
    });

    return cont / 60;
  };

  console.log(plantilla);
  return (
    <>
      <div className={styles.plantilla}>
        <img src={"http://localhost:3000/" + plantilla.image.imagePath} alt="" />
        <div>
          <h2>{plantilla.nombre}</h2>
          <label htmlFor="">Dia/s de la Semana</label>
          <ul className={styles.diasSemana}>
            {enumDias.map((dia) => (
              <li
                key={dia}
                className={
                  plantilla.diasSemana.indexOf(dia) > -1 ? styles.diaSelect : ""
                }
                value={dia}
                id={dia}
              >
                {dia}
              </li>
            ))}
          </ul>
          <small>
            Tiempo estimado :{" "}
            <strong>{Math.trunc(calculaTiempo())} min.</strong>
          </small>
        </div>
      </div>
      <hr className={styles.lineaEjercicio} />
    </>
  );
}
