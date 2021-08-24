const express = require("express");
const router = express.Router();

const { param, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");
const cryptoRandomString = require("crypto-random-string");

/* POST Create pet invite */
router.post("/:invite", param("invite").isString(), async (req, res) => {
  const { id: userID } = req.user;
  const { invite: inviteID } = req.params;

  const invite = await prisma.invitation.findFirst({
    where: {
      invitationCode: inviteID,
    },
    include: {
      pet: true,
    },
  });

  if (!invite) {
    return res.status(404).send({
      success: false,
      error: "Invite not found",
    });
  }

  if (invite.fromId == userID) {
    return res.status(401).send({
      success: false,
      error: "You cannot invite yourself.",
    });
  }

  const editedUser = await prisma.user.update({
    where: {
      id: userID,
    },
    data: {
      pets: { connect: [{ id: invite.pet.id }] },
    },
  });

  res.send({
    success: true,
  });
});

module.exports = router;
