const JWT = require("jsonwebtoken");

module.exports = class JWTManager {
  static create(user) {
    return JWT.sign(user, process.env.JWT_SECRET);
  }

  static decode(jwt) {
    try {
      return JWT.verify(jwt, process.env.JWT_SECRET);
    } catch (e) {
      return false;
    }
  }
};
