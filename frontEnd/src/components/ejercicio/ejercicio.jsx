import styles from "./styles.module.css";

export default function Ejercicio(props) {
  const { ejercicio } = props;
  const pathImg = "http://localhost:3000/" + ejercicio.image.imagePath;

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div
      className={styles.ejercicio}
      onClick={
        props.handleEjercicioClick
          ? props.handleEjercicioClick(ejercicio)
          : undefined
      }
      ejercicio={ejercicio}
    >
      <h2>{ejercicio.nombre}</h2>
      <p>{capitalizeFirstLetter(ejercicio?.grupoMuscular?.nombre)}</p>
      <small>{ejercicio.descrip}</small>
      <video src={pathImg} autoPlay muted type="video/mp4" loop />
    </div>
  );
}
