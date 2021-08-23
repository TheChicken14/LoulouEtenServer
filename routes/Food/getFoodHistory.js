const express = require("express");
const router = express.Router();

const { param, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* GET Feeding history */
router.get("/:id", param("id").isInt(), async (req, res) => {
  const { id: _petID } = req.params;
  const { id: userID } = req.user;
  const petID = Number(_petID);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const pet = await prisma.pet.findFirst({
    where: {
      id: petID,
    },
    include: {
      owners: true,
    },
  });

  if (!pet.owners.find((a) => a.id == userID)) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized",
    });
  }

  const foodItems = await prisma.food.findMany({
    where: {
      forId: petID,
    },
    include: {
      by: {
        select: {
          name: true,
        },
      },
    },
  });

  const sorted = foodItems.sort((a, b) => b.date - a.date);

  res.send(sorted);
});

module.exports = router;
