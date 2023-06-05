import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getLogros } from "../../services/logros";
import LogroTable from "./logroTable";

export default function App() {
  const { user } = useContext(AppContext);
  const [logros, setLogros] = useState(undefined);

  useEffect(() => {
    const fetchLogros = async (token) => {
      const fechedLogros = await getLogros(token);
      if (fechedLogros) {
        setLogros(fechedLogros);
      }
    };
    if (user) {
      fetchLogros(user.token);
    }
  }, [user]);

  return (
    <>
      <h2>Administración Logros</h2>
      {logros && <LogroTable logros={logros} token={user?.token}></LogroTable>}
    </>
  );
}
