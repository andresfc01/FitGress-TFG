var User = require("../models/User.model");
const RoleModel = require("../models/Role.model");

/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    let users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una user por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Creo una user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
  try {
    const { username, email, password, roles, objetivoFisico, pesoObjetivo } =
      req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      objetivoFisico,
      pesoObjetivo,
    });

    //asgino los roles
    if (roles) {
      //busco los roles con el nombre (de entre el array de roles)
      const foundedRoles = await RoleModel.find({ name: { $in: roles } });
      //devulvo array con el id de los roles y los asigno
      newUser.roles = foundedRoles.map((roles) => roles._id);
    } else {
      const rol = await RoleModel.findOne({ name: "user" });
      let id = rol._id;
      newUser.roles = [id];
    }

    if (req.file) {
      //creo el obj imagen y lo asigno al user
      const newImage = {
        mimeType: req.file.mimetype,
        filename: req.file.filename,
        imagePath: req.file.path,
      };
      newUser.image = newImage;
    }

    const savedUser = await newUser.save();
    //guardo el token y lo devuelvo

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Actualizo una user por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = async (req, res, next) => {
  //compruebo si esta editando su propio perfil, si no no puede
  /* if (req.userId == req.body._id) { */
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
  /* }else{
    res.status(402).json('Unauthorized, you can edit only your user');
  } */
};

const changePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar la contraseña del usuario
    user.password = await User.encryptPassword(password);
    user = await user.save();

    if (!user) {
      return res
        .status(500)
        .json({ message: "Error al guardar la contraseña" });
    }

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
};

/**
 * Borro una user por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const remove = async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { getAll, getById, create, update, remove, changePassword };
