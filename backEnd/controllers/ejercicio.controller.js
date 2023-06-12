var Ejercicio = require("../models/Ejercicio.model");

/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    let ejercicios = await Ejercicio.find();
    res.status(200).json(ejercicios);
  } catch (error) {
    res.status(401).json(error);
  }
};
/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllPopulated = async (req, res, next) => {
  try {
    let ejercicios = await Ejercicio.find().populate("grupoMuscular");
    res.status(200).json(ejercicios);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

/**
 * Consigo una ejercicio por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
  try {
    let ejercicio = await Ejercicio.findById(req.params.id);
    res.status(200).json(ejercicio);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Creo una ejercicio
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
  try {
    let ej = req.body;
    if (req.file) {
      //creo el obj imagen y lo asigno al user
      const newImage = {
        mimeType: req.file.mimetype,
        filename: req.file.filename,
        imagePath: req.file.path,
      };
      ej.image = newImage;
    }

    let ejercicio = await Ejercicio.create(ej);
    res.status(201).json(ejercicio);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Actualizo una ejercicio por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = async (req, res, next) => {
  try {
    let ejercicio = await Ejercicio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(ejercicio);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Borro una ejercicio por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const remove = async (req, res, next) => {
  try {
    await Ejercicio.findByIdAndRemove(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { getAll, getById, create, update, remove, getAllPopulated };
