const User = require("../Models/User");
const JWTManager = require("../Structures/JWTManager");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports = async (req, res, next) => {
  if (req.path.startsWith("/auth/google")) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  if (authHeader == process.env.API_URL) {
    return next();
  }
  const decoded = JWTManager.decode(authHeader || null);
  const user = decoded
    ? await User.findOne({ googleId: decoded.googleId })
    : null;

  if (decoded && user) {
    req.user = user;
    next();
  } else {
    res.status(403).json({
      success: false,
      error: "No/invalid API key",
    });
  }
};
