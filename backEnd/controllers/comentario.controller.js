var Comentario = require("../models/Comentario.model");
var Ejercicio = require("../models/Ejercicio.model");
var User = require("../models/User.model");

/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    let comentarios = await Comentario.find()
      .populate("user")
      .populate("plantilla");
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una comentario por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
  try {
    let comentario = await Comentario.findById(req.params.id)
      .populate("user") // Popula la propiedad 'user' con el objeto completo del usuario
      .populate("comentario") // Popula la propiedad 'ejercicio' con el objeto completo del ejercicio
      .exec();
    res.status(200).json(comentario);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una comentario por user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getByPlantilla = async (req, res, next) => {
  try {
    let comentario = await Comentario.find({
      comentario: req.params.idPlantilla,
    })
      .populate("user") // Popula la propiedad 'user' con el objeto completo del usuario
      .exec();
    res.status(200).json(comentario);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Creo una comentario
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
  try {
    const comentario = req.body;
    const newComentario = new Comentario(comentario);
    const savedComentario = await newComentario.save();

    const populatedComentario = await Comentario.findById(savedComentario._id)
      .populate("user") // Popula la propiedad 'user' con el objeto completo del usuario
      .populate("plantilla") // Popula la propiedad 'plantilla' con el objeto completo de la plantilla
      .exec();

    res.status(201).json(populatedComentario);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

/**
 * Actualizo una comentario por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = async (req, res, next) => {
  //compruebo si esta editando su propio perfil, si no no puede
  const comentario = req.body;

  try {
    let updatedComentario = await Comentario.findByIdAndUpdate(
      req.params.id,
      comentario,
      {
        new: true,
      }
    );
    res.status(200).json(updatedComentario);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

/**
 * Borro una comentario por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const remove = async (req, res, next) => {
  try {
    await Comentario.findByIdAndRemove(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByPlantilla,
};
