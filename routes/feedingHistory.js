const express = require("express");
const Food = require("../Models/Food");
const router = express.Router();

/* GET Feeding history */
router.get("/", async (req, res) => {
  const history = await Food.find({}).lean();

  res.send({
    history,
  });
});

module.exports = router;
