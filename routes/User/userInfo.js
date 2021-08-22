const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* GET User info */
router.get("/", async (req, res) => {
  const { id } = req.user;

  const user = await prisma.user.findFirst({
    where: { id },
    include: {
      foodItems: {
        select: {
          by: true,
          byId: true,
          date: true,
          for: true,
          forId: true,
          id: true,
          type: true,
        },
      },
      pets: true,
    },
  });

  res.send(user);
});

module.exports = router;
