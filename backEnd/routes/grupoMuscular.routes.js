const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleWares/authJwt");
const multer = require("../libs/multer");
const GrupoMuscularCtrl = require("../controllers/grupoMuscular.controller");
function handleImage(req, res, next) {
  if (
    typeof req.body.image === "object" &&
    Object.prototype.toString.call(req.body.image) === "[object Object]"
  ) {
    // Si el tipo de dato de req.body.image es un objeto, lo consideramos como el objeto JSON
    // Puedes realizar las acciones necesarias para este caso
    // Por ejemplo, asignar el objeto JSON a una nueva variable en el cuerpo de la solicitud
    // req.body.imageData = req.body.image;
    console.log("b");
  } else {
    // Si no es un objeto, asumimos que es un archivo de imagen y continúa con el middleware multer
    console.log("a");
    return multer.single("image")(req, res, next);
  }
  next();
}

router
  /**
   * POST /singup, code 200 - 400 USERNAME EN USOS / 401 EMAIL EN USO
   */
  //subo la imagen con multer antes de nda
  .post("/", [verifyToken, isAdmin, handleImage], GrupoMuscularCtrl.create)
  /**
   * GET /api/grupoMuscular, code 200
   */
  .get("/", GrupoMuscularCtrl.getAll)
  /**
   * GET /api/grupoMuscular/id , code 200
   */
  .get("/:id", GrupoMuscularCtrl.getById)
  /**
   * PUT /api/grupoMuscular/id , code 200
   * comprueba que este logueado y admin
   */
  .put("/:id", [verifyToken, isAdmin, handleImage], GrupoMuscularCtrl.update)
  /**
   * DELTE /api/grupoMuscular/id , code 200
   */
  .delete(
    "/:id",
    [verifyToken, isAdmin, handleImage],
    GrupoMuscularCtrl.remove
  );

module.exports = router;
