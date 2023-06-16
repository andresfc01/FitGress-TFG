require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const createRoles = require("./libs/initialSetup");
createRoles();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//esta carpeta se podrá ver en la parte publica del navegador
app.use("/uploads", express.static(path.resolve("uploads")));

const multer = require("./libs/multer");

//rutas api
var authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);

var medidaRouter = require("./routes/medida.routes");
app.use("/api/medida", medidaRouter);

var pesoRouter = require("./routes/peso.routes");
app.use("/api/peso", pesoRouter);

var userRouter = require("./routes/user.routes");
const UserCtrl = require("./controllers/user.controller");

app.put("/api/user/changePassword", UserCtrl.changePassword);
app.use("/api/user", userRouter);

var grupoMuscularRouter = require("./routes/grupoMuscular.routes");
app.use("/api/grupoMuscular", grupoMuscularRouter);

var ejercicioRouter = require("./routes/ejercicio.routes");
app.use("/api/ejercicio", ejercicioRouter);

var plantillaEntrenamientoRouter = require("./routes/plantillaEntrenamiento.routes");
app.use("/api/plantillaEntrenamiento", plantillaEntrenamientoRouter);

var entrenamientoRouter = require("./routes/entrenamiento.routes");
app.use("/api/entrenamiento", entrenamientoRouter);

var logroRouter = require("./routes/logro.routes");
app.use("/api/logro", logroRouter);

var comentarioRouter = require("./routes/comentario.routes");
app.use("/api/comentario", comentarioRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//db
require("./database");

module.exports = app;
