"use strict";
const express = require("express");
const { AuthController } = require("../controllers");

const router = express.Router();

router.get("/login", AuthController.login);
router.get("/register", AuthController.register);
router.get("/forgot-password", AuthController.forgotPassword);

module.exports = router;
