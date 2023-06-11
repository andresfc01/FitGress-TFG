import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getEntrenamientosUserPopulated } from "../../services/entrenos";
import EntrenamientoTable from "./entrenamientoTable";
import { esAdmin } from "../../components/esAdmin";

export default function App() {
  const { user } = useContext(AppContext);
  const [entrenamientos, setEntrenamientos] = useState(undefined);
  esAdmin();
  useEffect(() => {
    const fetchEntrenamientos = async () => {
      const fechedEntrenamientos = await getEntrenamientosUserPopulated();
      if (fechedEntrenamientos) {
        setEntrenamientos(fechedEntrenamientos);
      }
    };
    if (user) {
      fetchEntrenamientos(user.token);
    }
  }, [user]);

  return (
    <>
      <h2>Administración Entrenamientos</h2>
      {entrenamientos && (
        <EntrenamientoTable
          entrenamientos={entrenamientos}
          token={user?.token}
        ></EntrenamientoTable>
      )}
    </>
  );
}
