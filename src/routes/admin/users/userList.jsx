import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DeleteButton,
  EditButton,
} from "react-admin";

const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="username" />
      <EmailField source="email" />
      {/* Mostrar otros campos que desees en la lista */}
      <EditButton basePath="/user" />
      <DeleteButton basePath="/user" />
    </Datagrid>
  </List>
);

export default UserList;
