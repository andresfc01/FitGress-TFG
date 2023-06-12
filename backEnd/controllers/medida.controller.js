var Medida = require("../models/Medida.model");

/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    let medidas = await Medida.find();
    res.status(200).json(medidas);
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
    let medidas = await Medida.find().populate("user");
    res.status(200).json(medidas);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Get todas las medidas de un user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllUser = async (req, res, next) => {
  //encuentra las medidas de un alumno solo
  try {
    var ObjectId = require("mongoose").Types.ObjectId;
    let medidas = await Medida.find({ user: new ObjectId(req.params.user) });
    res.status(200).json(medidas);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una medida por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
  try {
    let medida = await Medida.findById(req.params.id);
    res.status(200).json(medida);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Creo una medida
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
  try {
    console.log(req.body);
    let medida = await Medida.create(req.body);
    res.status(201).json(medida);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Actualizo una medida por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = async (req, res, next) => {
  try {
    let medida = await Medida.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(medida);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Borro una medida por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const remove = async (req, res, next) => {
  try {
    await Medida.findByIdAndRemove(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  getAll,
  getAllUser,
  getById,
  create,
  update,
  remove,
  getAllPopulated,
};
