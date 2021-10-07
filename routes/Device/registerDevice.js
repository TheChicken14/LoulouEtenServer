const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const prisma = require("../../Structures/Prisma");

const firebase = require("../../Structures/Firebase/Firebase");

/* POST Register device */
router.post(
  "/",
  body("name").isString(),
  body("uuid").isString(),
  body("fcmtoken").isString(),
  async (req, res) => {
    const { name, uuid, fcmtoken } = req.body;
    const { id: userID } = req.user;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const foundDevice = await prisma.device.findFirst({
      where: {
        uuid,
        ownerId: userID,
      },
    });

    if (foundDevice) {
      await prisma.device.update({
        where: {
          id: foundDevice.id,
        },
        data: {
          name,
          fcmToken: fcmtoken,
        },
      });
    } else {
      await prisma.device.create({
        data: {
          name,
          uuid,
          fcmToken: fcmtoken,
          owner: {
            connect: {
              id: userID,
            },
          },
        },
      });
    }

    setPets(userID, fcmtoken);

    res.send({
      success: true,
    });
  }
);

const setPets = async (userID, token) => {
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

  for (const pet of pets) {
    await firebase.messaging().subscribeToTopic(token, `${pet.id}-fed`);
  }

  console.log(pets);
};

module.exports = router;
