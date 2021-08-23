const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* POST Feed pet */
router.post(
  "/",
  body("id").isInt(),
  body("date")
    .isISO8601()
    .optional()
    .default(() => new Date().toISOString()),
  body("type").isString().optional(),
  async (req, res) => {
    const { id: _petID, date, type } = req.body;
    const { id: userID } = req.user;

    const petID = Number(_petID);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    if (type && type !== "morning" && type !== "evening") {
      return res.status(400).send({
        success: false,
        message: "Invalid type",
      });
    }

    const hour = new Date().getHours();
    const defaultType = hour > 12 ? "evening" : "morning";
    const finalType = type || defaultType;

    const pet = await prisma.pet.findFirst({ where: { id: petID } });

    if (!pet) {
      return res.status(404).send({
        sucess: false,
        message: "Pet not found",
      });
    }

    const doesExist = await prisma.food.findFirst({
      where: {
        type: finalType,
        byId: userID,
        forId: pet.id,
      },
    });

    if (doesExist) {
      return res.send({
        food: true,
        item: doesExist,
      });
    }

    const foodItem = await prisma.food.create({
      data: {
        date: date,
        type: finalType,
        by: {
          connect: { id: userID },
        },
        for: {
          connect: { id: pet.id },
        },
      },
    });

    res.send({
      food: true,
      item: foodItem,
    });
  }
);

module.exports = router;
