import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getPlantillasUserPopulated } from "../../services/plantillas";
import PlantillaTable from "./plantillaTable";
import { esAdmin } from "../../components/esAdmin";

export default function App() {
  const { user } = useContext(AppContext);
  const [plantillas, setPlantillas] = useState(undefined);
  esAdmin();
  useEffect(() => {
    const fetchPlantillas = async () => {
      const fechedPlantillas = await getPlantillasUserPopulated();
      if (fechedPlantillas) {
        setPlantillas(fechedPlantillas);
      }
    };
    if (user) {
      fetchPlantillas(user.token);
    }
  }, [user]);

  return (
    <>
      <h1>Administración Plantillas</h1>
      {plantillas && (
        <PlantillaTable
          plantillas={plantillas}
          token={user?.token}
        ></PlantillaTable>
      )}
    </>
  );
}
