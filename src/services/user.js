export const searchUser = async (id, token) => {
  try {
    const response = await fetch("http://localhost:3000/api/user/" + id, {
      headers: {
        "x-access-token": token,
      },
    });
    return await response.json();
  } catch (e) {
    throw new Error("Error searching plantilla");
  }
};

export const searchUsers = async (token) => {
  try {
    const response = await fetch("http://localhost:3000/api/user/", {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
    throw new Error("Error searching users");
  }
};

export const saveUser = async (datos, token) => {
  const url = "http://localhost:3000/api/user/";

  const existe = datos._id ? true : false;
  const user = datos;
  //HACER FORM DATA DE TODO PARA ENVIAR

  if (existe) {
    try {
      const response = await fetch(url + user._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
      throw new Error("Error saving plantilla");
    }
  }
};

export const deleteUser = async (id, token) => {
  const url = "http://localhost:3000/api/user/";

  try {
    const response = await fetch(url + plantilla._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    return response.status;
  } catch (e) {
    console.error(e);
    throw new Error("Error deleteing user");
  }
};
