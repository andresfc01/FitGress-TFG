import { Link } from "react-router-dom";
import Ejercicios from "../../components/ejercicios/ejercicios";
import styles from "./styles.module.css";
export default function App() {
  return (
    <div className={styles.ejercicios}>
      <section className={styles.cabeceraEjercicios}>
        <h1>Ejercicio</h1>
        <p>!Explora nuestra galería de ejercicios🏋️‍♂️¡</p>
      </section>
      <section className={styles.llamadaAccion}>
        <p>!Crea tu propia rutina con estos ejercicios💪!</p>
        <Link className="btnSecundario" to={"/nuevaPlantilla"}>
          Crear Plantilla
        </Link>
      </section>
      <section>
        <Ejercicios />
      </section>
    </div>
  );
}
