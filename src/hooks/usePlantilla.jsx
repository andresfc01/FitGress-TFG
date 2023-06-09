import { useEffect } from "react";
import { useState } from "react";
import {
  getPlantilla,
  getPlantillasUser,
  savePlantilla,
} from "../services/plantillas";
import Plantilla from "../components/plantilla/plantilla";
import { useNavigate } from "react-router-dom";
import {
  getComentariosPlantilla,
  saveComentario,
} from "../services/comentarios";

export function usePlantilla({ id, user }) {
  const [plantilla, setPlantilla] = useState(undefined);
  const enumDias = ["L", "M", "X", "J", "V", "S", "D"];
  const [nombre, setNombre] = useState("");
  const [editable, setEditable] = useState(false);
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [addEjercicio, setAddEjercicio] = useState(false);
  const [diasSemana, setDiasSemana] = useState(plantilla?.diasSemana);
  const [dificultad, setDificultad] = useState(plantilla?.dificultad);
  const [privado, setPrivado] = useState(false);
  const [comentarios, setComentarios] = useState(undefined);
  const [seeComentarios, setSeeComentarios] = useState(false);
  const [addComentario, setAddComentario] = useState(false);
  const [comentario, setComentario] = useState("");

  const navigate = useNavigate();

  const handleClickComentarios = (ev) => {
    ev.preventDefault();
    setSeeComentarios(!seeComentarios);
  };

  useEffect(() => {
    const fecthComentarios = async (id) => {
      setComentarios(await getComentariosPlantilla(id));
    };
    if (!comentarios && seeComentarios) {
      fecthComentarios(plantilla?._id);
    }
  }, [seeComentarios]);

  useEffect(() => {
    const fetchPlantilla = async (id) => {
      setPlantilla(await getPlantilla(id));
    };
    fetchPlantilla(id);
  }, []);

  useEffect(() => {
    setDiasSemana(plantilla?.diasSemana);
    setNombre(plantilla?.nombre);
    setPrivado(plantilla?.privado);
    setDificultad(plantilla?.dificultad);
  }, [plantilla]);

  const handleChangePrivado = (val) => {
    setPlantilla({ ...plantilla, privado: val });
  };

  function handleChangeDescanso(index) {
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

  const handleSavePlantilla = async () => {
    //si es editable y hay cambios
    if (editable) {
      const updatedPlantilla = await savePlantilla(plantilla, user.token);
      setPlantilla(updatedPlantilla);
    }
    setEditable(!editable);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("id");

    const targetIndex = plantilla.series.findIndex(
      (serie) => serie.id === parseInt(targetId)
    );

    const selectedSerieIndex = plantilla.series.findIndex(
      (serie) => serie.id === selectedSerie.id
    );

    setPlantilla((prevPlantilla) => {
      const newSeries = [...prevPlantilla.series];
      newSeries.splice(selectedSerieIndex, 1);
      newSeries.splice(targetIndex, 0, selectedSerie);

      // Asignar nuevas claves únicas
      const updatedPlantilla = {
        ...prevPlantilla,
        series: newSeries.map((serie, index) => ({
          ...serie,
          id: index + 1,
        })),
      };
      return updatedPlantilla;
    });

    setSelectedSerie(null);
  };

  const handleCopiarPlantilla = async () => {
    var plantillaCopia = {
      ...plantilla,
      user: user._id,
      plantillaRef: plantilla._id,
    };
    delete plantillaCopia._id;

    const newPlantilla = await savePlantilla(plantillaCopia, user.token);
    if (newPlantilla) {
      navigate("/plantilla/" + newPlantilla._id);
      setPlantilla(newPlantilla);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDragStart = (obj) => (e) => {
    setSelectedSerie(obj);
  };

  const deleteEjercicio = (count) => () => {
    setPlantilla((prevPlantilla) => {
      const updatedSeries = prevPlantilla.series.filter(
        (obj, index) => count !== index
      );
      return { ...prevPlantilla, series: updatedSeries };
    });
  };

  const handleDuplicateEjercicio = (count) => () => {
    const ejercicioToDuplicate = plantilla.series[count];
    if (ejercicioToDuplicate) {
      const index = count;
      const duplicatedEjercicio = ejercicioToDuplicate;

      //para que se inserte después del original, no al final
      setPlantilla((prevPlantilla) => {
        const newSeries = [
          ...prevPlantilla.series.slice(0, index + 1),
          duplicatedEjercicio,
          ...prevPlantilla.series.slice(index + 1),
        ];
        return {
          ...prevPlantilla,
          series: newSeries,
        };
      });
    }
  };

  function handleEjercicioClick(ejercicio) {
    return () => {
      setPlantilla({
        ...plantilla,
        series: [
          ...plantilla.series,
          { ejercicio, descanso: 90, repsObj: 12, pesoObj: 30 },
        ],
      });
      setAddEjercicio(false);
    };
  }

  const handleAddEjercicio = () => {
    setAddEjercicio(true);
  };

  const handleDiasSemana = (ev) => {
    let newDias = [...diasSemana];
    let index = newDias.indexOf(ev.target.id);

    if (index > -1) {
      newDias.splice(index, 1);
    } else {
      newDias.push(ev.target.id);
    }
    setPlantilla({ ...plantilla, diasSemana: newDias });
  };

  const handleChangeNombre = (ev) => {
    setPlantilla({ ...plantilla, nombre: ev.target.value });
  };

  const onOptionChangeDificultad = (ev) => {
    const value = parseInt(ev.target.value);
    setPlantilla({ ...plantilla, dificultad: value });
  };

  const handleClickAddComentario = () => {
    setAddComentario(!addComentario);
  };

  const handleSaveComentario = async () => {
    const newComentario = await saveComentario(
      {
        texto: comentario,
        user: user?._id,
        plantilla: plantilla?._id,
      },
      user.token
    );

    if (newComentario) {
      debugger;
      newComentario.user = user;
      newComentario.plantilla = plantilla;
      setComentarios([...comentarios, newComentario]);
      setAddComentario(false);
    }
  };

  const handleChangeComentario = (ev) => {
    setComentario(ev.target.value);
  };

  return {
    plantilla,
    handleChangeDescanso,
    handleChangePesoObj,
    handleChangeRepsObj,
    handleSavePlantilla,
    enumDias,
    editable,
    onDragOver,
    onDrop,
    onDragStart,
    selectedSerie,
    handleDuplicateEjercicio,
    deleteEjercicio,
    addEjercicio,
    handleEjercicioClick,
    handleAddEjercicio,
    handleDiasSemana,
    handleChangeNombre,
    onOptionChangeDificultad,
    dificultad,
    privado,
    handleChangePrivado,
    handleCopiarPlantilla,
    handleClickComentarios,
    comentarios,
    seeComentarios,
    handleClickAddComentario,
    addComentario,
    handleSaveComentario,
    comentario,
    handleChangeComentario,
  };
}
