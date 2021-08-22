const express = require("express");
const router = express.Router();
const Pet = require("../Models/Pet");

const { body, validationResult } = require("express-validator");

/* POST Create pet */
router.post("/", body("name").isString(), async (req, res) => {
  const { name } = req.body;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const newPet = new Pet({
    name,
  });
  const savedPet = await newPet.save();

  res.send(savedPet);
});

module.exports = router;
