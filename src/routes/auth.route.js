"use strict";
const express = require("express");
const { AuthController } = require("../controllers");

const router = express.Router();

router.get("/login", AuthController.index);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.get("/register", AuthController.register);
router.get("/forgot-password", AuthController.forgotPassword);

module.exports = router;
