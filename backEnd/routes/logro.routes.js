const express = require("express");
const router = express.Router();
const LogroController = require("../controllers/logro.controller");
const { verifyToken, isAdmin } = require("../middleWares/authJwt");
const multer = require("../libs/multer");

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
   * GET /api/Logro, code 200
   */
  .get("/", LogroController.getAll)
  /**
   * GET /api/Logro/id , code 200
   */
  .get("/:id", LogroController.getById)
  /**
   * POST /api/Logro , code 200
   * comprueba que este logueado
   */
  .post("/", [verifyToken, isAdmin, handleImage], LogroController.create)
  /**
   * PUT /api/Logro/id , code 200
   * comprueba que este logueado y admin
   */
  .put("/:id", [verifyToken, isAdmin, handleImage], LogroController.update)
  /**
   * DELTE /api/Logro/id , code 200
   */
  .delete("/:id", [verifyToken, isAdmin], LogroController.remove);

module.exports = router;
