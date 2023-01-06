const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const cors = require("cors");
const redis = require("redis");
const app = express();
const globalMiddleware = require("./middlewares/auth");
const logger = require("./config/Logger");
const bodyParser = require('body-parser');

// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// app.use(logger("dev"));
app.use(bodyParser.json()); //Handles JSON requests
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
let request = require("request");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
const { Connection } = require("./models/connection");
Connection.open();
app.use((req, res, next) => {
  logger.info(
    `incoming Request URL = ${
      req.url
    } , incoming Request body =${JSON.stringify(req.body)}`
  );
  let oldSend = res.send;
  res.send = function (data) {
    logger.info(`response Request body =${JSON.stringify(data)}`);
    oldSend.apply(res, arguments);
  };
  next();
});
console.log("dbResponse")
console.log(
  new Date()
);
const indexRouter = require("./route/ index");
const usersRouter = require("./route/ users");
const catalogRouter = require("./route/catalog"); //Import routes for "catalog" area of site
const productRouter = require("./route/product");
const orderRouter = require("./route/order");
const adminRouter = require("./route/admin");

// app.use('/',index);
app.use("/users", usersRouter);
app.use("/admin", globalMiddleware.adminMiddleware, adminRouter);
app.use("/", indexRouter);

app.use(globalMiddleware.globalMiddleware);
app.use("/store/", productRouter);
app.use("/store/", orderRouter);
app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.

app.listen(4000, () => {
  console.log("info", "listening on port");
});

module.exports = app;
