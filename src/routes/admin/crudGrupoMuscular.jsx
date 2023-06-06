import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { searchGruposMusculares } from "../../services/gruposMusculares";
import GrupoMuscularTable from "./grupoMuscularTable";

export default function App() {
  const { user } = useContext(AppContext);
  const [gruposMusculares, setGruposMusculares] = useState(undefined);

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
      <h2>Administración Grupos Musculares</h2>
      {gruposMusculares && (
        <GrupoMuscularTable
          gruposMusculares={gruposMusculares}
          token={user?.token}
        ></GrupoMuscularTable>
      )}
    </>
  );
}
