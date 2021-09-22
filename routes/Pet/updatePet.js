const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* POST Update pet */
router.post(
  "/:id",
  body("name").isString(),
  body("birthdate").isISO8601(),
  body("morningFood").isString(),
  body("dinnerFood").isString(),
  body("extraNotes").isString(),
  async (req, res) => {
    const { name, birthdate, morningFood, dinnerFood, extraNotes } = req.body;
    const { id: userID } = req.user;
    const { id: _petID } = req.params;
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
        profile: true,
      },
    });

    if (!pet) {
      return res.status(404).send({
        success: false,
        error: "Not found",
      });
    }

    if (!pet.owners.find((u) => u.id == userID)) {
      return res.status(401).send({
        success: false,
        error: "Not authorized.",
      });
    }

    if (name !== pet.name) {
      await prisma.pet.update({
        where: {
          id: petID,
        },
        data: {
          name,
        },
      });
    }

    if (pet.profile) {
      await prisma.petProfile.update({
        where: {
          id: pet.profile.id,
        },
        data: {
          birthday: birthdate,
          morningFood,
          dinnerFood,
          extraNotes,
        },
      });
    } else {
      await prisma.petProfile.create({
        data: {
          pet: { connect: { id: petID } },

          birthday: birthdate,
          morningFood,
          dinnerFood,
          extraNotes,
        },
      });
    }

    res.send({ success: true });
  }
);

module.exports = router;
