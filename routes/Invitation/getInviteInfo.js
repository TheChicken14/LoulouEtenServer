const express = require("express");
const router = express.Router();

const { param, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* GET Invite info */
router.get("/:invite", async (req, res) => {
  const { invite: inviteCode } = req.params;
  const { id: userID } = req.user;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const invite = await prisma.invitation.findFirst({
    where: {
      invitationCode: inviteCode,
    },
    include: {
      from: {
        select: {
          name: true,
        },
      },
      pet: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  if (!invite) {
    return res.status(404).send({
      success: false,
      message: "Not found",
    });
  }

  res.send(invite);
});

module.exports = router;
