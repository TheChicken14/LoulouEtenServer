const express = require("express");
const router = express.Router();

const { param, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* DELETE Invite */
router.delete("/:invite", param("invite").isString(), async (req, res) => {
  const { invite: inviteCode } = req.params;
  const { id: userID } = req.user;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const invite = await prisma.invitation.findFirst({
    where: {
      invitationCode: inviteCode,
      fromId: userID,
    },
  });

  if (!invite) {
    return res.status(404).send({
      success: false,
      message: "Not found",
    });
  }

  await prisma.invitation.delete({
    where: { id: invite.id },
  });

  res.send({ success: true });
});

module.exports = router;
