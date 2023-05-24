import { searchEjercicios } from "./ejercicios";
import { searchUser, searchUsers } from "./user";

export const savePlantilla = async (datos, token) => {
  const url = "http://localhost:3000/api/plantillaEntrenamiento/";

  const existe = datos._id ? true : false;
  const plantilla = toJSON(datos);
  //HACER FORM DATA DE TODO PARA ENVIAR

  if (existe) {
    try {
      const response = await fetch(url + plantilla._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(plantilla),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
      throw new Error("Error saving plantilla");
    }
  } else {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: toFormdata(plantilla),
        headers: {
          "x-access-token": token,
        },
      });
      return await response.json();
    } catch (e) {
      throw new Error("Error saving plantilla");
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
    user: objeto.user._id,
  };
};

export const getPlantillasUser = async (user) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/plantillaEntrenamiento/user/" + user
    );
    return await response.json();
  } catch (e) {
    throw new Error("Error searching plantilla");
  }
};
export const getPlantillas = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/plantillaEntrenamiento"
    );
    return await response.json();
  } catch (e) {
    throw new Error("Error searching plantilla");
  }
};
export const getPlantilla = async (id) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/plantillaEntrenamiento/" + id
    );
    return await response.json();
  } catch (e) {
    throw new Error("Error searching plantilla");
  }
};

const toFormdata = (plantilla) => {
  const formData = new FormData();
  formData.append("nombre", plantilla.nombre);
  formData.append("diasSemana", JSON.stringify(plantilla.diasSemana));
  formData.append("dificultad", plantilla.dificultad);
  formData.append("privado", plantilla.privado);
  formData.append("series", JSON.stringify(plantilla.series));
  formData.append("user", plantilla.user._id);
  formData.append("image", plantilla.image.imagePath);
  return formData;
};
