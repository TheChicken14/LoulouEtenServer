const express = require("express");
const router = express.Router();

const { param, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* GET Pet status */
router.get("/:id", param("id").isInt(), async (req, res) => {
  const { id: _qrID } = req.params;
  const { id: userID } = req.user;
  const qrID = Number(_qrID);

  const qrCode = await prisma.qrCode.findFirst({
    where: {
      id: qrID,
    },
    include: {
      pet: true,
      user: true,
    },
  });

  if (!qrCode) {
    return res.status(404).send({
      success: false,
      error: "Not found",
    });
  }

  if (!qrCode.user.id == userID) {
    return res.status(400).send({
      success: false,
      error: "Not authorized",
    });
  }

  res.send(qrCode);
});

module.exports = router;
