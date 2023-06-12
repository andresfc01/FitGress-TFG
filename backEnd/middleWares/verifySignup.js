const User = require("../models/User.model");

//verifico que el usuario no esté duplicado
const checkDuplicateUserNameOrEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).json({ message: "Nombre de usuario en uso" });
  }

  //si encuentra el mail no se creará
  const user2 = await User.findOne({ email: req.body.email });
  if (user2) {
    return res.status(401).json({ message: "Email en uso" });
  }
  next();
};

module.exports = checkDuplicateUserNameOrEmail;
