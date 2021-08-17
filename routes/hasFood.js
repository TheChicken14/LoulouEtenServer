const express = require("express");
const router = express.Router();

const food = require("../Structures/FoodManager");

/* GET Does loulou have food? */
router.get("/", async (req, res) => {
  const doesLoulouHaveFood = await food.hasFood();

  if (doesLoulouHaveFood) {
    res.send({ food: true, ...doesLoulouHaveFood.toObject() });
  } else res.send({ food: false });
});

module.exports = router;
