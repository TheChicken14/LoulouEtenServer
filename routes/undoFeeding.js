const express = require("express");
const router = express.Router();

const food = require("../Structures/FoodManager");

/* DELETE Undo feeding loulou */
router.delete("/", async (req, res) => {
  await food.undoFood();

  res.send({
    success: true,
  });
});

module.exports = router;
