const express = require("express");
const mongoose = require('mongoose')
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "public")));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


  const indexRouter = require("./route/ index");
  const usersRouter = require("./route/ users");
  const catalogRouter = require("./route/catalog"); //Import routes for "catalog" area of site

  const productRouter = require("./route/product");
  
  
  // app.use('/',index);
app.use("/", indexRouter);
app.use("/store/", productRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.

app.listen(3000, () => {
  console.log("listening on port");
});

module.exports = app;
