import { useState } from "react";

export function useNuevaPlantillaDatos() {
  const [privado, setPrivado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [image, setImage] = useState("");
  const [diasSemana, setDiasSemana] = useState(["L"]);
  const [errors, setErrors] = useState({});
  const [dificultad, setDificultad] = useState(1);
  const enumDias = ["L", "M", "X", "J", "V", "S", "D"];

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
    onOptionChangeDificultad,
    errors,
  };
}
