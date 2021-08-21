const express = require("express");
const JWTManager = require("../../Structures/JWTManager");
const router = express.Router();
const passport = require("../../Structures/Passport");

/* GET google redirecting */
router.get(
  "/",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    const jwt = JWTManager.create({
      googleId: req.user.googleId,
    });

    if (req.headers["user-agent"].includes("mobile")) {
      return res.redirect(`loulouapp://authenticate/${jwt}`);
    }

    res.send(jwt);
  }
);

module.exports = router;
