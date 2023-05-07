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

export const searchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/user/");
    return await response.json();
  } catch (e) {
    throw new Error("Error searching users");
  }
};
