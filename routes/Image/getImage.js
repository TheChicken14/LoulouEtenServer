const express = require("express");
const router = express.Router();
const path = require("path");

const { param, validationResult } = require("express-validator");

/* GET Pet status */
router.get("/:filename", param("filename").isString(), async (req, res) => {
  const { filename } = req.params;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  res.sendFile(
    path.resolve(`${__dirname}`, "..", "..", "data", "pictures", filename)
  );
  //   res.sendFile(`${__dirname}/../../data/pictures/${filename}`);
});

module.exports = router;
