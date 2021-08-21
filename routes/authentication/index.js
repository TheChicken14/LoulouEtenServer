const express = require("express");
const router = express.Router();

const googleEndpoint = require("./googleEndpoint");
const googleRedirect = require("./googleRedirect");

router.use("/google/redirect", googleEndpoint);
router.use("/google", googleRedirect);

module.exports = router;
