export const searchEjercicios = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/ejercicio/");
    return await response.json();
  } catch (e) {
    throw new Error("Error searching ejercicios");
  }
};
