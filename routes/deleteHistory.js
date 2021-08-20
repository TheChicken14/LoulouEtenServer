const express = require("express");
const Food = require("../Models/Food");
const router = express.Router();

/* Delete Feeding history item */
router.delete("/", async (req, res) => {
  const { _id } = req.body;

  if (!_id || _id.length < 1) {
    return res.status(401).send({
      success: false,
      message: "_id parameter is required.",
    });
  }

  const exists = await Food.find({ _id });

  if (!exists) {
    return res.status(404).send({
      success: false,
      message: "Document not found.",
    });
  }

  await Food.deleteOne({ _id });

  res.send({
    success: true,
  });
});

module.exports = router;
