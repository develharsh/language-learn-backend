const express = require("express");
const router = express.Router();
const learnerRoute = require("./learner.route");
const generalRoute = require("./general.route");

// @Base Url
router.use((req, _, next) => {
  req["currentUrl"] = `${req.protocol + "://" + req.headers.host}`;
  next();
});

router.use("/learner", learnerRoute);
router.use("/general", generalRoute);

module.exports = router;
