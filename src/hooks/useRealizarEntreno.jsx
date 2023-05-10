import { useEffect } from "react";
import { useState } from "react";
import {
  getPlantilla,
  getPlantillasUser,
  savePlantilla,
} from "../services/plantillas";
import Plantilla from "../components/plantilla/plantilla";

export function useRealizarEntreno({ idPlantilla }) {
  const [plantilla, setPlantilla] = useState(undefined);
  const [selectedSerie, setSelectedSerie] = useState(0);
  const [serieTerminada, setSerieTerminada] = useState(false);
  const [timer, setTimer] = useState(0);
  const [tiempo, setTiempo] = useState("00:00:00");
  const [mostrarTemporizador, setMostrarTemporizador] = useState(false);

  useEffect(() => {
    const fetchPlantilla = async (idPlantilla) => {
      setPlantilla(await getPlantilla(idPlantilla));
    };
    fetchPlantilla(idPlantilla);

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTiempo(convertirSegundosATiempo(timer));
  }, [timer]);

  const handleMostrarTemporizador = () => {
    console.log(mostrarTemporizador);
    setMostrarTemporizador(true);
  };

  const handleTemporizadorDesaparecido = () => {
    setSelectedSerie(selectedSerie + 1);
    setMostrarTemporizador(false);
  };

  function convertirSegundosATiempo(totalSegundos) {
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    const horasStr = horas.toString().padStart(2, "0");
    const minutosStr = minutos.toString().padStart(2, "0");
    const segundosStr = segundos.toString().padStart(2, "0");

    return `${horasStr}:${minutosStr}:${segundosStr}`;
  }

  function handleChangeRepsObj(index) {
    return (ev) => {
      setPlantilla((prevPlantilla) => {
        const updatedSeries = prevPlantilla.series.map((obj, i) => {
          if (i === index) {
            const repsObj = isNaN(ev.target.value)
              ? ""
              : parseInt(ev.target.value);
            return { ...obj, repsObj };
          } else {
            return obj;
          }
        });

        return { ...prevPlantilla, series: updatedSeries };
      });
    };
  }

  function handleChangePesoObj(index) {
    return (ev) => {
      setPlantilla((prevPlantilla) => {
        const updatedSeries = prevPlantilla.series.map((obj, i) => {
          if (i === index) {
            const pesoObj = isNaN(ev.target.value)
              ? ""
              : parseInt(ev.target.value);
            return { ...obj, pesoObj };
          } else {
            return obj;
          }
        });

        return { ...prevPlantilla, series: updatedSeries };
      });
    };
  }

  //TODO
  const handleSaveEntreno = async () => {
    //si es editable y hay cambios
    /* if (editable) {
      const updatedPlantilla = await savePlantilla(plantilla, user.token);
      setPlantilla(updatedPlantilla);
    }
    setEditable(!editable); */
  };

  return {
    plantilla,
    handleChangePesoObj,
    handleChangeRepsObj,
    handleSaveEntreno,
    selectedSerie,
    tiempo,
    mostrarTemporizador,
    handleMostrarTemporizador,
    handleTemporizadorDesaparecido,
  };
}
