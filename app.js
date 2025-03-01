const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors=require("cors");
const mongoose=require("mongoose");

const url="mongodb+srv://liteflix:liteflix@cluster0.vnx5y.mongodb.net/liteflix-movies?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then((db)=>{
  console.log("Se ha conectado de manera correcta a la base de datos")
})

const indexRouter = require("./src/routes/index");
const moviesRouter = require("./src/routes/movies");

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/movies", moviesRouter);

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

module.exports = app;
