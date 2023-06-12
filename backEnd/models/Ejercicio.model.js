const { Schema, model } = require("mongoose");

const EjercicioSchema = new Schema(
  {
    grupoMuscular: {
      ref: "GrupoMuscular",
      type: Schema.Types.ObjectId,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    descrip: {
      type: String,
      required: true,
    },
    dificultad: {
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

module.exports = model("Ejercicio", EjercicioSchema);
