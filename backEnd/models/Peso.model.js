const { Schema, model } = require("mongoose");

const PesoSchema = new Schema(
  {
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    peso: {
      type: Number,
      min: 10,
      max: 300,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Peso", PesoSchema);
