const { Schema, model } = require("mongoose");

const RoleSchema = new Schema(
  {
    name: String,
  },
  {
    //versionKey: true,
  }
);

module.exports = model("Role", RoleSchema);
