import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getComentarios } from "../../services/comentarios";
import ComentarioTable from "./comentarioTable";
import { esAdmin } from "../../components/esAdmin";

export default function App() {
  const { user } = useContext(AppContext);
  const [comentarios, setComentarios] = useState(undefined);
  esAdmin();
  useEffect(() => {
    const fetchComentarios = async (token) => {
      const fechedComentarios = await getComentarios(token);
      if (fechedComentarios) {
        setComentarios(fechedComentarios);
      }
    };
    if (user) {
      fetchComentarios(user.token);
    }
  }, [user]);

  return (
    <>
      <h1>Administración Comentarios</h1>
      {comentarios && (
        <ComentarioTable
          comentarios={comentarios}
          token={user?.token}
        ></ComentarioTable>
      )}
    </>
  );
}
