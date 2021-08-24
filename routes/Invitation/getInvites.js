const express = require("express");
const router = express.Router();

const prisma = require("../../Structures/Prisma");

/* GET Invites */
router.get("/", async (req, res) => {
  const { id: userID } = req.user;

  const invites = await prisma.invitation.findMany({
    where: {
      fromId: userID,
    },
    include: {
      from: true,
      pet: true,
    },
  });

  res.send(invites);
});

module.exports = router;
