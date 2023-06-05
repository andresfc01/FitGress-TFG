import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getMedidas } from "../../services/medidas";
import MedidaTable from "./medidaTable";

export default function App() {
  const { user } = useContext(AppContext);
  const [medidas, setMedidas] = useState(undefined);

  useEffect(() => {
    const fetchMedidas = async (token) => {
      const fechedMedidas = await getMedidas(token);
      if (fechedMedidas) {
        setMedidas(fechedMedidas);
      }
    };
    if (user) {
      fetchMedidas(user.token);
    }
  }, [user]);

  return (
    <>
      <h2>Administración Medidas</h2>
      {medidas && <MedidaTable medidas={medidas} token={user?.token}></MedidaTable>}
    </>
  );
}
