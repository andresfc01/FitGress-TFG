var Logro = require("../models/Logro.model");

/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    let Logros = await Logro.find();
    res.status(200).json(Logros);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una Logro por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
  try {
    let Logro = await Logro.findById(req.params.id);
    res.status(200).json(Logro);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Creo una Logro
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
  try {
    let newLogro = req.body;
    console.log(req.body);
    if (req.file) {
      //creo el obj imagen y lo asigno al grupoMuscular
      const newImage = {
        mimeType: req.file.mimetype,
        filename: req.file.filename,
        imagePath: req.file.path,
      };
      newLogro.image = newImage;
    }
    let logro = await Logro.create(newLogro);
    res.status(201).json(logro);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

/**
 * Actualizo una Logro por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = async (req, res, next) => {
  try {
    let logroUpdated = req.body;
    if (req.file) {
      //creo el obj imagen y lo asigno al grupoMuscular
      const newImage = {
        mimeType: req.file.mimetype,
        filename: req.file.filename,
        imagePath: req.file.path,
      };
      logroUpdated.image = newImage;
    }
    console.log(req.file);
    console.log(logroUpdated.image);

    let logro = await Logro.findByIdAndUpdate(req.params.id, logroUpdated, {
      new: true,
    });

    res.status(200).json(logro);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

/**
 * Borro una Logro por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const remove = async (req, res, next) => {
  try {
    await Logro.findByIdAndRemove(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
