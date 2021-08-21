const express = require("express");
const router = express.Router();
const passport = require("../../Structures/Passport");

/* GET google redirecting */
router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

module.exports = router;
