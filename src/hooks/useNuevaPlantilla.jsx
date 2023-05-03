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
    console.log("asdas");
    var size = Object.keys(errors).length;
    if (size > 0) {
      setErrors({
        ...errors,
        envio: "Debes de rellenar todos los datos antes.",
      });
    } else {
      console.log("asadasdfadgfasdsdas");
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
