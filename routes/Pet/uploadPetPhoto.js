const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const prisma = require("../../Structures/Prisma");
const { param, validationResult } = require("express-validator");

const allowedFileExtensions = ["png", "jpg", "jpeg", "gif"];

const storage = multer.diskStorage({
  destination: "data/pictures",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, "petPhoto" + "-" + uniqueSuffix + `.${extension}`);
  },
});

// const upload = multer({ dest: "data/pictures" });
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb("Invalid mime type", false);
    }

    try {
      const extension = file.originalname.split(".").pop();
      if (allowedFileExtensions.some((a) => a == extension)) {
        return cb(null, true);
      }
    } catch {
      return cb(null, false);
    }
  },
});

/* POST Create pet */
router.post(
  "/:id",
  param("id").isInt(),
  async (req, res, next) => {
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

    if (pet.owners.find((u) => u.id == userID)) {
      next();
    } else {
      return res.status(401).send({
        success: false,
        error: "Not authorized.",
      });
    }
  },
  upload.single("picture"),
  async (req, res) => {
    const { id: _petID } = req.params;
    const { id: userID } = req.user;
    const petID = Number(_petID);
    console.log(req.file);

    const pet = await prisma.pet.findFirst({
      where: {
        id: petID,
      },
      include: {
        profile: true,
      },
    });

    if (pet.profile.pictureName) {
      try {
        fs.unlinkSync(
          path.resolve(
            `${__dirname}`,
            "..",
            "..",
            "data",
            "pictures",
            pet.profile.pictureName
          )
        );
      } catch (e) {
        console.error(e);
      }
    }

    await prisma.pet.update({
      where: {
        id: petID,
      },
      include: {
        profile: true,
      },
      data: {
        profile: {
          update: {
            pictureName: req.file.filename,
          },
        },
      },
    });

    res.send("thanks");
  }
);

module.exports = router;
