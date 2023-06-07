export const searchEjercicios = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/ejercicio/");
    return await response.json();
  } catch (e) {
    throw new Error("Error searching ejercicios");
  }
};
export const searchEjerciciosPopulated = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/ejercicio/populated"
    );
    return await response.json();
  } catch (e) {
    throw new Error("Error searching ejercicios");
  }
};

const url = "http://localhost:3000/api/ejercicio/";
export const saveEjercicio = async (datos, token) => {
  const existe = datos._id ? true : false;
  const ejercicio = datos;
  //HACER FORM DATA DE TODO PARA ENVIAR

  if (existe) {
    try {
      const response = await fetch(url + ejercicio._id, {
        method: "PUT",
        headers: {
          "x-access-token": token,
        },
        body: toFormdata(ejercicio),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving ejercicio");
    }
  } else {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: toFormdata(ejercicio),
        headers: {
          "x-access-token": token,
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving ejercicio");
    }
  }
};

const toFormdata = (ejercicio) => {
  const formData = new FormData();
  formData.append("nombre", ejercicio.nombre);
  formData.append("descrip", ejercicio.descrip);
  if (ejercicio.grupoMuscular?._id) {
    formData.append("grupoMuscular", ejercicio.grupoMuscular._id);
  } else {
    formData.append("grupoMuscular", ejercicio.grupoMuscular);
  }
  formData.append("dificultad", ejercicio.dificultad);
  if (ejercicio.image instanceof File) {
    formData.append("image", ejercicio.image);
  } else {
    if (ejercicio.image) {
      formData.append("image", JSON.stringify(ejercicio.image));
    }
  }
  return formData;
};

export const deleteEjercicio = async (id, token) => {
  try {
    const response = await fetch(url + id, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      },
    });
    return response.status;
  } catch (e) {
    console.log(e);
    throw new Error("Error deleting ejercicio");
  }
};
