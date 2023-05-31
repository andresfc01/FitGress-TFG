const apiUrl = "http://localhost:3000"; // Reemplaza con la URL de tu API REST
const resource = "user";

const dataProvider = {
  getList: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      data: data.data,
      total: data.total,
    };
  },
  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      data: data,
    };
  },
  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return {
      data: data,
    };
  },
  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return {
      data: data,
    };
  },
  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    await fetch(url, {
      method: "DELETE",
    });
    return {
      data: params.previousData,
    };
  },
};

export default dataProvider;
