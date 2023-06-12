const { Schema, model } = require("mongoose");

const Logroschema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      enum: ["peso", "medida", "entrenamiento"],
      required: true,
    },
    subCategoria: {
      type: String,
      enum: ["cant", "porcent"],
      required: true,
    },
    requisito: {
      type: Number,
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

module.exports = model("Logro", Logroschema);
