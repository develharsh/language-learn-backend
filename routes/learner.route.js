const express = require("express");
const router = express.Router();
const learnerController = require("../controllers/learner.controller");

router.post("/register", learnerController.register);

module.exports = router;
