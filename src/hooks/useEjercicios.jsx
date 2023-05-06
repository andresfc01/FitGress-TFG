import { useEffect, useRef, useState } from "react";
import { searchEjercicios } from "../services/ejercicios";
import { searchGruposMusculares } from "../services/gruposMusculares";

export function useEjercicios({ busqueda, sort }) {
  const [ejercicios, setEjercicios] = useState([]);
  const [grupoMuscular, setGrupoMuscular] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const allEjercicios = useRef([]);
  const allGrupos = useRef([]);
  const previousGrupo = useRef(grupoMuscular);

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

  async function fetchGruposMusculares() {
    var newGrupos = await searchGruposMusculares();
    allGrupos.current = newGrupos;
  }

  useEffect(() => {
    setLoading(true);
    fetchEjercicios();

    fetchGruposMusculares();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const filteredEjercicios = allEjercicios.current.filter((ejercicio) =>
        ejercicio.nombre.toLowerCase().includes(search.toLowerCase())
      );

      setEjercicios(filteredEjercicios);
    } else {
      var newEjercicios = allEjercicios.current;
      if (sort) {
        newEjercicios = newEjercicios.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
      }

      setEjercicios(newEjercicios);
    }
  }, [search]);

  useEffect(() => {
    //si no esta vacio filtro por grupo
    if (grupoMuscular !== "") {
      const filteredEjercicios = allEjercicios.current.filter(
        (ejercicio) => ejercicio.grupoMuscular == grupoMuscular
      );
      setEjercicios(filteredEjercicios);
      //si esta vacio
    } else {
      //si no tiene todos los ejercicios se los asigno
      if (ejercicios != allEjercicios.current) {
        setEjercicios(allEjercicios.current);
      }
    }
  }, [grupoMuscular]);

  return {
    ejercicios,
    setSearch,
    gruposMusculares: allGrupos,
    grupoMuscular,
    setGrupoMuscular,
    loading,
  };
}

export function useFiltro({ busqueda, sort }) {
  const [filtroGrupo, setFiltroGrupo] = useState(false);
  const {
    setSearch,
    setGrupoMuscular,
    grupoMuscular,
    ejercicios,
    setEjercicios,
  } = useEjercicios({
    busqueda,
    sort,
  });

  const handleOnChange = (ev) => {
    setSearch(ev.target.value);
  };

  const handleClickGrupo = (ev) => {
    if (grupoMuscular !== ev.target.id) {
      setGrupoMuscular(ev.target.id);
    } else {
      setGrupoMuscular("");
    }
  };

  const handleClickGrupos = (ev) => {
    setFiltroGrupo(!filtroGrupo);
  };

  return {
    filtroGrupo,
    handleClickGrupo,
    handleClickGrupos,
    handleOnChange,
    ejercicios,
  };
}
