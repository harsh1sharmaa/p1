const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const redis = require("redis");
const app = express();
const globalMiddleware = require("./middlewares/auth");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
let request = require("request");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
const { Connection } = require("./models/connection");
Connection.open();
const indexRouter = require("./route/ index");
const usersRouter = require('./route/ users');
const catalogRouter = require("./route/catalog"); //Import routes for "catalog" area of site
const productRouter = require("./route/product");
const orderRouter = require("./route/order");
const adminRouter = require("./route/admin");

// app.use('/',index);
app.use("/users", usersRouter);
app.use("/admin",globalMiddleware.adminMiddleware, adminRouter);
app.use("/", indexRouter);

app.use(globalMiddleware.globalMiddleware);
app.use("/store/", productRouter);
app.use("/store/", orderRouter);
app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.

app.listen(3000, () => {
  console.log("listening on port");
});

module.exports = app;
