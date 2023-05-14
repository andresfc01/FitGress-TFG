const url = "http://localhost:3000/api/peso/";
export const savePeso = async (datos, token) => {
  const existe = datos._id ? true : false;
  const peso = datos;
  //HACER FORM DATA DE TODO PARA ENVIAR

  if (existe) {
    try {
      const response = await fetch(url + peso._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(peso),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving peso");
    }
  } else {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(peso),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving peso");
    }
  }
};

export const deletePeso = async (id, token) => {
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
    throw new Error("Error deleting peso");
  }
};

export const getPesosUser = async (user, token) => {
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
    throw new Error("Error searching peso");
  }
};
export const getPeso = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/api/peso/" + id);
    return await response.json();
  } catch (e) {
    throw new Error("Error searching peso");
  }
};

const toFormdata = (peso) => {
  const formData = new FormData();
  formData.append("plantilla", peso.plantilla);
  formData.append("user", peso.user._id);
  formData.append("sensaciones", peso.sensaciones);
  formData.append("duracion", peso.duracion);
  formData.append("series", JSON.stringify(peso.series));
  formData.append("comentario", peso.comentario);
  return formData;
};
