const express = require("express");
const router = express.Router();
const PesoCtrl = require("../controllers/peso.controller");
const { verifyToken, isAdmin } = require("../middleWares/authJwt");

router
  /**
   * GET /api/peso, code 200
   */
  .get("/", PesoCtrl.getAll)
  /**
   * GET /api/peso/user/:iduser, code 200
   */
  .get("/user/:user", verifyToken, PesoCtrl.getAllUser)
  /**
   * GET /api/peso/id , code 200
   */
  .get("/:id", PesoCtrl.getById)
  /**
   * POST /api/peso , code 201
   * comprueba que este logueado
   */
  .post("/", verifyToken, PesoCtrl.create)
  /**
   * PUT /api/peso/id , code 200
   * comprueba que este logueado y admin
   */
  .put("/:id", [verifyToken], PesoCtrl.update)
  /**
   * DELTE /api/peso/id , code 204
   */
  .delete("/:id", [verifyToken], PesoCtrl.remove);

module.exports = router;
