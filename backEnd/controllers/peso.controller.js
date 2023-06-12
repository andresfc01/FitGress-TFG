var Peso = require("../models/Peso.model");

/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    let pesos = await Peso.find().populate("user");
    res.status(200).json(pesos);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Get todas las pesos de un user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllUser = async (req, res, next) => {
  //encuentra las pesos de un alumno solo
  try {
    var ObjectId = require("mongoose").Types.ObjectId;
    let pesos = await Peso.find({ user: new ObjectId(req.params.user) })
      .sort({ fecha: -1 })
      .exec();
    res.status(200).json(pesos);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una peso por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
  try {
    let peso = await Peso.findById(req.params.id);
    res.status(200).json(peso);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Creo una peso
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
  try {
    let peso = await Peso.create(req.body);
    res.status(201).json(peso);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Actualizo una peso por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = async (req, res, next) => {
  try {
    let peso = await Peso.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(peso);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Borro una peso por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const remove = async (req, res, next) => {
  try {
    await Peso.findByIdAndRemove(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { getAll, getAllUser, getById, create, update, remove };
