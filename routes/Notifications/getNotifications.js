const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

const { param, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

/* GET Notifications info */
router.get("/:uuid", param("uuid").isString(), async (req, res) => {
  const { id: userID } = req.user;
  const { uuid } = req.params;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const device = await prisma.device.findFirst({
    where: {
      uuid,
      ownerId: userID,
    },
  });

  if (!device) {
    return res.status(404).send({
      success: false,
      error: "Not found",
    });
  }

  const pets = await prisma.pet.findMany({
    where: {
      owners: {
        some: {
          id: {
            equals: userID,
          },
        },
      },
    },
  });

  const { data: fcmResponse } = await axios.get(
    `https://iid.googleapis.com/iid/info/${device.fcmToken}?details=true`,
    {
      headers: {
        Authorization: `Bearer ${process.env.FCMSERVERKEY}`,
      },
    }
  );
  const petIds = Object.keys(fcmResponse.rel.topics)
    .filter((t) => Number(t.split("-")[0] && t.split("-")[1] == "fed"))
    .map((t) => Number(t.split("-")[0]));

  const responsePets = pets.map((pet) => {
    if (petIds.includes(pet.id)) {
      return {
        ...pet,
        notification: true,
      };
    } else {
      return {
        ...pet,
        notification: false,
      };
    }
  });

  res.send(responsePets);
});

module.exports = router;
