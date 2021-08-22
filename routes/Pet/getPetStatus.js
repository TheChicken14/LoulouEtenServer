const express = require("express");
const router = express.Router();

const { param, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* GET Pet status */
router.get("/:id", param("id").isInt(), async (req, res) => {
  const { id: petID } = req.params;
  const { id: userID } = req.user;

  const pet = await prisma.pet.findFirst({
    where: { id: Number(petID) },
    include: {
      owners: true,
    },
  });

  if (!pet) {
    return res.status(404).send({
      success: false,
      message: "Not found",
    });
  }

  if (!pet.owners.find((a) => a.id == userID)) {
    return res.status(401).send({
      success: false,
      message: "No permission",
    });
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59);

  const items = await prisma.food.findMany({
    where: {
      forId: pet.id,
      date: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    include: {
      by: true,
    },
  });

  //   res.send(items);
  res.send({
    morning: items.find((a) => a.type == "morning") || null,
    evening: items.find((a) => a.type == "evening") || null,
    name: pet.name,
  });
});

module.exports = router;
