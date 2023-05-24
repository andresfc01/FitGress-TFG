import { de } from "date-fns/locale";
import styles from "./styles.module.css";

export default function Logro({
  logro,
  datos,
  objetivo,
  pesoObjetivo,
} = props) {
  function compruebaLogro(logro) {
    if (datos.length === 0) {
      return false;
    }
    //calculo el logro por categoria
    if (logro.categoria === "peso") {
      //cant
      if (logro.subCategoria === "cant") {
        //diff de peso desde el inicio hasata el actual
        const dif = datos[0].peso - datos[datos.length - 1].peso;
        //segun el objetivo
        if (objetivo === "Perdida grasa") {
          return logro.requisito <= Math.abs(dif);
        } else if (objetivo === "Ganancia de peso") {
          if (dif < 0) {
            return logro.requisito <= dif;
          }
        }
      } else if (logro.subCategoria === "porcent") {
        //calc dif en porcentaje
        const perdido = datos[0].peso - datos[datos.length - 1].peso;
        const porPerder = datos[0].peso - pesoObjetivo;
        const dif = perdido / porPerder;
        //segun el objetivo

        if (objetivo === "Perdida grasa") {
          return logro.requisito <= dif;
        } else if (objetivo === "Ganancia de peso") {
          if (dif < 0) {
            return logro.requisito >= Math.abs(dif);
          }
        }
      }
    } else if (logro.categoria === "medida") {
      //cant
      if (logro.subCategoria === "cant") {
        const partesCuerpo = [
          "brazo",
          "muslo",
          "gemelo",
          "pecho",
          "cintura",
          "cadera",
        ];

        // Inicializar los valores iniciales y finales de cada parte del cuerpo
        const valoresPartes = {};
        partesCuerpo.forEach((parte) => {
          valoresPartes[parte] = {
            inicial: null,
            final: null,
          };
        });

        // Recorrer el array de medidas y actualizar los valores iniciales y finales de cada parte del cuerpo
        datos.forEach((medida) => {
          const { parte, medida: valorMedida } = medida;
          if (partesCuerpo.includes(parte)) {
            if (valoresPartes[parte].inicial === null) {
              valoresPartes[parte].inicial = valorMedida;
            }
            valoresPartes[parte].final = valorMedida;
          }
        });

        // Calcular el total de centímetros ganados o perdidos
        let totalCmGanadosPerdidos = 0;
        partesCuerpo.forEach((parte) => {
          const cambio =
            valoresPartes[parte].final - valoresPartes[parte].inicial;
          totalCmGanadosPerdidos += cambio;
        });
        //segun el objetivo
        if (objetivo === "Perdida grasa") {
          return logro.requisito <= Math.abs(totalCmGanadosPerdidos);
        } else if (objetivo === "Ganancia de peso") {
          if (dif < 0) {
            return logro.requisito <= totalCmGanadosPerdidos;
          }
        }
      }
    } else if (logro.categoria === "entrenamiento") {
      //cant
      if (logro.subCategoria === "cant") {
        //diff de peso desde el inicio hasata el actual
        const dif = datos.length;
        //segun el objetivo
        return logro.requisito <= dif;
      }
    }

    return false;
  }
  const logroConseguido = compruebaLogro(logro);

  const pathImg = "http://localhost:3000/" + logro.image.imagePath;
  return (
    <div
      className={
        logroConseguido
          ? `${styles.divLogro} ${styles.logroConseguido}`
          : `${styles.divLogro} ${styles.logroNoConseguido}`
      }
    >
      <img src={pathImg} />
      <h2>{logro.nombre}</h2>
    </div>
  );
}
