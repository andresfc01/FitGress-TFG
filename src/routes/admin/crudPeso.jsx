import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getPesos } from "../../services/pesos";
import PesoTable from "./pesoTable";

export default function App() {
  const { user } = useContext(AppContext);
  const [pesos, setPesos] = useState(undefined);

  useEffect(() => {
    const fetchPesos = async (token) => {
      const fechedPesos = await getPesos(token);
      if (fechedPesos) {
        setPesos(fechedPesos);
      }
    };
    if (user) {
      fetchPesos(user.token);
    }
  }, [user]);

  return (
    <>
      <h2>Administración Pesos</h2>
      {pesos && <PesoTable pesos={pesos} token={user?.token}></PesoTable>}
    </>
  );
}
