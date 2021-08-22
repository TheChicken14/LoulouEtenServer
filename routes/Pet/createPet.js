const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* POST Create pet */
router.post("/", body("name").isString(), async (req, res) => {
  const { name } = req.body;
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
    },
  });

  res.send(newPet);
});

module.exports = router;
