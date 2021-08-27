const express = require("express");
const router = express.Router();

const { param, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* DELETE pet */
router.delete("/:id", param("id").isInt(), async (req, res) => {
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
    res.status(401).send({
      success: false,
      error: "Unauthorized",
    });
  }

  await prisma.food.deleteMany({
    where: {
      forId: petID,
    },
  });
  await prisma.invitation.deleteMany({
    where: {
      petId: petID,
    },
  });
  await prisma.pet.delete({
    where: {
      id: petID,
    },
  });

  res.send({
    success: true,
  });
});

module.exports = router;
