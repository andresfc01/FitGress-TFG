const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { response } = require("express");

const PlantillaEntrenamientoSchema = new Schema(
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
    diasSemana: [
      {
        type: String,
        enum: ["L", "M", "X", "J", "V", "S", "D"],
      },
    ],
    privado: {
      type: Boolean,
      default: true,
    },
    dificultad: {
      type: String,
      enum: [0, 1, 2],
    },
    series: [
      {
        ejercicio: {
          ref: "Ejercicio",
          type: Schema.Types.ObjectId,
          required: true,
        },
        descanso: {
          type: Number,
          min: 0,
          max: 300,
          required: true,
        },
        repsObj: {
          type: Number,
          min: 1,
          max: 100,
          required: true,
        },
        pesoObj: {
          type: Number,
          min: 0,
          max: 1000,
          required: true,
        },
      },
    ],
    plantillaRef: {
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

module.exports = model("PlantillaEntrenamiento", PlantillaEntrenamientoSchema);
