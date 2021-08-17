const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const food = require("../Structures/FoodManager");

/* POST loulou has gotten food */
router.post(
  "/",
  body("name").isString(),
  body("date")
    .isISO8601()
    .optional()
    .default(() => new Date().toISOString()),
  body("type").isString().optional(),
  async (req, res) => {
    const { name, date, type } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    console.log(req.body);

    if (type) {
      if (type !== "morning" && type !== "evening") {
        return res.status(401).send({
          success: false,
          error: "Invalid type",
        });
      }
    }

    if (!String(name).trim()) {
      return res.status(401).send({
        success: false,
        error: "No name provided",
      });
    }

    await food.giveFood({
      name,
      type: type || null,
      date: date || null,
    });

    res.send({
      success: true,
    });
  }
);

module.exports = router;
