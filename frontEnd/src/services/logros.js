const url = "http://localhost:3000/api/logro/";
export const saveLogro = async (datos, token) => {
  const existe = datos._id ? true : false;
  const logro = datos;
  //HACER FORM DATA DE TODO PARA ENVIAR

  if (existe) {
    try {
      const response = await fetch(url + logro._id, {
        method: "PUT",
        headers: {
          "x-access-token": token,
        },
        body: toFormdata(logro),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving logro");
    }
  } else {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: toFormdata(logro),
        headers: {
          "x-access-token": token,
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving logro");
    }
  }
};

const toFormdata = (logro) => {
  const formData = new FormData();
  formData.append("nombre", logro.nombre);
  formData.append("categoria", logro.categoria);
  formData.append("subCategoria", logro.subCategoria);
  formData.append("requisito", logro.requisito);
  if (logro.image instanceof File) {
    formData.append("image", logro.image);
  } else {
    formData.append("image", JSON.stringify(logro.image));
  }
  return formData;
};

export const deleteLogro = async (id, token) => {
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
    throw new Error("Error deleting logro");
  }
};

/* export const getLogrosUser = async (user, token) => {
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
    throw new Error("Error searching logro");
  }
}; */
export const getLogro = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/api/logro/" + id);
    return await response.json();
  } catch (e) {
    throw new Error("Error searching logro");
  }
};

export const getLogros = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/logro");
    return await response.json();
  } catch (e) {
    throw new Error("Error searching logro");
  }
};
