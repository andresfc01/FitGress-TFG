const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User.model");
const Role = require("../models/Role.model");
const { token } = require("morgan");

//verifico que el token es correcto, de un usuario que existe
const verifyToken = async (req, res, next) => {
  try {
    //consigo el token y compruebo que exista
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });
    //lo decodifico para sacar la id del user
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    //busco el user con la id
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) res.status(404).json({ messagge: "USER NOT FOUND" });

    //si todo esta bien ejectuo la siguiente funcion
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "unauthorized" });
  }
};

//compruebo que quien hace la peticion es admin
const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  //busco los roles que tenga de id de los roles del user
  const roles = await Role.find({ _id: { $in: user.roles } });

  //si el rol es admin retorna y continua
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      console.log("es admin");
      return;
    }
  }

  //si no es admin revuelve error 403
  return res.status(403).json({ message: "Require admin role" });
  next();
};

module.exports = { verifyToken, isAdmin };
