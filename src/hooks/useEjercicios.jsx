import { useEffect, useRef, useState } from "react";
import { searchEjercicios } from "../services/ejercicios";

export function useEjercicios({ busqueda, sort }) {
  const [ejercicios, setEjercicios] = useState([]);
  const [search, setSearch] = useState("");
  const allEjercicios = useRef([]);

  async function fetchEjercicios() {
    var newEjercicios = await searchEjercicios();
    if (sort) {
      newEjercicios = newEjercicios.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
    }
    setEjercicios(newEjercicios);
    allEjercicios.current = newEjercicios;
  }

  useEffect(() => {
    fetchEjercicios();
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const filteredEjercicios = allEjercicios.current.filter((ejercicio) =>
        ejercicio.nombre.toLowerCase().includes(search.toLowerCase())
      );

      setEjercicios(filteredEjercicios);
    } else {
      fetchEjercicios();
    }
  }, [search]);

  return { ejercicios, setSearch };
}
