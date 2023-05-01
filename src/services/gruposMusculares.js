export const searchGruposMusculares = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/grupoMuscular/");
    return await response.json();
  } catch (e) {
    throw new Error("Error searching grupos musculares");
  }
};
