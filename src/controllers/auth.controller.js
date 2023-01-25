"use strict";
const axios = require("axios");

class AuthController {
  static async index(req, res, next) {
    try {
      res.render("auth/login", {
        layout: "layouts/auth",
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const data = await axios({
        method: "post",
        url: "http://127.0.0.1:3000/v1/auth/login",
        data: {
          email,
          password,
        },
      });

      if (data.status === 200) {
        res.json(data.data);
      } else if (data.status === 401) {
        res.redirect("/auth/login");
      } else if (data.status === 422) {
        res.redirect("/auth/login");
      }
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      res.render("auth/register", {
        layout: "layouts/auth",
      });
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      res.render("auth/forgot-password", {
        layout: "layouts/auth",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
