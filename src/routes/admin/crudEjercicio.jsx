import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { searchEjercicios, searchEjerciciosPopulated } from "../../services/ejercicios";
import EjercicioTable from "./ejercicioTable";

export default function App() {
  const { user } = useContext(AppContext);
  const [ejercicios, setEjercicios] = useState(undefined);

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
      <h2>Administración Ejercicios</h2>
      {ejercicios && <EjercicioTable ejercicios={ejercicios} token={user?.token}></EjercicioTable>}
    </>
  );
}
