const express = require("express");
const router = express.Router();
const multer = require("../libs/multer");

const AuthCtrl = require("../controllers/auth.controller");
const verifySignUp = require("../middleWares/verifySignup");
function handleImage(req, res, next) {
  if (
    typeof req.body.image === "object" &&
    Object.prototype.toString.call(req.body.image) === "[object Object]"
  ) {
    // Si el tipo de dato de req.body.image es un objeto, lo consideramos como el objeto JSON
    // Puedes realizar las acciones necesarias para este caso
    // Por ejemplo, asignar el objeto JSON a una nueva variable en el cuerpo de la solicitud
    // req.body.imageData = req.body.image;
  } else {
    // Si no es un objeto, asumimos que es un archivo de imagen y continúa con el middleware multer
    return multer.single("image")(req, res, next);
  }
  next();
}

router
  /**
   * POST /singup, code 200 - 400 USERNAME EN USOS / 401 EMAIL EN USO
   */
  .post("/signup", [verifySignUp, multer.single("image")], AuthCtrl.signUp)
  /**
   * POST /singin , ode 200 - 401 INVALID PASSWORD / 400 EMAIL NO ENCONTRADO
   */
  .post("/signin", AuthCtrl.signIn)
  .get("/token", AuthCtrl.getInfo)
  .put("/update", [handleImage], AuthCtrl.update);

module.exports = router;
