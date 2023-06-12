const express = require("express");
const router = express.Router();
const MediaCtrl = require("../controllers/medida.controller");
const { verifyToken, isAdmin } = require("../middleWares/authJwt");

router
  /**
   * GET /api/medida, code 200
   */
  .get("/", MediaCtrl.getAll)
  .get("/populated", MediaCtrl.getAllPopulated)
  /**
   * GET /api/medida/user/:iduser, code 200
   */
  .get("/user/:user", verifyToken, MediaCtrl.getAllUser)
  /**
   * GET /api/medida/id , code 200
   */
  .get("/:id", MediaCtrl.getById)
  /**
   * POST /api/medida , code 200
   * comprueba que este logueado
   */
  .post("/", verifyToken, MediaCtrl.create)
  /**
   * PUT /api/medida/id , code 200
   * comprueba que este logueado y admin
   */
  .put("/:id", [verifyToken], MediaCtrl.update)
  /**
   * DELTE /api/medida/id , code 200
   */
  .delete("/:id", [verifyToken], MediaCtrl.remove);

module.exports = router;
