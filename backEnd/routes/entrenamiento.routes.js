const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleWares/authJwt");
const multer = require("../libs/multer");
const EntrenamientoCtrl = require("../controllers/entrenamiento.controller");

router
  /**
   * POST /singup, code 200 - 400 USERNAME EN USOS / 401 EMAIL EN USO
   */
  //subo la imagen con multer antes de nda
  .post("/", [verifyToken], EntrenamientoCtrl.create)
  /**
   * GET /api/entrenamiento, code 200
   */
  .get("/", EntrenamientoCtrl.getAll)
  /**
   * GET /api/entrenamiento, code 200
   */
  .get("/populated", EntrenamientoCtrl.getAllPopulated)
  /**
   * GET /api/entrenamiento/id , code 200
   */
  .get("/:id", EntrenamientoCtrl.getById)
  /**
   * GET /api/grupoMuscular/userId , code 200
   */
  .get("/user/:userId", EntrenamientoCtrl.getByUser)
  /**
   * PUT /api/entrenamiento/id , code 200
   * comprueba que este logueado y admin
   */
  .put("/:id", [verifyToken], EntrenamientoCtrl.update)
  /**
   * DELTE /api/entrenamiento/id , code 200
   */
  .delete("/:id", [verifyToken], EntrenamientoCtrl.remove);

module.exports = router;
