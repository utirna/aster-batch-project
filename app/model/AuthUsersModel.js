const mongoose = require("mongoose");

let AuthUser = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
  role: { type: String },
});

let AuthUsersModel = mongoose.model("authuser", AuthUser);

module.exports = AuthUsersModel;
