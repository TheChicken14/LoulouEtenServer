const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* POST Create pet */
router.post(
  "/",
  body("petID").isInt(),
  body("type").isString(),
  async (req, res) => {
    const { petID: _petID, type } = req.body;
    const { id: userID } = req.user;
    const petID = Number(_petID);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    if (type !== "feeding") {
      return res.status(400).send({
        success: false,
        error: "Invalid type.",
      });
    }

    const pet = await prisma.pet.findFirst({
      where: {
        id: petID,
      },
      include: {
        owners: true,
      },
    });

    if (!pet.owners.find((u) => u.id == userID)) {
      return res.status(401).send({
        success: false,
        error: "Not authorized",
      });
    }

    const foundQrCode = await prisma.qrCode.findFirst({
      where: {
        petId: petID,
        userId: userID,
        type: type,
      },
    });

    if (foundQrCode) {
      return res.send(foundQrCode);
    }

    const newQrCode = await prisma.qrCode.create({
      data: {
        pet: {
          connect: {
            id: petID,
          },
        },
        user: {
          connect: {
            id: userID,
          },
        },
        type: type,
      },
    });

    res.send(newQrCode);
  }
);

module.exports = router;
