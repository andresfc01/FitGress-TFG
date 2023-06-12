const { Schema, model } = require("mongoose");

const GrupoMuscularSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    image: {
      mimeType: String,
      filename: String,
      imagePath: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("GrupoMuscular", GrupoMuscularSchema);
1;
