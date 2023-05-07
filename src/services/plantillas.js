import { searchEjercicios } from "./ejercicios";
import { searchUser, searchUsers } from "./user";

export const savePlantilla = async (datos, token) => {
  console.log("datos", datos);
  const existe = datos._id ? true : false;
  console.log("existe", existe);
  const plantilla = toJSON(datos);

  if (existe) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/plantillaEntrenamiento/" + datos._id,
        {
          method: "PUT",
          body: JSON.stringify(plantilla),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      return await response.json();
    } catch (e) {
      throw new Error("Error saving plantilla");
    }
  } else {
    try {
      const response = await fetch(
        "http://localhost:3000/api/plantillaEntrenamiento",
        {
          method: "POST",
          body: JSON.stringify(plantilla),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      return await response.json();
    } catch (e) {
      console.log(e);
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
  };
};

export const getPlantillasUser = async (user) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/plantillaEntrenamiento/user/" + user
    );
    return await response.json();
  } catch (e) {
    console.log(e);
    throw new Error("Error searching plantilla");
  }
};
