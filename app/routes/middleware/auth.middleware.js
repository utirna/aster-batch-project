const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY;

let AuthMiddleware = {
  checkAuth: async (req, res, next) => {
    let token = req.headers("x_auth_token");

    try {
      isValid = jwt.verify(token, privateKey);
      res["user"] = isValid;
      next();
    } catch (error) {
      res
        .status(403)
        .send({ status: false, message: "User not permitted", error, token });
      return false;
    }
  },
  isAdmin: async (req, res, next) => {
    let { role } = res["user"];
    let user = ["admin", "teacher"];
    if (user.includes(role)) {
      next();
    } else {
      res.status(401).send({ status: false, message: "User not permitted" });
      return false;
    }
  },
};

module.exports = AuthMiddleware;
