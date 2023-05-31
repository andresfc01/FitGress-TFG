import React from "react";
import { Admin, Resource } from "react-admin";
import UserList from "./users/userList";
import UserEdit from "./users/userEdit";
import UserCreate from "./users/userCreate";
import UserDataProvider from "./users/dataprovider";
import restProvider from "ra-data-simple-rest";
const App = () => (
  <Admin dataProvider={restProvider("http://localhost:3000/api/")}>
    <Resource name="user" list={UserList} />
  </Admin>
);

export default App;
