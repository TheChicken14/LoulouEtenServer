const express = require("express");
const router = express.Router();

const { param, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* GET Pet status */
router.get("/", param("id").isInt(), async (req, res) => {
  //   const { id: qrID } = req.params;
  const { id: userID } = req.user;

  const qrCodes = await prisma.qrCode.findMany({
    where: {
      userId: userID,
    },
    include: {
      pet: true,
    },
  });

  res.send(qrCodes);
});

module.exports = router;
