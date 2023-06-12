var GrupoMuscular = require("../models/GrupoMuscular.model");
const RoleModel = require("../models/Role.model");

/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    let grupoMusculares = await GrupoMuscular.find();
    res.status(200).json(grupoMusculares);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una grupoMuscular por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
  try {
    let grupoMuscular = await GrupoMuscular.findById(req.params.id);
    res.status(200).json(grupoMuscular);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Creo una grupoMuscular
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
  try {
    const grupoMuscular = req.body;

    const newGrupoMuscular = new GrupoMuscular(grupoMuscular);

    if (req.file) {
      //creo el obj imagen y lo asigno al grupoMuscular
      const newImage = {
        mimeType: req.file.mimetype,
        filename: req.file.filename,
        imagePath: req.file.path,
      };
      newGrupoMuscular.image = newImage;
    }

    const savedGrupoMuscular = await newGrupoMuscular.save();
    //guardo el token y lo devuelvo

    res.status(201).json(savedGrupoMuscular);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Actualizo una grupoMuscular por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = async (req, res, next) => {
  //compruebo si esta editando su propio perfil, si no no puede

  try {
    let grupoMuscular = req.body;
    if (req.file) {
      //creo el obj imagen y lo asigno al grupoMuscular
      const newImage = {
        mimeType: req.file.mimetype,
        filename: req.file.filename,
        imagePath: req.file.path,
      };
      grupoMuscular.image = newImage;
    }
    let newGrupoMuscular = await GrupoMuscular.findByIdAndUpdate(
      req.params.id,
      grupoMuscular,
      {
        new: true,
      }
    );
    res.status(200).json(newGrupoMuscular);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Borro una grupoMuscular por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const remove = async (req, res, next) => {
  try {
    await GrupoMuscular.findByIdAndRemove(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
