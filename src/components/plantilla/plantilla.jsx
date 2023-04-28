import styles from "./styles.module.css";
import PropTypes from "prop-types";

const plantillaShape = {
  id: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  diasSemana: PropTypes.arrayOf(PropTypes.number),
  privacidad: PropTypes.bool.isRequired,
  img: PropTypes.string.isRequired,
  dificultad: PropTypes.number,
  series: PropTypes.arrayOf({
    ejercicio: PropTypes.string.isRequired,
    repObj: PropTypes.number,
    pesoObj: PropTypes.number,
    descanso: PropTypes.number,
  }),
};

Plantilla.propTypes = PropTypes.shape(plantillaShape);

export default function Plantilla({ id, diaSemana, img, dificultad } = props) {
  return (
    <>
      <div className={styles.plantilla}>
        <p>{id}</p>
        <p>{diaSemana}</p>
        <p>{img}</p>
        <p>{dificultad}</p>
      </div>
    </>
  );
}
