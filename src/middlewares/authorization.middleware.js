"use strict";
const axios = require("axios");
const { API_URL } = process.env;

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies.user) {
      throw {
        status: 401,
        message: { en: "Unauthorized User", id: "Pengguna tidak diizinkan" },
      };
    }

    res.locals.user = req.cookies.user;

    next();
  } catch (error) {
    next(error);
  }
};
