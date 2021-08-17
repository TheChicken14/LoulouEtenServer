const config = require("../config");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports = (req, res, next) => {
  if (req.headers["authorization"] == config.api_key) {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: "No/invalid API key",
    });
  }
};
