import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { searchUsers } from "../../services/user";
import UserTable from "./userTable";

export default function App() {
  const { user } = useContext(AppContext);
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    const fetchUsers = async (token) => {
      const usuarios = await searchUsers(token);
      if (usuarios) {
        console.log(usuarios);
        setUsers(usuarios);
      }
    };
    if (user) {
      fetchUsers(user.token);
    }
  }, [user]);

  return (
    <>
      <h2>Administración Usuarios</h2>
      {users && <UserTable users={users} token={user?.token}></UserTable>}
    </>
  );
}
