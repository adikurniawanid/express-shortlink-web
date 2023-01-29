"use strict";
const express = require("express");
const { LinkController } = require("../controllers");
const authorization = require("../middlewares/authorization.middleware");

const router = express.Router();

router.get("/", authorization, LinkController.list);
router.post("/", authorization, LinkController.create);

module.exports = router;
