const express = require("express");
const JWTManager = require("../../Structures/JWTManager");
const router = express.Router();
const prisma = require("../../Structures/Prisma");
const { body, validationResult } = require("express-validator");
const AppleAuth = require("../../Structures/AppleAuth");

/* GET google redirecting */
router.post(
  "/",
  body("token").isString(),
  body("appleID").isString(),
  body("email").isEmail().optional(),
  body("givenName").isString().optional(),
  body("familyName").isString().optional(),
  async (req, res) => {
    const { token, email, appleID, givenName, familyName } = req.body;
    console.log(req.body);
    if (!token || !appleID) {
      return res.status(400).status({
        success: false,
        error: "Invalid data supplied",
      });
    }

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const user = await prisma.user.findFirst({
      where: {
        appleId: appleID,
      },
    });

    if (user) {
      const jwt = JWTManager.create({ appleId: user.appleId });
      return res.send({ jwt });
    }

    const tokenData = await AppleAuth.verifyToken(token);

    if (!tokenData) {
      return res.status(400).send({
        success: false,
        error: "Invalid token",
      });
    }

    if (!givenName || !familyName) {
      return res.status(400).send({
        success: false,
        error: "No name provided.",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        error: "No email provided!",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        appleId: appleID,
        googleId: "",
        email,
        name: givenName + " " + familyName,
      },
    });

    const jwt = JWTManager.create({ appleId: newUser.appleId });
    res.send({ jwt });
  }
);

module.exports = router;
