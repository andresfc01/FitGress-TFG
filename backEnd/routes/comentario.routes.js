const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleWares/authJwt");
const multer = require("../libs/multer");
const ComentarioCtrl = require("../controllers/comentario.controller");

router
  /**
   * POST /singup, code 200 - 400 USERNAME EN USOS / 401 EMAIL EN USO
   */
  //subo la imagen con multer antes de nda
  .post("/", [verifyToken], ComentarioCtrl.create)
  /**
   * GET /api/comentario, code 200
   */
  .get("/", ComentarioCtrl.getAll)
  /**
   * GET /api/comentario/id , code 200
   */
  .get("/:id", ComentarioCtrl.getById)
  /**
   * GET /api/comentario/userId , code 200
   */
  .get("/plantilla/:idPlantilla", ComentarioCtrl.getByPlantilla)
  /**
   * PUT /api/comentario/id , code 200
   * comprueba que este logueado y admin
   */
  .put("/:id", [verifyToken], ComentarioCtrl.update)
  /**
   * DELTE /api/comentario/id , code 200
   */
  .delete("/:id", [verifyToken], ComentarioCtrl.remove);

module.exports = router;
