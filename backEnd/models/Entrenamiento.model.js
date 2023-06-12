const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const { number } = require("yup");

const EntrenamientoSchema = new Schema(
  {
    plantilla: {
      ref: "PlantillaEntrenamiento",
      type: Schema.Types.ObjectId,
      required: true,
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    sensaciones: {
      type: Number,
      enum: [0, 1, 2],
    },
    duracion: {
      type: Number,
    },
    comentario: {
      type: String,
    },
    series: [
      {
        ejercicio: {
          ref: "Ejercicio",
          type: Schema.Types.ObjectId,
          required: true,
        },
        reps: {
          type: Number,
          min: 1,
          max: 100,
          required: true,
        },
        peso: {
          type: Number,
          min: 0,
          max: 1000,
          required: true,
        },
        descanso: {
          type: Number,
          min: 0,
          max: 1000,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Entrenamiento", EntrenamientoSchema);
