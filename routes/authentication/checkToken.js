const express = require("express");
const router = express.Router();

/* GET check token */
router.get("/", (req, res) => {
  res.send({ success: true });
});

module.exports = router;
