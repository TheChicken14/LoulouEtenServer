/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports = (req, res, next) => {
  if (req.headers["authorization"] == process.env.API_URL) {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: "No/invalid API key",
    });
  }
};
