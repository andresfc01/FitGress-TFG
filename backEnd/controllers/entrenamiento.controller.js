var Entrenamiento = require("../models/Entrenamiento.model");
const RoleModel = require("../models/Role.model");

/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    let entrenamientoes = await Entrenamiento.find();
    res.status(200).json(entrenamientoes);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una entrenamiento por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
  try {
    let entrenamiento = await Entrenamiento.findById(req.params.id)
      .populate({
        path: "series",
        populate: {
          path: "ejercicio",
          model: "Ejercicio", // Reemplaza 'Ejercicio' con el nombre de tu modelo de ejercicio
        },
      })
      .populate("plantilla");
    res.status(200).json(entrenamiento);
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
    let entrenamientos = await Entrenamiento.find()
      .populate("user")
      .populate("plantilla");
    res.status(200).json(entrenamientos);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una plantillaEntrenamiento por user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getByUser = async (req, res, next) => {
  try {
    let entrenamiento = await Entrenamiento.find({
      user: req.params.userId,
    })
      /* .populate("user") */ // Popula la propiedad 'user' con el objeto completo del usuario
      .populate({
        path: "series",
        populate: {
          path: "ejercicio",
          model: "Ejercicio", // Reemplaza 'Ejercicio' con el nombre de tu modelo de ejercicio
        },
      }) // Popula la propiedad 'ejercicio' con el objeto completo del ejercicio
      .populate("plantilla")
      .exec();

    res.status(200).json(entrenamiento);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Creo una entrenamiento
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
  try {
    const entrenamiento = req.body;
    console.log(entrenamiento);

    const newEntrenamiento = new Entrenamiento(entrenamiento);

    /* if (req.file) {
      //creo el obj imagen y lo asigno al entrenamiento
      const newImage = {
        mimeType: req.file.mimetype,
        filename: req.file.filename,
        imagePath: req.file.path,
      };
      newEntrenamiento.image = newImage;
    } */

    const savedEntrenamiento = await newEntrenamiento.save();
    //guardo el token y lo devuelvo

    res.status(201).json(savedEntrenamiento);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

/**
 * Actualizo una entrenamiento por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = async (req, res, next) => {
  //compruebo si esta editando su propio perfil, si no no puede
  if (req.entrenamientoId == req.body._id) {
    try {
      let entrenamiento = await Entrenamiento.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(entrenamiento);
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
    res.status(402).json("Unauthorized, you can edit only your entrenamiento");
  }
};

/**
 * Borro una entrenamiento por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const remove = async (req, res, next) => {
  try {
    await Entrenamiento.findByIdAndRemove(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  getAll,
  getById,
  getByUser,
  create,
  update,
  remove,
  getAllPopulated,
};
