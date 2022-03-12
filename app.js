require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const router = require("./app/routes");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logger("dev"));

app.use("/", router);

/* 404 error created */
app.use(function (req, res, next) {
  next(createError(404));
});

/* handel */
app.use(function (error, req, res, next) {
  let err = {
    status: false,
    code: error.status,
    message: error.message,
  };
  res.status(error.status || 500);
  res.send(err);
});

const dbURL = process.env.MONGODB;

mongoose
  .connect(dbURL)
  .then(() => {
    app.listen(process.env.PORT, function () {
      console.log("server started...3002");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
