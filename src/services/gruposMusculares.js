export const searchGruposMusculares = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/grupoMuscular/");
    return await response.json();
  } catch (e) {
    throw new Error("Error searching grupos musculares");
  }
};

const url = "http://localhost:3000/api/grupoMuscular/";
export const saveGrupoMuscular = async (datos, token) => {
  const existe = datos._id ? true : false;
  const grupoMuscular = datos;
  if (grupoMuscular?.user?._id) {
    grupoMuscular.user = grupoMuscular.user._id;
  }
  //HACER FORM DATA DE TODO PARA ENVIAR
  if (existe) {
    try {
      const response = await fetch(url + grupoMuscular._id, {
        method: "PUT",
        headers: {
          "x-access-token": token,
        },
        body: toFormdata(grupoMuscular),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving grupoMuscular");
    }
  } else {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
        body: toFormdata(grupoMuscular),
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      throw new Error("Error saving grupoMuscular");
    }
  }
};

export const deleteGrupoMuscular = async (id, token) => {
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
    throw new Error("Error deleting grupoMuscular");
  }
};

const toFormdata = (grupoMuscular) => {
  const formData = new FormData();
  formData.append("nombre", grupoMuscular.nombre);
  if (grupoMuscular.image instanceof File) {
    formData.append("image", grupoMuscular.image);
  } else {
    formData.append("image", JSON.stringify(grupoMuscular.image));
  }
  return formData;
};
