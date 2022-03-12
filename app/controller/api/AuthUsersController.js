const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthUsersModel = require("../../model/AuthUsersModel");
const privateKey = process.env.PRIVATE_KEY;
const AuthUsersController = {
  createUser: async function (req, res) {
    let data = req.body; // name,password,role
    try {
      let { password } = data;

      let salt = await bcrypt.genSalt(10); // create dynamic salt
      let hashPassword = await bcrypt.hash(password, salt); // create hashPassword

      let newUser = new AuthUsersModel({
        name: data.name,
        username: data.name.toLowerCase(),
        password: hashPassword,
        role: data.role,
      });

      await newUser.save();
      res.send({
        status: true,
        message: "User Created Successfully, you can login now.",
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        error: "Server Error ... unable to create a user,try again.",
      });
    }
  },
  checkLogin: async function (req, res) {
    let data = req.body; //{username:'deepak',password:'admin@123'}
    let result = await AuthUsersModel.findOne({
      username: data.username,
    }).exec();
    if (result === null) {
      res.send({ status: false, message: "username is wrong" });
    } else {
      let isValid = await bcrypt.compare(data.password, result.password);
      if (isValid) {
        let userDetails = {
          user: result.name,
          role: result.role,
          id: result._id,
        };
        let token = jwt.sign(userDetails, privateKey, { expiresIn: "1h" });
        res.header("Access-Control-Expose-Headers", "x_auth_token");
        res.header("x_auth_token", token);
        res.send({ status: true });
      } else {
        res.send({ status: false, message: "password is wrong" });
      }
    }
  },
};

module.exports = AuthUsersController;
