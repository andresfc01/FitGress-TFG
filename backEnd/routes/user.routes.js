const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleWares/authJwt");
const multer = require("../libs/multer");
const UserCtrl = require("../controllers/user.controller");

router
  /**
   * POST /singup, code 200 - 400 USERNAME EN USOS / 401 EMAIL EN USO
   */
  //subo la imagen con multer antes de nda
  .post("/", [verifyToken, isAdmin, multer.single("image")], UserCtrl.create)
  /**
   * GET /api/user, code 200
   */
  .get("/", [verifyToken, isAdmin], UserCtrl.getAll)
  /**
   * GET /api/user/id , code 200
   */
  .get("/:id", [verifyToken, isAdmin], UserCtrl.getById)
  /**
   * PUT /api/user/id , code 200
   * comprueba que este logueado y admin
   */
  .put("/:id", [verifyToken], UserCtrl.update)
  /**
   * DELTE /api/user/id , code 200
   */
  .delete("/:id", [verifyToken], UserCtrl.remove);

module.exports = router;
