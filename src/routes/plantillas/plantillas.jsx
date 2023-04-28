import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import Plantilla from "/src/components/plantilla/plantilla";

export default function App() {
  //const {id} = useParams();

  const plantillas = [
    {
      id: 1,
      nombre: "A",
      diaSemana: "M",
      img: "./aqui/img.jpg",
    },
    {
      id: 2,
      nombre: "B",
      diaSemana: "L",
      img: "./aqui/img2.jpg",
    },
    {
      id: 3,
      nombre: "C",
      diaSemana: "S",
      img: "./aqui/img3.jpg",
    },
  ];

  return (
    <>
      <div className={styles.plantillas}>
        {plantillas.map((plantilla) => (
          <Plantilla
            id={plantilla.id}
            diaSemana={plantilla.diaSemana}
            img={plantilla.img}
            dificultad={plantilla.dificultad}
          />
        ))}
      </div>
    </>
  );
}
