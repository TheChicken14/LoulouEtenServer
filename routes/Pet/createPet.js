const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* POST Create pet */
router.post(
  "/",
  body("name").isString(),
  body("birthdate").isISO8601(),
  body("morningFood").isString(),
  body("dinnerFood").isString(),
  body("extraNotes").isString(),
  async (req, res) => {
    const { name, birthdate, morningFood, dinnerFood, extraNotes } = req.body;
    const { id } = req.user;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const newPet = await prisma.pet.create({
      data: {
        name,
        owners: {
          connect: [{ id }],
        },
        profile: {
          create: {
            birthday: birthdate,
            morningFood: morningFood || "",
            dinnerFood: dinnerFood || "",
            extraNotes: extraNotes || "",
          },
        },
      },
    });

    res.send(newPet);
  }
);

module.exports = router;
