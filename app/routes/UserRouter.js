const express = require("express");
const router = express.Router();

router.get("/", function (request, response) {
  response.send("Hello this is express js api");
});

router.get("/about", function (request, response) {
  response.send("Hello to about");
});

module.exports = router; //es5
