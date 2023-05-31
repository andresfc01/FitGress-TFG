import React from "react";
import { Create, SimpleForm, TextInput, EmailField } from "react-admin";

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <EmailField source="email" />
      {/* Agregar otros campos que desees crear */}
    </SimpleForm>
  </Create>
);

export default UserCreate;
