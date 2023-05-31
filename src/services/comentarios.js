import { searchEjercicios } from "./ejercicios";
import { searchUser, searchUsers } from "./user";

export const saveComentario = async (datos, token) => {
  const url = "http://localhost:3000/api/comentario/";
  const existe = datos._id ? true : false;
  const comentario = toJSON(datos);
  //HACER FORM DATA DE TODO PARA ENVIAR

  if (existe) {
    try {
      const response = await fetch(url + comentario._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(comentario),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
      throw new Error("Error saving comentario");
    }
  } else {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(comentario),
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (e) {
      throw new Error("Error saving comentario");
    }
  }
};

const toJSON = (objeto) => {
  let obj = {
    ...objeto,
  };
  if (objeto.user?._id) {
    obj.user = objeto.user._id;
  } else {
    obj.user = objeto.user;
  }
  if (objeto?.plantilla?._id) {
    obj.plantilla = objeto.plantilla?._id;
  } else {
    obj.plantilla = objeto?.plantilla;
  }

  return obj;
};

export const getComentariosPlantilla = async (plantilla) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/comentario/plantilla/" + plantilla
    );
    return await response.json();
  } catch (e) {
    throw new Error("Error searching comentario");
  }
};
export const getComentarios = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/comentario");
    return await response.json();
  } catch (e) {
    throw new Error("Error searching comentario");
  }
};

export const getComentario = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/api/comentario/" + id);
    return await response.json();
  } catch (e) {
    throw new Error("Error searching comentario");
  }
};

const toFormdata = (comentario) => {
  const formData = new FormData();
  formData.append("texto", comentario.texto);
  formData.append("user", comentario.user);
  formData.append("plantilla", comentario.plantilla);
  return formData;
};
