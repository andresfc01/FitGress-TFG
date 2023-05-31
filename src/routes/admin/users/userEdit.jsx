import React from "react";
import { Edit, SimpleForm, TextInput, EmailField } from "react-admin";

const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <EmailField source="email" />
      {/* Agregar otros campos que desees editar */}
    </SimpleForm>
  </Edit>
);

export default UserEdit;
