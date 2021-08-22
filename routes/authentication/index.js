const express = require("express");
const router = express.Router();

const googleEndpoint = require("./googleEndpoint");
const googleRedirect = require("./googleRedirect");
const checkToken = require("./checkToken");

router.use("/google/redirect", googleEndpoint);
router.use("/google", googleRedirect);
router.use("/test", checkToken);

module.exports = router;
