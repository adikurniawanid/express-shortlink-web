"use strict";
const express = require("express");
const { LinkController } = require("../controllers");

const router = express.Router();

router.get("/", LinkController.list);
router.post("/", LinkController.create);

module.exports = router;
