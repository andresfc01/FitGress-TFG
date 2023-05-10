import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import styles from "./styles.module.css"; // Asegúrate de importar tus estilos

export default function Temporizador({ tiempo, onDesaparecido } = props) {
  const [sec, setSec] = useState(tiempo);
  const sound = new Howl({ src: ["/src/assets/sonidoSerie.mp3"] });
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setSec((prevSec) => prevSec - 1);
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (sec === 0) {
      console.log("first");
      sound.play();
      clearInterval(timer.current);
      setTimeout(() => {
        onDesaparecido();
      }, sound.duration() * 1000);
    }

    return () => {
      clearInterval(timer);
      sound.stop();
    };
  }, [sec]);

  const handleSaltar = () => {
    setSec(0);
  };

  const handleIncrementarTiempo = () => {
    setSec(sec + 15);
  };

  const handleDecrementarTiempo = () => {
    setSec(sec - 15);
  };

  if (sec <= 0) {
    return null;
  }

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.circle}>
          <div className={styles.stopwatch}>
            {sec}
          </div>
          <div className={styles.buttons}>
            <span onClick={handleDecrementarTiempo}>-</span>
            <span onClick={handleSaltar}>Saltar</span>
            <span onClick={handleIncrementarTiempo}>+</span>
          </div>
        </div>
      </div>
    </>
  );
}
