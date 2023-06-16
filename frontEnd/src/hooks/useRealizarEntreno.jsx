import { useContext, useEffect } from "react";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {
  getPlantilla,
  getPlantillasUser,
  savePlantilla,
} from "../services/plantillas";
import Plantilla from "../components/plantilla/plantilla";
import { saveEntreno } from "../services/entrenos";
import { AppContext } from "../App";

export function useRealizarEntreno({ idPlantilla, user }) {
  const navigate = useNavigate();
  const { setShowAlert, setAlertText } = useContext(AppContext);

  const [plantilla, setPlantilla] = useState(undefined);
  const [selectedSerie, setSelectedSerie] = useState(0);
  const [serieTerminada, setSerieTerminada] = useState(false);
  const [timer, setTimer] = useState(0);
  const [tiempo, setTiempo] = useState("00:00:00");
  const [mostrarTemporizador, setMostrarTemporizador] = useState(false);
  const [terminado, setTerminado] = useState(false);
  const [sensacion, setSensacion] = useState(1);
  const [comentario, setComentario] = useState("");
  const [seriesRealizadas, setSeriesRealizadas] = useState([]);

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
    setMostrarTemporizador(true);
  };

  const handleTemporizadorDesaparecido = () => {
    setSelectedSerie(selectedSerie + 1);
    setMostrarTemporizador(false);

    const nuevasSeriesRealizadas = [];
    for (let i = 0; i < selectedSerie + 1; i++) {
      nuevasSeriesRealizadas.push(plantilla.series[i]);
    }
    setSeriesRealizadas(nuevasSeriesRealizadas);
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
    const entrenamiento = {
      plantilla: plantilla._id,
      user: user?._id,
      sensaciones: sensacion,
      comentario: comentario,
      duracion: timer,
      series: seriesRealizadas,
    };

    entrenamiento.series.forEach((serie, cont) => {
      serie.peso = serie.pesoObj;
      serie.reps = serie.repsObj;
    });

    const newEntreno = await saveEntreno(entrenamiento, user.token);
    if (newEntreno) {
      setAlertText("Entrenamiento Guardado");
      setShowAlert(true);

      navigate("/perfil/entrenamientos");
    }
  };

  const handleTerminarEntreno = async () => {
    setTerminado(true);
  };

  const onOptionChangeSensacion = (ev) => {
    const value = parseInt(ev.target.value);
    setSensacion(value);
  };

  const handleChangeComentario = (ev) => {
    setComentario(ev.target.value);
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
    handleTerminarEntreno,
    onOptionChangeSensacion,
    sensacion,
    terminado,
    comentario,
    handleChangeComentario,
  };
}
