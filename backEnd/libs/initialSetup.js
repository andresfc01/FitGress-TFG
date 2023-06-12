const moongose = require("mongoose");
const Role = require("../models/Role.model");

const createRol = async () => {
  const count = await Role.estimatedDocumentCount();

  if (count > 0) return;

  await Promise.all([
    new Role({ name: "user" }).save() /*  */,
    new Role({ name: "admin" }).save(),
  ]);
};

module.exports = createRol;