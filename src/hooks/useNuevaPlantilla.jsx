import { useContext, useEffect, useRef, useState } from "react";
import { contextPlantilla } from "../routes/nuevaPlantilla/nuevaPlantilla";
import { savePlantilla } from "../services/plantillas";

export function useNuevaPlantillaDatos(datos) {
  const [privado, setPrivado] = useState(datos?.privado ?? false);
  const [nombre, setNombre] = useState(datos?.nombre ?? "");
  const [image, setImage] = useState(datos?.image ?? "");
  const [urlImage, setUrlImage] = useState("");
  const [diasSemana, setDiasSemana] = useState(datos?.diasSemana ?? ["L"]);
  const [errors, setErrors] = useState(datos?.errors ?? {});
  const [dificultad, setDificultad] = useState(datos?.dificultad ?? 1);
  const enumDias = ["L", "M", "X", "J", "V", "S", "D"];
  let { setDatosLogged, setDatos } = useContext(contextPlantilla);

  useEffect(() => {
    if (nombre !== "" && nombre.length <= 2) {
      setErrors({
        ...errors,
        nombre: "Debe de tener 3 carácteres como mínimo",
      });
    } else {
      delete errors.nombre;
    }
  }, [nombre]);

  useEffect(() => {
    if (diasSemana.length == 0) {
      setErrors({
        ...errors,
        diasSemana: "Debe de seleccionar 1 dia como minimo",
      });
    } else {
      delete errors.diasSemana;
    }
  }, [diasSemana]);

  const handleChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    // Puedes validar el tipo y tamaño del archivo aquí
    //setImage(selectedFile);
    setImage(selectedFile);
    setUrlImage(URL.createObjectURL(selectedFile));
  };

  const handleChangePrivado = (val) => {
    setPrivado(val);
  };

  const handleChangeNombre = (ev) => {
    setNombre(ev.target.value);
  };

  const handleDiasSemana = (ev) => {
    let newDias = [...diasSemana];
    let index = newDias.indexOf(ev.target.id);

    if (index > -1) {
      newDias.splice(index, 1);
    } else {
      newDias.push(ev.target.id);
    }
    setDiasSemana(newDias);
  };

  const onOptionChangeDificultad = (ev) => {
    const value = parseInt(ev.target.value);
    setDificultad(value);
  };

  const handleSubmit = (ev) => {
    var size = Object.keys(errors).length;
    if (size > 0) {
      setErrors({
        ...errors,
        envio: "Debes de rellenar todos los datos antes.",
      });
    } else {
      setDatosLogged(true);
      setDatos({ nombre, image, diasSemana, privado, dificultad });
    }
  };

  return {
    privado,
    setPrivado,
    nombre,
    image,
    diasSemana,
    dificultad,
    setDificultad,
    enumDias,
    handleChangePrivado,
    handleChangeNombre,
    handleDiasSemana,
    handleChangeImage,
    handleSubmit,
    onOptionChangeDificultad,
    errors,
    urlImage,
  };
}

export function useNuevaPlantillaEjercicios() {
  const [ejercicios, setEjercicios] = useState([]);
  const [addEjercicio, setAddEjercicio] = useState(false);
  const [selectedEjercicio, setSelectedEjercicio] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const plantilla = useRef({});

  const handleAddEjercicio = () => {
    setAddEjercicio(!addEjercicio);
  };

  const handleSave = (datos, token) => async () => {
    const id = plantilla.current._id;
    plantilla.current = {
      ...datos,
      series: ejercicios,
      _id: id,
    };

    const newPlantilla = await savePlantilla(plantilla.current, token);
    if (newPlantilla) {
      plantilla.current = newPlantilla;
      setShowSuccess(true);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("id");

    const targetIndex = ejercicios.findIndex(
      (ejercicio) => ejercicio.id === parseInt(targetId)
    );

    const selectedEjercicioIndex = ejercicios.findIndex(
      (ejercicio) => ejercicio.id === selectedEjercicio.id
    );

    setEjercicios((prevEjercicios) => {
      const newEjercicios = [...prevEjercicios];
      newEjercicios.splice(selectedEjercicioIndex, 1);
      newEjercicios.splice(targetIndex, 0, selectedEjercicio);

      // Asignar nuevas claves únicas
      const updatedEjercicios = newEjercicios.map((ejercicio, index) => ({
        ...ejercicio,
        id: index + 1,
      }));

      return updatedEjercicios;
    });

    setSelectedEjercicio(null);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const onDragStart = (obj) => (e) => setSelectedEjercicio(obj);

  function deleteEjercicio(id) {
    return () => {
      setEjercicios(ejercicios.filter((obj) => obj.id != id));
    };
  }

  function handleChangeDuracion(id) {
    return (ev) => {
      const newEjercicios = ejercicios.map((obj) => {
        if (obj.id === id) {
          const descanso = isNaN(ev.target.value)
            ? ""
            : parseInt(ev.target.value);
          return { ...obj, descanso };
        } else {
          return obj;
        }
      });

      setEjercicios(newEjercicios);
    };
  }

  function handleChangeRepsObj(id) {
    return (ev) => {
      const newEjercicios = ejercicios.map((obj) => {
        if (obj.id === id) {
          const repsObj = isNaN(ev.target.value)
            ? ""
            : parseInt(ev.target.value);
          return { ...obj, repsObj };
        } else {
          return obj;
        }
      });

      setEjercicios(newEjercicios);
    };
  }

  function handleChangePesoObj(id) {
    return (ev) => {
      const newEjercicios = ejercicios.map((obj) => {
        if (obj.id === id) {
          const pesoObj = isNaN(ev.target.value)
            ? ""
            : parseInt(ev.target.value);
          return { ...obj, pesoObj };
        } else {
          return obj;
        }
      });

      setEjercicios(newEjercicios);
    };
  }

  function handleEjercicioClick(ejercicio) {
    return () => {
      let long = ejercicios.length;
      setEjercicios([
        ...ejercicios,
        { ejercicio, descanso: 90, repsObj: 12, pesoObj: 30, id: long + 1 },
      ]);
      setAddEjercicio(false);
    };
  }

  const handleDuplicateEjercicio = (id) => () => {
    const ejercicioToDuplicate = ejercicios.find((obj) => obj.id === id);
    if (ejercicioToDuplicate) {
      const index = ejercicios.findIndex((obj) => obj.id === id);
      const duplicatedEjercicio = {
        ...ejercicioToDuplicate,
        id: ejercicios.length + 1,
      };
      //para que se inserte despues del original, no al final
      setEjercicios((prevEjercicios) => [
        ...prevEjercicios.slice(0, index + 1),
        duplicatedEjercicio,
        ...prevEjercicios.slice(index + 1),
      ]);
    }
  };

  return {
    ejercicios,
    handleAddEjercicio,
    addEjercicio,
    handleEjercicioClick,
    deleteEjercicio,
    handleChangeDuracion,
    handleChangeRepsObj,
    handleChangePesoObj,
    onDragOver,
    onDrop,
    onDragStart,
    selectedEjercicio,
    handleDuplicateEjercicio,
    handleSave,
    showSuccess,
    setShowSuccess,
  };
}
