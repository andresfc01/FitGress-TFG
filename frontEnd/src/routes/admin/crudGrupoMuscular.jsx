import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { searchGruposMusculares } from "../../services/gruposMusculares";
import GrupoMuscularTable from "./grupoMuscularTable";
import { esAdmin } from "../../components/esAdmin";

export default function App() {
  const { user } = useContext(AppContext);
  const [gruposMusculares, setGruposMusculares] = useState(undefined);
  esAdmin();
  useEffect(() => {
    const fetchGruposMusculares = async () => {
      const fechedGruposMusculares = await searchGruposMusculares();
      if (fechedGruposMusculares) {
        setGruposMusculares(fechedGruposMusculares);
      }
    };
    if (user) {
      fetchGruposMusculares(user.token);
    }
  }, [user]);

  return (
    <>
      <h1>Administración Grupos Musculares</h1>
      {gruposMusculares && (
        <GrupoMuscularTable
          gruposMusculares={gruposMusculares}
          token={user?.token}
        ></GrupoMuscularTable>
      )}
    </>
  );
}
