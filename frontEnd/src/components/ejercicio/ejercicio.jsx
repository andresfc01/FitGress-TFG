import styles from "./styles.module.css";

export default function Ejercicio(props) {
  const { ejercicio } = props;
  const pathImg = "http://localhost:3000/" + ejercicio.image.imagePath;
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
      <small>{ejercicio.descrip}</small>
      <video src={pathImg} autoPlay muted type="video/mp4" loop />
    </div>
  );
}
