import { useContext, useEffect, useState } from "react";
import { contextPlantilla } from "../routes/nuevaPlantilla/nuevaPlantilla";

export function useNuevaPlantillaDatos() {
  const [privado, setPrivado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [image, setImage] = useState("");
  const [diasSemana, setDiasSemana] = useState(["L"]);
  const [errors, setErrors] = useState({});
  const [dificultad, setDificultad] = useState(1);
  const enumDias = ["L", "M", "X", "J", "V", "S", "D"];
  let { setDatosLogged, setDatos } = useContext(contextPlantilla);

  useEffect(() => {
    if (nombre.length <= 2) {
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
    setImage(URL.createObjectURL(e.target.files[0]));
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
  };
}

export function useNuevaPlantillaEjercicios() {
  const [ejercicios, setEjercicios] = useState([]);
  const [addEjercicio, setAddEjercicio] = useState(false);
  const [selectedEjercicio, setSelectedEjercicio] = useState(null);

  const handleAddEjercicio = () => {
    setAddEjercicio(true);
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
        if (obj.id == id) {
          return { ...obj, descanso: parseInt(ev.target.value) };
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
        if (obj.id == id) {
          return { ...obj, repsObj: parseInt(ev.target.value) };
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
        if (obj.id == id) {
          return { ...obj, pesoObj: parseInt(ev.target.value) };
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
  };
}
