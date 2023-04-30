import styles from "./styles.module.css";

export default function Ejercicio({ props }) {
  pathImg = "../fazt_course/" + props.image.imagePath;
  return (
    <div className={styles.ejercicio}>
      <h3>{props.nombre}</h3>
      <small>{props.descrip}</small>
      <video src={pathImg} autoPlay controls="none"></video>
    </div>
  );
}
