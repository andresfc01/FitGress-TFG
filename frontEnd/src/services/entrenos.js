import { searchEjercicios } from "./ejercicios";
import { searchUser, searchUsers } from "./user";

export const saveEntreno = async (datos, token) => {
  const url = "http://localhost:3000/api/entrenamiento/";

  const existe = datos._id ? true : false;
  const entreno = datos;
  //HACER FORM DATA DE TODO PARA ENVIAR

  if (existe) {
    try {
      const response = await fetch(url + entreno._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(entreno),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving entreno");
    }
  } else {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(entreno),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving entreno");
    }
  }
};

const toJSON = (objeto) => {
  let seriesModificadas = objeto.series.map((serie) => ({
    ...serie,
    ejercicio: serie.ejercicio._id,
  }));

  return {
    ...objeto,
    series: seriesModificadas,
  };
};

export const getEntrenos = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/entrenamiento");
    return await response.json();
  } catch (e) {
    throw new Error("Error searching entreno");
  }
};
export const getEntrenosUser = async (user) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/entrenamiento/user/" + user
    );
    return await response.json();
  } catch (e) {
    throw new Error("Error searching entreno");
  }
};
export const getEntrenamientosUserPopulated = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/entrenamiento/populated"
    );
    return await response.json();
  } catch (e) {
    throw new Error("Error searching plantilla");
  }
};
export const getEntreno = async (id) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/entrenamiento/" + id
    );
    return await response.json();
  } catch (e) {
    throw new Error("Error searching entreno");
  }
};

const toFormdata = (entreno) => {
  const formData = new FormData();
  formData.append("plantilla", entreno.plantilla);
  formData.append("user", entreno.user._id);
  formData.append("sensaciones", entreno.sensaciones);
  formData.append("duracion", entreno.duracion);
  formData.append("series", JSON.stringify(entreno.series));
  formData.append("comentario", entreno.comentario);
  return formData;
};

export const deleteEntrenamiento = async (id, token) => {
  const url = "http://localhost:3000/api/entrenamiento/";

  try {
    const response = await fetch(url + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    return response.status;
  } catch (e) {
    console.error(e);
    throw new Error("Error deleteing entrenamiento");
  }
};
