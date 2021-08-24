const express = require("express");
const router = express.Router();

const { param, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");
const cryptoRandomString = require("crypto-random-string");

/* POST Create pet invite */
router.post("/:id", param("id").isInt(), async (req, res) => {
  const { id: _petID } = req.params;
  const { id: userID } = req.user;
  const petID = Number(_petID);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const pet = await prisma.pet.findFirst({
    where: { id: petID },
    include: { owners: true },
  });

  if (!pet.owners.find((a) => a.id == userID)) {
    res.status.send({
      success: false,
      error: "Unauthorized",
    });
  }

  const foundInvite = await prisma.invitation.findFirst({
    where: {
      petId: petID,
      fromId: userId,
    },
  });

  if (foundInvite) {
    return foundInvite;
  }

  const inviteID = cryptoRandomString({ type: "url-safe", length: 10 });

  const invite = await prisma.invitation.create({
    data: {
      invitationCode: inviteID,
      pet: {
        connect: { id: petID },
      },
      from: {
        connect: { id: userID },
      },
    },
  });

  res.send(invite);
});

module.exports = router;
