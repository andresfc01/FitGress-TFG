const express = require("express");
const router = express.Router();
const EjercicioCtrl = require("../controllers/ejercicio.controller");
const multer = require("../libs/multer");
const { verifyToken, isAdmin } = require("../middleWares/authJwt");

router
  /**
   * GET /api/ejercicio, code 200
   */
  .get("/", EjercicioCtrl.getAll)
  /**
   * GET /api/ejercicio, code 200
   */
  .get("/populated", EjercicioCtrl.getAllPopulated)
  /**
   * GET /api/ejercicio/id , code 200
   */
  .get("/:id", EjercicioCtrl.getById)
  /**
   * POST /api/ejercicio , code 201
   * comprueba que este logueado
   */
  .post(
    "/",
    [verifyToken, isAdmin, multer.single("image")],
    EjercicioCtrl.create
  )
  /**
   * PUT /api/ejercicio/id , code 200
   * comprueba que este logueado y admin
   */
  .put(
    "/:id",
    [verifyToken, isAdmin, multer.single("image")],
    EjercicioCtrl.update
  )
  /**
   * DELTE /api/ejercicio/id , code 204
   */
  .delete("/:id", [verifyToken, isAdmin], EjercicioCtrl.remove);

module.exports = router;
