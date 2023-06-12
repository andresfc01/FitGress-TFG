const url = "http://localhost:3000/api/medida/";
export const saveMedida = async (datos, token) => {
  const existe = datos._id ? true : false;
  const medida = datos;
  if (medida?.user?._id) {
    medida.user = medida.user._id;
  }
  //HACER FORM DATA DE TODO PARA ENVIAR

  if (existe) {
    try {
      const response = await fetch(url + medida._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(medida),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving medida");
    }
  } else {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(medida),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving medida");
    }
  }
};

export const deleteMedida = async (id, token) => {
  try {
    const response = await fetch(url + id, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    throw new Error("Error deleting medida");
  }
};

export const getMedidasUser = async (user, token) => {
  try {
    const response = await fetch(url + "user/" + user, {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    throw new Error("Error searching medida");
  }
};
export const getMedidas = async (token) => {
  try {
    const response = await fetch(url + "/populated", {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    throw new Error("Error searching medida");
  }
};
export const getMedida = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/api/medida/" + id);
    return await response.json();
  } catch (e) {
    throw new Error("Error searching medida");
  }
};

const toFormdata = (medida) => {
  const formData = new FormData();
  formData.append("plantilla", medida.plantilla);
  formData.append("user", medida.user._id);
  formData.append("sensaciones", medida.sensaciones);
  formData.append("duracion", medida.duracion);
  formData.append("series", JSON.stringify(medida.series));
  formData.append("comentario", medida.comentario);
  return formData;
};
