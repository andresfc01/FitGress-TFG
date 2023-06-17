import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import {
  searchEjercicios,
  searchEjerciciosPopulated,
} from "../../services/ejercicios";
import EjercicioTable from "./ejercicioTable";
import { esAdmin } from "../../components/esAdmin";

export default function App() {
  const { user } = useContext(AppContext);
  const [ejercicios, setEjercicios] = useState(undefined);
  esAdmin();
  useEffect(() => {
    const fetchEjercicios = async (token) => {
      const fechedEjercicios = await searchEjerciciosPopulated(token);
      if (fechedEjercicios) {
        setEjercicios(fechedEjercicios);
      }
    };
    if (user) {
      fetchEjercicios(user.token);
    }
  }, [user]);

  return (
    <>
      <h1>Administración Ejercicios</h1>
      {ejercicios && (
        <EjercicioTable
          ejercicios={ejercicios}
          token={user?.token}
        ></EjercicioTable>
      )}
    </>
  );
}
