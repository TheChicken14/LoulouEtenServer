const express = require("express");
const router = express.Router();

const { query, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* DELETE Food item */
router.delete("/", query("id").isInt(), async (req, res) => {
  const { id: userID } = req.user;
  const { id: itemID } = req.query;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const foodItem = await prisma.food.findFirst({
    where: { id: Number(itemID) },
    select: {
      id: true,
      by: true,
      for: {
        select: {
          owners: true,
        },
      },
    },
  });

  if (!foodItem) {
    return res.status(404).send({
      success: false,
      message: "Not found",
    });
  }

  if (foodItem.for.owners.find((a) => a.id == userID)) {
    await prisma.food.delete({ where: { id: foodItem.id } });
    return res.send({ success: true });
  } else {
    return res.status(401).send({
      success: false,
      message: "Unauthorized.",
    });
  }
});

module.exports = router;
