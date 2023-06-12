const { Schema, model } = require("mongoose");

const ComentarioSchema = new Schema(
  {
    texto: {
      type: String,
      required: true,
    },
    plantilla: {
      ref: "PlantillaEntrenamiento",
      type: Schema.Types.ObjectId,
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = model("Comentario", ComentarioSchema);
